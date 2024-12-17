<script>
	import * as Accordion from '$lib/components/ui/accordion';
  let { title, content } = $props();
</script>

<Accordion.Item value="item-1">
  <Accordion.Trigger>{title}</Accordion.Trigger>
  <Accordion.Content>
    {content}
  </Accordion.Content>
</Accordion.Item>