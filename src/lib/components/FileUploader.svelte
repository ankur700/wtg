<script lang="ts">
	import { ThemeGenerator } from '$lib/utils/themeGenerator';
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import Label from '@/components/ui/label/label.svelte';
	import { XCircle } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import Loading from './Loading.svelte';

	let themeGenerator: ThemeGenerator;
	let htmlFile: File | null = $state(null);
	let cssFile: File | null = $state(null);
	let jsFile: File | null = $state(null);
	let additionalCssFiles: File[] = $state([]);
	let additionalJsFiles: File[] = $state([]);
	let screenshotFile: File | null = $state(null);
	let screenshotUrl: string | null = $state(null);
	let isProcessing: boolean = $state(false);
	let downloadLink: string | null = $state(null);
	let showAlert: boolean = $state(false);
	let alert: { title: string, message: string } | null = $state(null);

	onMount(() => {
		themeGenerator = new ThemeGenerator();
	});

	function handleHtmlFileUpload(event: Event & { currentTarget: HTMLInputElement }) {
		const file = event.currentTarget.files?.item(0);
		if (file) {
			htmlFile = file;
		}
	}

	function handleCssFileUpload(event: Event & { currentTarget: HTMLInputElement }) {
		const file = event.currentTarget.files?.item(0);
		if (file) {
			cssFile = file;
		}
	}

	function handleJsFileUpload(event: Event & { currentTarget: HTMLInputElement }) {
		const file = event.currentTarget.files?.item(0);
		if (file) {
			jsFile = file;
		}
	}

	function handleAssetsFileUpload(event: Event & { currentTarget: HTMLInputElement }) {
		const files = event.currentTarget.files;
		if (files) {
			Array.from(files).forEach((file) => {
				if (file.type === 'text/css') {
					additionalCssFiles.push(file);
				} else if (file.type === 'text/javascript') {
					additionalJsFiles.push(file);
				}
			});
		}
	}

	async function handleFileSelection() {
		if (!htmlFile && !cssFile && !jsFile) {
			showAlert = true;
			alert = {
				title: 'Are you sure you selected all the required files?',
				message: 'Please select all the required files and try again.'
			};
		}

		if (htmlFile && cssFile && jsFile) {

			isProcessing = true;
			downloadLink = null;

			if (screenshotFile) {
				screenshotUrl = URL.createObjectURL(screenshotFile);
			}

			try {
				// Read file contents
				const htmlContent = await htmlFile.text();
				const cssContent = await cssFile.text();
				const jsContent = await jsFile.text();

				// Generate WordPress theme
				const themeBlob = await themeGenerator.generateTheme(
					htmlContent,
					cssContent,
					jsContent,
					additionalCssFiles,
					additionalJsFiles,
					screenshotFile
				);

				// Create download link
				if (themeBlob) {
					downloadLink = URL.createObjectURL(themeBlob);
				}
			} catch (error) {
				console.error('Theme generation error:', error);
				showAlert = true;
				alert = { title: 'Error generating theme', message: 'something went wrong' };
			} finally {
				isProcessing = false;
			}
		}
	}

	function handleDownload(downloadLink: string | null) {
		if (downloadLink) {
			const link = document.createElement('a');
			link.href = downloadLink;
			link.download = 'generated-theme.zip';
			link.click();
		}
	}

	function handleImageUpload(event: Event & { currentTarget: HTMLInputElement }) {
		const image = event.currentTarget.files?.item(0);
		if (image) {
			screenshotFile = image;
			screenshotUrl = URL.createObjectURL(image);
		}
	}
</script>

<div class="file-uploader mx-auto flex max-w-xl flex-col gap-4">
	{#if showAlert && alert}
		<AlertDialog.Root bind:open={showAlert}>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>{alert.title}</AlertDialog.Title>
					<AlertDialog.Description>
						{alert.message}
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Close</AlertDialog.Cancel>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	{/if}
	{#if isProcessing}
		<Loading />
	{:else}
		<div class="flex justify-between gap-2">
			<div>
				<Label for="html-file">HTML File</Label>
				<Input
					id="html-file"
					type="file"
					accept=".html"
					oninput={(e: Event & { currentTarget: HTMLInputElement }) => handleHtmlFileUpload(e)}
					placeholder="HTML File"
				/>
			</div>
			<div>
				<Label for="css-file">CSS File</Label>
				<Input
					id="css-file"
					type="file"
					accept=".css"
					oninput={(e: Event & { currentTarget: HTMLInputElement }) => handleCssFileUpload(e)}
					placeholder="CSS File"
				/>
			</div>
		</div>

		<div class="flex justify-between gap-2">
			<div>
				<Label for="js-file">JS File</Label>
				<Input
					id="js-file"
					type="file"
					accept=".js"
					oninput={(e: Event & { currentTarget: HTMLInputElement }) => handleJsFileUpload(e)}
					placeholder="JS File"
				/>
			</div>
			<div>
				<Label for="additional-assets-file">Additional assets Files</Label>
				<Input
					id="additional-assets-file"
					type="file"
					multiple
					accept=".css, .js"
					oninput={(e: Event & { currentTarget: HTMLInputElement }) => handleAssetsFileUpload(e)}
					placeholder="Additional assets Files"
				/>
			</div>
		</div>
		<div>
			<p class="mb-2 text-sm">Screenshot for your theme</p>
			<div class="flex w-full items-center justify-center">
				<Label
					for="dropzone-file"
					class="border-primary-300 hover:bg-primary-100 dark:border-primary-600 dark:hover:border-primary-500 dark:hover:bg-primary-600 relative mx-auto flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-primary-foreground"
				>
					{#if screenshotUrl}
						<img class="h-full w-full" src={screenshotUrl} alt="Screenshot" />
						<Button
							class="absolute right-2 top-2 z-50"
							variant="destructive"
							size="icon"
							onclick={() => (screenshotUrl = null)}><XCircle class="h-4 w-4" /></Button
						>
					{:else}
						<div class="flex flex-col items-center justify-center pb-6 pt-5">
							<svg
								class="mb-4 h-8 w-8 text-foreground"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 16"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
								/>
							</svg>
							<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
								<span class="font-semibold">Click to upload</span> or drag and drop
							</p>
							<p class="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (SIZE. 1200x900px)</p>
						</div>
						<input
							id="dropzone-file"
							oninput={(e) => handleImageUpload(e)}
							type="file"
							accept=".png, .jpg"
							class="hidden"
						/>
					{/if}
				</Label>
			</div>
		</div>
		<div class="flex gap-2">
			{#if downloadLink}
				<Button
					role="button"
					onclick={() => handleDownload(downloadLink)}
					download="wordpress-theme.zip"
					variant="outline"
				>
					Download WordPress Theme
				</Button>
			{:else}
				<Button variant="secondary" onclick={handleFileSelection}>Generate WordPress Theme</Button>
			{/if}
		</div>
	{/if}
</div>
