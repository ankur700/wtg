<script>
	const steps = [
		{
			id: 1,
			title: 'Prerequisite',
			description:
				"Remove any loading screens from index.html file, also optionally remove the links to css files and js files from the index.html file. Stylesheets and scripts loaded from cdn's should be downloaded in advance.",
			svgPaths: ['M10 10l2 -2v8']
		},
		{
			id: 2,
			title: 'Upload',
			description:
				'Head to generate theme page and upload your index.html file, main.css file, main.js file and other css and js files(custom js libraries and custom css libraries files) according to the input label.',
			svgPaths: ['M10 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h3']
		},
		{
			id: 3,
			title: 'Convert',
			description:
				'Generate your wordpress theme by clicking the generate button and download the theme zip file.',
			svgPaths: [
				'M10 9a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1'
			]
		},
		{
			id: 4,
			title: 'Install',
			description:
				'Install your wordpress theme by opening wordpress admin panel and click appearance -> themes and click the upload button, now select the theme zip file and click install.',
			svgPaths: ['M10 8v3a1 1 0 0 0 1 1h3', 'M14 8v8']
		}
	];
</script>

<section class="mx-auto max-w-5xl rounded-md bg-primary-foreground p-4 pb-8">
	<div class="mx-auto h-max max-w-7xl px-6 md:px-12 xl:px-6">
		<div class="md:w-2/3 lg:w-full">
			<h2 class="my-8 text-2xl font-bold text-foreground md:text-4xl">How to start?</h2>
			<p class="text-secondary-foreground">
				Just follow the process to get you started as quickly as possible. This will only generate a
				classic wordpress theme for you. You will still need to convert your navigation menu and any
				other customizations. For more info check the wordpress <a
					href="https://developer.wordpress.org/themes/getting-started/"
					class="text-blue-600 underline hover:opacity-80"
					target="_blank"
					rel="noopener noreferrer"
				>
					documentation.</a
				>
			</p>
			<p class="text-secondary-foreground mt-3">Create your html template and structure it like this:</p>

			<ul class="my-2 ml-6 list-disc [&>li]:mt-2">
				<li>
					template folder
					<ul class="ml-6 list-disc [&>li]:mt-2">
						<li>index.html</li>
						<li>main.css</li>	
						<li>main.js</li>
						<li>
							assets folder
							<ul class="ml-6 list-disc [&>li]:mt-2">
								<li>additional css files and js files</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div
			class="mt-16 grid divide-x divide-y divide-slate-700 overflow-hidden rounded-3xl border border-slate-700 text-slate-600 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4"
		>
			{#each steps as step}
				<div
					class="group relative bg-secondary backdrop-blur-md transition hover:z-[1] hover:shadow-2xl hover:shadow-slate-600/10"
				>
					<div class="relative space-y-8 p-8 py-12">
						<svg
							stroke="currentColor"
							fill="none"
							stroke-width="2"
							viewBox="0 0 24 24"
							stroke-linecap="round"
							stroke-linejoin="round"
							color="white"
							style="color:white"
							height="50"
							width="50"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path
								d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"
							>
							</path>
							{#each step.svgPaths as svgPath}
								<path d={svgPath}></path>
							{/each}
						</svg>
						<div class="space-y-2">
							<h5 class="text-xl font-semibold text-foreground transition">{step.title}</h5>
							<p class="text-muted-foreground">{step.description}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
