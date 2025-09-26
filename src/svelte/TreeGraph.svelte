<script lang="ts">
  import '@xyflow/svelte/dist/style.css';
  import { SvelteFlow, Background, Controls, Panel, type Node, type Edge, getConnectedEdges, useUpdateNodeInternals, SvelteFlowProvider } from '@xyflow/svelte';
  import PersonNode from './PersonNode.svelte';
  import { v4 as uuidv4 } from 'uuid';
  import ControlPanel from './ControlPanel.svelte';
  import { onMount } from 'svelte';
  import { layoutWithElk } from '$lib/hooks/layout-with-elkjs';
  import { transformData } from '$lib/hooks/transform-data';
  import Loading from '$lib/components/Loading.svelte';
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import DraftsDrawer from '$lib/components/DraftsDrawer.svelte';
  
  let data: Member[] = $state([]);
  let nodes: Node[] = $state.raw([]);
  let edges: Edge[] = $state.raw([]);
  let isLoading: boolean = $state(false);

	onMount(async () => {
    isLoading = true
		data = await fetch('data/persons.json').then((x) => x.json());
    
    const { rawNodes, rawEdges } = transformData(data);

    const layoutData = await layoutWithElk(rawNodes, rawEdges)

    nodes = layoutData.nodes
    edges = layoutData.edges

    isLoading = false
  });

  const nodeTypes = { person: PersonNode };

  const memberAddClick = (member: Member) => {
    const newNode = {
      data: {...member, isDraft: true},
      position: { x: -150, y: 150 },
      type: 'person',
      draggable: true,
      id: uuidv4(),
    };
    console.log(newNode);
    nodes = [...nodes, newNode];
  };
</script>

<Sidebar.Provider>
  <DraftsDrawer />
  <div style:width="100vw" style:height="100vh">
    {#if isLoading}
    <Loading />
    {:else}
    <SvelteFlowProvider>
      <SvelteFlow bind:nodes bind:edges {nodeTypes} fitView>
        <Background />
        <Controls />
        <Panel position="top-left">
          <ControlPanel {memberAddClick} members={data} />
        </Panel>
      </SvelteFlow>
    </SvelteFlowProvider>
    {/if}
  </div>
</Sidebar.Provider>
  