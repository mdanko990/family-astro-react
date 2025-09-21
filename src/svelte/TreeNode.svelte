<script lang="ts">
  import ContextMenu from '$lib/components/ContextMenu.svelte';
  import { type NodeProps } from '@xyflow/svelte';
  import { format, isValid } from 'date-fns';

  let { id, data }: NodeProps = $props();

  const renderYear = (date: any): string => {
    if (!date) return '';
    const d = new Date(date);
    return isValid(d) ? format(d, 'yyyy') : '';
  };

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

{#snippet trigger()}
  <div class="flex flex-col justify-center items-center border-1 rounded-sm p-1 w-[100px] h-[40px] text-[8px] nodrag">
    <div>{data.firstname} {data.lastname}</div>
    <div>{renderYear(data.birthDate)} - {renderYear(data.deathDate)}</div>
  </div>
{/snippet}

<ContextMenu {trigger} {create} {edit} {remove} {draft} />
