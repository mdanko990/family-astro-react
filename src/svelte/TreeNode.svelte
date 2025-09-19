<script lang="ts">
  import { useSvelteFlow, type NodeProps } from '@xyflow/svelte';
  import { format, isValid } from 'date-fns';

  let { id, data }: NodeProps = $props();
  let { updateNodeData } = useSvelteFlow();

  console.log('data', data);

  const renderYear = (date: any): string => {
    if (!date) return "";
    const d = new Date(date);
    return isValid(d) ? format(d, "yyyy") : "";
  }

</script>

<div class="border-1 border-solid border-black p-1 w-[100px] h-[50px]">
  <div>{data.firstname} {data.patronym} {data.lastname}</div>
  <div>{renderYear(data.birthDate)} - {renderYear(data.deathDate)}</div>
</div>