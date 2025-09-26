<script lang="ts">
  import { ContextMenu } from 'bits-ui';
  import Plus from '@lucide/svelte/icons/plus';
  import { Separator } from '../lib/components/ui/separator';
  import { useEdges, useNodes, useSvelteFlow } from '@xyflow/svelte';
 
  let {
    id,
    top,
    left,
    right,
    bottom,
    onclick,
  }: {
    id: string;
    top: number | undefined;
    left: number | undefined;
    right: number | undefined;
    bottom: number | undefined;
    onclick: () => void;
  } = $props();
 
  const { deleteElements } = useSvelteFlow();
  //To check the docs https://svelteflow.dev/examples/interaction/context-menu
  const nodes = useNodes();
  console.log('contextmenu')
  const create = () => {
    console.log('create');
  };

  const edit = () => {
    console.log('edit');
  };

  const remove = () => {
    console.log('remove');
  };

  const draft = () => {
    console.log('draft');
  };
</script>

<div style="top: {top}px; left: {left}px; right: {right}px; bottom: {bottom}px;" {onclick}>
  <div class='cursor-pointer p-2 hover:bg-neutral-100 flex items-center gap-1'
    >
    <Plus size={18} strokeWidth={1.5} />
    Parent
  </div>
  <div
    class='cursor-pointer p-2 hover:bg-neutral-100 flex items-center gap-1'
    ><Plus size={18} strokeWidth={1.5} />Sibling</div
  >
  <div
    class='cursor-pointer px-2 py-1 hover:bg-neutral-100 flex items-center gap-1'
    ><Plus size={18} strokeWidth={1.5} />Child</div
  >
  <div
    class='cursor-pointer px-2 py-1 hover:bg-neutral-100 flex items-center gap-1'
    ><Plus size={18} strokeWidth={1.5} />Partner</div
  >
  <Separator />
  <div
    class='cursor-pointer px-2 py-1 hover:bg-neutral-100 flex items-center gap-1'
    onclick={draft}>Move to drafts</div
  >
  <div
    class='cursor-pointer px-2 py-1 hover:bg-neutral-100 flex items-center gap-1'
    onclick={edit}>Edit</div
  >
  <div
    class='cursor-pointer px-2 py-1 hover:bg-neutral-100 flex items-center gap-1 text-red-700'
    onclick={remove}>Delete</div
  >
</div>
