<script lang="ts">
  import { ContextMenu } from 'bits-ui';
  import Plus from '@lucide/svelte/icons/plus';
  import { Separator } from './ui/separator';

  let { trigger, create, edit, remove, draft } = $props();
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger>
    {@render trigger()}
  </ContextMenu.Trigger>
  <ContextMenu.Portal>
    <ContextMenu.Content class="bg-white border-1 rounded-sm shadow-xs">
      <ContextMenu.Group class="w-30">
        <ContextMenu.Item
          textValue="Add a parent"
          class={'cursor-pointer p-2 hover:bg-neutral-100 flex items-center gap-1'}
          ><Plus size={18} strokeWidth={1.5} />Parent</ContextMenu.Item
        >
        <ContextMenu.Item
          textValue="Add a sibling"
          class={'cursor-pointer p-2 hover:bg-neutral-100 flex items-center gap-1'}
          ><Plus size={18} strokeWidth={1.5} />Sibling</ContextMenu.Item
        >
        <ContextMenu.Item
          textValue="Add a child"
          class={'cursor-pointer px-2 py-1 hover:bg-neutral-100 flex items-center gap-1'}
          ><Plus size={18} strokeWidth={1.5} />Child</ContextMenu.Item
        >
        <ContextMenu.Item
          textValue="Add a partner"
          class={'cursor-pointer px-2 py-1 hover:bg-neutral-100 flex items-center gap-1'}
          ><Plus size={18} strokeWidth={1.5} />Partner</ContextMenu.Item
        >
        <Separator />
        <ContextMenu.Item
          textValue="Move to drafts"
          class={'cursor-pointer px-2 py-1 hover:bg-neutral-100 flex items-center gap-1'}
          onclick={draft}>Move to drafts</ContextMenu.Item
        >
        <ContextMenu.Item
          textValue="Edit"
          class={'cursor-pointer px-2 py-1 hover:bg-neutral-100 flex items-center gap-1'}
          onclick={edit}>Edit</ContextMenu.Item
        >
        <ContextMenu.Item
          textValue="Delete"
          class={'cursor-pointer px-2 py-1 hover:bg-neutral-100 flex items-center gap-1 text-red-700'}
          onclick={remove}>Delete</ContextMenu.Item
        >
      </ContextMenu.Group>
    </ContextMenu.Content>
  </ContextMenu.Portal>
</ContextMenu.Root>
