<script>
	import { Item, Content, Trigger } from '$lib/components/ui/accordion';
	let { title, content, id } = $props();
</script>

<Item class="text-lg" value={`item-${id}`}>
	<Trigger>{title}</Trigger>
	<Content class="text-sm">
		{content}
	</Content>
</Item>
