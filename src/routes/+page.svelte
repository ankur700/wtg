<script>
	import * as Accordion from "@/components/ui/accordion";
	import { Button } from '@/components/ui/button';
	import { fly, fade } from 'svelte/transition';
	import { base } from '$app/paths';
</script>

<div
	transition:fly={{ y: 50, duration: 500 }}
	class="relative max-w-5xl mx-auto rounded-lg overflow-hidden bg-primary-foreground my-16 px-8 py-16 "
>
	<div class="container">
		<div class="-mx-4 flex flex-wrap items-center">
			<div class="w-full px-4">
				<div
					class="hero-content wow fadeInUp mx-auto max-w-[780px] text-center"
					data-wow-delay=".2s"
				>
					<h1
						class="mb-6 text-3xl font-bold leading-snug text-secondary-foreground sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]"
					>
						Convert your HTML templates to Wordpress theme
					</h1>
					<p
						class="mx-auto mb-9 max-w-[600px] text-base font-medium text-muted-foreground sm:text-lg sm:leading-[1.44]"
					>
						Read the how to section to learn how you can convert your html templates to wordpress
						themes.
					</p>
					<ul class="mb-10 flex flex-wrap items-center justify-center gap-5">
						<li>
							<Button href={`${base}/generate-theme`} variant="secondary">
								Generate Now
							</Button>
						</li>
						<li>
							<Button
								href="https://github.com/ankur700/html-to-wordpress-theme-converter"
								target="_blank"
                variant="outline"
							>
								<svg
									class="fill-current"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g clip-path="url(#clip0_2005_10818)">
										<path
											d="M12 0.674805C5.625 0.674805 0.375 5.8498 0.375 12.2998C0.375 17.3998 3.7125 21.7498 8.3625 23.3248C8.9625 23.4373 9.15 23.0623 9.15 22.7998C9.15 22.5373 9.15 21.7873 9.1125 20.7748C5.8875 21.5248 5.2125 19.1998 5.2125 19.1998C4.6875 17.8873 3.9 17.5123 3.9 17.5123C2.85 16.7623 3.9375 16.7623 3.9375 16.7623C5.1 16.7998 5.7375 17.9623 5.7375 17.9623C6.75 19.7623 8.475 19.2373 9.1125 18.8998C9.225 18.1498 9.525 17.6248 9.8625 17.3248C7.3125 17.0623 4.575 16.0498 4.575 11.6248C4.575 10.3498 5.0625 9.3373 5.775 8.5498C5.6625 8.2873 5.25 7.0873 5.8875 5.4748C5.8875 5.4748 6.9 5.1748 9.1125 6.6748C10.05 6.4123 11.025 6.2623 12.0375 6.2623C13.05 6.2623 14.0625 6.3748 14.9625 6.6748C17.175 5.2123 18.15 5.4748 18.15 5.4748C18.7875 7.0498 18.4125 8.2873 18.2625 8.5498C19.0125 9.3373 19.4625 10.3873 19.4625 11.6248C19.4625 16.0498 16.725 17.0623 14.175 17.3248C14.5875 17.6998 14.9625 18.4498 14.9625 19.4998C14.9625 21.0748 14.925 22.3123 14.925 22.6873C14.925 22.9873 15.15 23.3248 15.7125 23.2123C20.2875 21.6748 23.625 17.3623 23.625 12.2248C23.5875 5.8498 18.375 0.674805 12 0.674805Z"
										/>
									</g>
									<defs>
										<clipPath id="clip0_2005_10818">
											<rect width="24" height="24" fill="white" />
										</clipPath>
									</defs>
								</svg>
								<span class="ml-2"> Star on Github </span>
							</Button>
						</li>
					</ul>
					<div>
						<p class="mb-4 text-center text-base font-medium text-foreground">
							Built with latest technology
						</p>
						<div
							class="wow fadeInUp flex items-center justify-center gap-4 text-center"
							data-wow-delay=".3s"
						>
							<a
								href="https://github.com/TailGrids/play-tailwind/"
								class="text-foreground duration-300 ease-in-out hover:text-foreground"
								target="_blank"
								aria-label="tailwindcss"
							>
								<svg
									class="fill-current"
									width="41"
									height="26"
									viewBox="0 0 41 26"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<mask
										id="mask0_2005_10783"
										style="mask-type: luminance"
										maskUnits="userSpaceOnUse"
										x="0"
										y="0"
										width="41"
										height="26"
									>
										<path d="M0.521393 0.949463H40.5214V25.0135H0.521393V0.949463Z" />
									</mask>
									<g mask="url(#mask0_2005_10783)">
										<path
											d="M20.5214 0.980713C15.1882 0.980713 11.8546 3.64743 10.5214 8.98071C12.5214 6.31399 14.8546 5.31399 17.5214 5.98071C19.043 6.36103 20.1302 7.46495 21.3342 8.68667C23.295 10.6771 25.5642 12.9807 30.5214 12.9807C35.8546 12.9807 39.1882 10.314 40.5214 4.98071C38.5214 7.64743 36.1882 8.64743 33.5214 7.98071C31.9998 7.60039 30.9126 6.49651 29.7086 5.27479C27.7478 3.28431 25.4786 0.980713 20.5214 0.980713ZM10.5214 12.9807C5.18819 12.9807 1.85459 15.6474 0.521393 20.9807C2.52139 18.314 4.85459 17.314 7.52139 17.9807C9.04299 18.361 10.1302 19.465 11.3342 20.6867C13.295 22.6771 15.5642 24.9807 20.5214 24.9807C25.8546 24.9807 29.1882 22.314 30.5214 16.9807C28.5214 19.6474 26.1882 20.6474 23.5214 19.9807C21.9998 19.6004 20.9126 18.4965 19.7086 17.2748C17.7478 15.2843 15.4786 12.9807 10.5214 12.9807Z"
										/>
									</g>
								</svg>
							</a>

							<a
								href="https://svelte.dev/"
								class="text-white/60 duration-300 ease-in-out hover:text-white"
								target="_blank"
								aria-label="svelte"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="fill-current"
									fill="none"
									width="41"
									height="26"
									viewBox="0 0 107 128"
									><title>svelte-logo</title><path
										d="M94.1566,22.8189c-10.4-14.8851-30.94-19.2971-45.7914-9.8348L22.2825,29.6078A29.9234,29.9234,0,0,0,8.7639,49.6506a31.5136,31.5136,0,0,0,3.1076,20.2318A30.0061,30.0061,0,0,0,7.3953,81.0653a31.8886,31.8886,0,0,0,5.4473,24.1157c10.4022,14.8865,30.9423,19.2966,45.7914,9.8348L84.7167,98.3921A29.9177,29.9177,0,0,0,98.2353,78.3493,31.5263,31.5263,0,0,0,95.13,58.117a30,30,0,0,0,4.4743-11.1824,31.88,31.88,0,0,0-5.4473-24.1157"
										style="fill:#ff3e00"
									/><path
										d="M45.8171,106.5815A20.7182,20.7182,0,0,1,23.58,98.3389a19.1739,19.1739,0,0,1-3.2766-14.5025,18.1886,18.1886,0,0,1,.6233-2.4357l.4912-1.4978,1.3363.9815a33.6443,33.6443,0,0,0,10.203,5.0978l.9694.2941-.0893.9675a5.8474,5.8474,0,0,0,1.052,3.8781,6.2389,6.2389,0,0,0,6.6952,2.485,5.7449,5.7449,0,0,0,1.6021-.7041L69.27,76.281a5.4306,5.4306,0,0,0,2.4506-3.631,5.7948,5.7948,0,0,0-.9875-4.3712,6.2436,6.2436,0,0,0-6.6978-2.4864,5.7427,5.7427,0,0,0-1.6.7036l-9.9532,6.3449a19.0329,19.0329,0,0,1-5.2965,2.3259,20.7181,20.7181,0,0,1-22.2368-8.2427,19.1725,19.1725,0,0,1-3.2766-14.5024,17.9885,17.9885,0,0,1,8.13-12.0513L55.8833,23.7472a19.0038,19.0038,0,0,1,5.3-2.3287A20.7182,20.7182,0,0,1,83.42,29.6611a19.1739,19.1739,0,0,1,3.2766,14.5025,18.4,18.4,0,0,1-.6233,2.4357l-.4912,1.4978-1.3356-.98a33.6175,33.6175,0,0,0-10.2037-5.1l-.9694-.2942.0893-.9675a5.8588,5.8588,0,0,0-1.052-3.878,6.2389,6.2389,0,0,0-6.6952-2.485,5.7449,5.7449,0,0,0-1.6021.7041L37.73,51.719a5.4218,5.4218,0,0,0-2.4487,3.63,5.7862,5.7862,0,0,0,.9856,4.3717,6.2437,6.2437,0,0,0,6.6978,2.4864,5.7652,5.7652,0,0,0,1.602-.7041l9.9519-6.3425a18.978,18.978,0,0,1,5.2959-2.3278,20.7181,20.7181,0,0,1,22.2368,8.2427,19.1725,19.1725,0,0,1,3.2766,14.5024,17.9977,17.9977,0,0,1-8.13,12.0532L51.1167,104.2528a19.0038,19.0038,0,0,1-5.3,2.3287"
										style="fill:#fff"
									/></svg
								>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<section
	transition:fade={{ duration: 400 }}
	class=" relative z-20 overflow-hidden pb-8 pt-20 lg:pb-[50px] lg:pt-[120px]"
>
	<div class="container max-w-5xl bg-background p-10 rounded-md mx-auto">
		<div class="-mx-4 flex flex-wrap">
			<div class="w-full px-4">
				<div class="mx-auto mb-[60px] max-w-[520px] text-center ">
					<span class="mb-2 block text-lg font-semibold text-primary"> FAQ </span>
					<h2
						class="text-dark mb-3 text-3xl font-bold leading-[1.2] dark:text-white sm:text-4xl md:text-[40px]"
					>
						Any Questions? Look Here
					</h2>
					<p class="text-body-color dark:text-dark-6 mx-auto max-w-[485px] text-base">
						There are many variations of passages of Lorem Ipsum available but the majority have
						suffered alteration in some form.
					</p>
				</div>
			</div>
		</div>
		<div class=" max-w-2xl mx-auto flex flex-wrap">
			<div class="w-full">
        <Accordion.Root type="single">
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Is TailGrids Well-documented?</Accordion.Trigger>
            <Accordion.Content>
              It takes 2-3 weeks to get your first blog post ready. That includes the in-depth
							research & creation of your monthly content ui/ux strategy that we do writing your
							first blog post.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Is TailGrids Well-documented?</Accordion.Trigger>
            <Accordion.Content>
              It takes 2-3 weeks to get your first blog post ready. That includes the in-depth
							research & creation of your monthly content ui/ux strategy that we do writing your
							first blog post.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Trigger>Is TailGrids Well-documented?</Accordion.Trigger>
            <Accordion.Content>
              It takes 2-3 weeks to get your first blog post ready. That includes the in-depth
							research & creation of your monthly content ui/ux strategy that we do writing your
							first blog post.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
			</div>
		</div>
	</div>
</section>

