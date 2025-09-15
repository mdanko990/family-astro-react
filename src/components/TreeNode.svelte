<script lang="ts">
  import { Position, useSvelteFlow, type NodeProps } from '@xyflow/svelte';
  import { format, isValid, parseISO } from 'date-fns';

  let { id, data }: NodeProps = $props();
 
  let { updateNodeData } = useSvelteFlow();

  const renderYear = (date: any): string => {
    if (!date) return "";
    const d = new Date(date);
    return isValid(d) ? format(d, "yyyy") : "";
  }
</script>
 
<div style:border="1px solid black" style:padding="10px">
  <div>{data.firstname} {data.patronym} {data.lastname}</div>
  <div>{renderYear(data.birthDate)} - {renderYear(data.deathDate)}</div>
</div>