<script lang="ts">
  import { type NodeProps } from '@xyflow/svelte';
  import { format, isValid } from 'date-fns';

  let { id, data }: NodeProps = $props();

  const renderYear = (date: any): string => {
    if (!date) return "";
    const d = new Date(date);
    return isValid(d) ? format(d, "yyyy") : "";
  }

</script>

<div class="flex flex-col border-2 border-dotted rounded-sm bg-blue-500/5 border-indigo-500/50 nodrag w-[250px] h-[60px] px-[4px] py-[2px]">
  <span class="text-[7px] text-indigo-500/50 font-semibold">{renderYear(data.date)}</span>
</div>