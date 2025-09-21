<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import type { ComponentProps } from "svelte";

  let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>
<Sidebar.Root {...restProps} collapsible="offcanvas" variant="sidebar" side="left" >
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
          {#snippet child({ props })}
            <a href="##" {...props}>
              <span class="text-base font-semibold">Acme Inc.</span>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
  <Sidebar.Content>
    Content
  </Sidebar.Content>
  <Sidebar.Footer>
    Footer
  </Sidebar.Footer>
</Sidebar.Root>