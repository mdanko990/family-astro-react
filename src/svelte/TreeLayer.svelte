<script>
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import DraftsDrawer from "$lib/components/DraftsDrawer.svelte";
  import TreeGraph from "./TreeGraph.svelte";
</script>

<Sidebar.Provider>
  <DraftsDrawer />
  <TreeGraph />
</Sidebar.Provider>