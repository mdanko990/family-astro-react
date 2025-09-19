<script>
  import Button from "@lib/components/ui/button/button.svelte";
  import Plus from "@lucide/svelte/icons/plus"
  import ChevronsRight from "@lucide/svelte/icons/chevrons-right"
  import ChevronsLeft from "@lucide/svelte/icons/chevrons-left"

  let open = $state(false);
</script>

<div class="mt-10">
  <Button variant="secondary" size="icon" class="size-8">
    <Plus strokeWidth={1} />
  </Button>
  <Button variant="secondary" size="icon" class="size-8">
    {#if open}
      <ChevronsLeft strokeWidth={1} onClick={()=>{open=!open}}/>
    {:else}
      <ChevronsRight strokeWidth={1} onClick={()=>{open=!open}}/>
    {/if}
  </Button>
</div>