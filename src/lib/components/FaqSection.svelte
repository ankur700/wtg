<script>
	import * as Accordion from '@/components/ui/accordion';
  import { fade } from 'svelte/transition';
  import FAQ from '@/components/FAQ.svelte';
  let { children } = $props();

  const FAQS = [
    {
      title: 'How can i generate block themes?',
      content: 'Currently we don\'t have such feature, but we are working on it.',
    },
    {
      title: 'My website is not working. What should I do?',
      content: 'Check if you have included all required files when generating theme including any external library files like bootstrap, swiper etc. If you have included all required files, then please contact us. We will look into it.',
    },
  ]
</script>

<section
	transition:fade={{ duration: 400 }}
	class=" relative z-20 overflow-hidden pb-8 pt-20 lg:pb-[50px] lg:pt-[120px]"
>
	<div class="container mx-auto max-w-5xl rounded-md bg-background p-10">
		<div class="-mx-4 flex flex-wrap">
			<div class="w-full px-4">
				<div class="mx-auto mb-[60px] max-w-[520px] text-center">
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
		<div class=" mx-auto flex max-w-2xl flex-wrap">
			<div class="w-full">
				<Accordion.Root type="single">
          {#each FAQS as faq}
            <FAQ title={faq.title} content={faq.content} />
          {/each}
				</Accordion.Root>
			</div>
		</div>
	</div>
</section>