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
    import fetcher from '$lib/hooks/fetcher';

  let data: Member[] = $state([]);
  let nodes: Node[] = $state.raw([]);
  let edges: Edge[] = $state.raw([]);
  let isLoading: boolean = $state(false);

  
  
	onMount(async () => {
    isLoading = true
    const persons = await fetcher('/api/persons')
    console.log(persons)
		data = await fetch('data/persons.json').then((x) => x.json());
    
    const { rawNodes, rawEdges, marriageEdges } = transformData(persons);

    const layoutData = await layoutWithElk(rawNodes, rawEdges)

    console.log(marriageEdges)
    nodes = layoutData.nodes
    edges = [...layoutData.edges, ...marriageEdges]
    isLoading = false
  });

  const nodeTypes = { person: PersonNode };

  let menu: {
    id: string;
    data: any;
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
      data: node.data,
      top: event.clientY < clientHeight - 100 ? event.clientY : undefined,
      left: event.clientX < clientWidth - 100 ? event.clientX - 255 : undefined,
      right:
        event.clientX >= clientWidth - 100
          ? clientWidth - event.clientX - 500
          : undefined,
      bottom:
        event.clientY >= clientHeight - 100
          ? clientHeight - event.clientY + 100
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
            data={menu.data}
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
  