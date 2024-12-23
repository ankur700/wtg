<script lang="ts">
	import { Button } from '@/components/ui/button';
	import { Github, Linkedin } from 'lucide-svelte';
	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { base } from '$app/paths';
	import '../app.css';
	let { children } = $props();
</script>

<ModeWatcher />
<div class="ud-header sticky top-0 z-40 mx-auto flex max-w-5xl items-center backdrop-blur-lg">
	<div class="container mx-auto max-w-3xl">
		<div class="relative -mx-4 flex items-center justify-start">
			<div class="w-20 max-w-full px-4">
				<a href={`${base}/`} aria-label="logo" class="navbar-logo block w-full py-5">
					<div
						class="align-center flex h-10 w-10 justify-center border border-slate-900 p-2 dark:border-slate-50"
					>
						<div class="h-5 w-5 rounded-full bg-primary"></div>
					</div>
				</a>
			</div>
			<div class="flex w-full items-center justify-between px-4">
				<div>
					<!-- <button
						id="navbarToggler"
						aria-label="navbar toggler"
						class="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
					>
						<span class="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
						<span class="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
						<span class="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
					</button> -->
					<nav
						id="navbarCollapse"
						class="dark:bg-dark-2 top-full hidden w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:px-4 lg:py-0 lg:shadow-none dark:lg:bg-transparent xl:px-6"
					>
						<ul class="blcok lg:flex 2xl:ml-20">
							<li class="group relative">
								<Button href={`${base}/`} variant="link">Home</Button>
							</li>
							<li class="group relative">
								<Button href={`${base}/steps`} variant="link">How to</Button>
							</li>
							<li class="group relative">
								<Button href={`${base}/faqs`} variant="link">FAQ</Button>
							</li>
							<li class="group relative">
								<Button href={`${base}/generate-theme`} variant="link">Generate Theme</Button>
							</li>
						</ul>
					</nav>
				</div>
				<div class="flex items-center justify-start gap-2 pr-16 lg:pr-0">
					<Button onclick={toggleMode} variant="outline" size="icon">
						<Sun
							class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
						/>
						<Moon
							class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
						/>
						<span class="sr-only">Toggle theme</span>
					</Button>
					<!-- <div class="flex gap-2">
						<Button href="signin.html" variant="outline">Sign In</Button>
						<Button href="signup.html" variant="secondary">Sign Up</Button>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</div>

{@render children()}

<footer class="mx-auto max-w-5xl bg-primary-foreground px-8 ">
	<div class="mx-auto w-full max-w-screen-xl p-4">
		<div class="sm:flex sm:items-center sm:justify-between">
			<span class="text-sm text-foreground sm:text-center"
				>© {new Date().getFullYear()}
				<a href="https://ankursingh.com.np" target="_blank" class="hover:underline">Ankur Singh</a>.
				All Rights Reserved.
			</span>
			<div class="mt-4 flex sm:mt-0 sm:justify-center">
				<a
					href="https://github.com/ankur700"
					class="ms-5 text-foreground hover:text-gray-900 dark:hover:text-white"
				>
					<Github class="h-5 w-5" />
					<span class="sr-only">GitHub</span>
				</a>
				<a
					href="https://www.linkedin.com/in/ankur-singh-9204b161/"
					class="ms-5 text-foreground hover:text-gray-900 dark:hover:text-white"
				>
					<Linkedin class="h-5 w-5" />
					<span class="sr-only">Linkedin</span>
				</a>
			</div>
		</div>
	</div>
</footer>
