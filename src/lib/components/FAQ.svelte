<script>
	import * as Accordion from '$lib/components/ui/accordion';
	let { title, content, id } = $props();
</script>

<Accordion.Item value={`item-${id}`}>
	<Accordion.Trigger>{title}</Accordion.Trigger>
	<Accordion.Content>
		{content}
	</Accordion.Content>
</Accordion.Item>
