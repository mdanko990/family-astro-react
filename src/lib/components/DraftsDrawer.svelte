<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import type { ComponentProps } from "svelte";

  let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>
<Sidebar.Root {...restProps} collapsible="offcanvas" variant="sidebar" side="left">
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <h3>
          Drafted members
        </h3>
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