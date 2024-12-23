<script>
	import FAQ from '@/components/FAQ.svelte';
	import { Root } from '@/components/ui/accordion';
	import { fly } from 'svelte/transition';
	import { FAQS } from '@/utils/constants.js';
</script>

<section
	transition:fly={{ y: 50, duration: 500 }}
	class=" relative min-h-screen overflow-hidden pt-16"
>
	<div class="container mx-auto max-w-5xl rounded-md bg-primary-foreground p-10">
		<div class="-mx-4 flex flex-wrap">
			<div class="w-full px-4">
				<div class="mx-auto mb-[60px] max-w-[520px] text-center">
					<span class="mb-2 block text-lg font-semibold text-primary"> FAQ </span>
					<h2
						class="text-dark mb-3 text-3xl font-bold leading-[1.2] dark:text-white sm:text-4xl md:text-[40px]"
					>
						Any Questions? Look Here
					</h2>
					<!-- <p class="text-muted-foreground mx-auto max-w-[485px] text-base">
						There are the frequently asked question.
					</p> -->
				</div>
			</div>
		</div>
		<div class=" mx-auto flex max-w-2xl flex-wrap">
			<div class="w-full">
				<Root type="single">
					{#each FAQS as faq}
						<FAQ title={faq.title} content={faq.content} id={faq.id} />
					{/each}
				</Root>
			</div>
		</div>
	</div>
</section>
