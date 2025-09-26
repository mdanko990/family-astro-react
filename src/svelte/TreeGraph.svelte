<script lang="ts">
  import '@xyflow/svelte/dist/style.css';
  import { SvelteFlow, Background, Controls, Panel, type Node, type Edge, getConnectedEdges, useUpdateNodeInternals, SvelteFlowProvider, type NodeEventWithPointer } from '@xyflow/svelte';
  import PersonNode from './PersonNode.svelte';
  import { v4 as uuidv4 } from 'uuid';
  import ControlPanel from './ControlPanel.svelte';
  import { onMount } from 'svelte';
  import { layoutWithElk } from '$lib/hooks/layout-with-elkjs';
  import { transformData } from '$lib/hooks/transform-data';
  import Loading from '$lib/components/Loading.svelte';
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import DraftsDrawer from '$lib/components/DraftsDrawer.svelte';
    import ContextMenu from 'src/svelte/ContextMenu.svelte';
  
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

  let menu: {
    id: string;
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  } | null = $state(null);
  let clientWidth: number = $state();
  let clientHeight: number = $state();
  const handleContextMenu: NodeEventWithPointer = ({ event, node }) => {
    // Prevent native context menu from showing
    event.preventDefault();
 
    // Calculate position of the context menu. We want to make sure it
    // doesn't get positioned off-screen.
    menu = {
      id: node.id,
      top: event.clientY < clientHeight - 200 ? event.clientY : undefined,
      left: event.clientX < clientWidth - 200 ? event.clientX : undefined,
      right:
        event.clientX >= clientWidth - 200
          ? clientWidth - event.clientX
          : undefined,
      bottom:
        event.clientY >= clientHeight - 200
          ? clientHeight - event.clientY
          : undefined,
    };
  };
 
  // Close the context menu if it's open whenever the window is clicked.
  function handlePaneClick() {
    menu = null;
  }

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
  <div style:width="100vw" style:height="100vh" bind:clientWidth bind:clientHeight>
    {#if isLoading}
    <Loading />
    {:else}
    <SvelteFlowProvider>
      <SvelteFlow bind:nodes bind:edges {nodeTypes} fitView onnodecontextmenu={handleContextMenu}
        onpaneclick={handlePaneClick}>
        <Background />
        <Controls />
        <Panel position="top-left">
          <ControlPanel {memberAddClick} members={data} />
        </Panel>
        {#if menu}
          <ContextMenu
            onclick={handlePaneClick}
            id={menu.id}
            top={menu.top}
            left={menu.left}
            right={menu.right}
            bottom={menu.bottom}
          />
        {/if}
      </SvelteFlow>
    </SvelteFlowProvider>
    {/if}
  </div>
</Sidebar.Provider>
  