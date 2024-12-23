<script>
	import { fly } from 'svelte/transition';
	import { Steps } from '@/utils/constants.ts';
</script>

<section transition:fly={{ y: 50, duration: 500 }} class="mx-auto py-16">
	<div class="container mx-auto max-w-5xl rounded-md bg-primary-foreground p-10">
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
			<p class="mt-3 text-secondary-foreground">
				Create your html template and structure it like this:
			</p>

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
			{#each Steps as step}
				<div
					class="group relative bg-secondary backdrop-blur-md transition hover:z-[1] hover:shadow-2xl hover:shadow-slate-600/10"
				>
					<div class="relative space-y-8 p-8 py-12 text-primary">
						<svg
							stroke="currentColor"
							fill="none"
							stroke-width="2"
							viewBox="0 0 24 24"
							stroke-linecap="round"
							stroke-linejoin="round"
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
