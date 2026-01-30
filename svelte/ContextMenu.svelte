<script lang="ts">
  import { ContextMenu } from 'bits-ui';
  import Plus from '@lucide/svelte/icons/plus';
  import { Separator } from '../lib/components/ui/separator';
  import { useEdges, useNodes, useSvelteFlow

    , type Edge } from '@xyflow/svelte';
  import CreateMemberDialog from './CreateMemberDialog.svelte';
  import { layoutWithElk } from '$lib/hooks/layout-with-elkjs';
  import { v4 as uuidv4 } from 'uuid';
  import { addParentChildConnection, addPartnerConnection } from '$lib/hooks/transform-data';
 
  let {
    id,
    data,
    top,
    left,
    right,
    bottom,
    onclick,
  }: {
    id: string;
    data: any;
    top: number | undefined;
    left: number | undefined;
    right: number | undefined;
    bottom: number | undefined;
    onclick: () => void;
  } = $props();
 
  let openCreate = $state(false)
  let defaultValues = $state(null)
  const { deleteElements } = useSvelteFlow();

  //To check the docs https://svelteflow.dev/examples/interaction/context-menu
  const nodes = useNodes();
  const edges = useEdges();

  const create = async (newMember: any) => {
    console.log(newMember)
    const newId = uuidv4()
    const newNode = {id: newId, newMember, type: 'person', position: { x: 0, y: 0 }}
    const newEdges = []
    const newMarriageEdges = []
    //if parents were added
    if(newMember.parentIds && newMember.parentIds.length && newMember.parentIds.every(id=>!!id)) {
      newMember.parentIds.forEach(id => {
        const newEdge = addParentChildConnection(edges.current, id, newId)
        if(newEdge) newEdges.push(newEdge)
      })
    }
    //if marriage was added
    if(newMember.marriages.length === 1) { //for now person can have only one marriage
      const newEdge = addPartnerConnection(edges.current, data, newId)
      if(newEdge) newMarriageEdges.push(newEdge)
    }
    const layoutData = await layoutWithElk([...nodes.current, newNode], [...edges.current, ...newEdges])
    //add marriage edge if there was new one created
    if(newMarriageEdges.length) {
      layoutData.edges = [...layoutData.edges, ...newMarriageEdges]
    }
    nodes.current = layoutData.nodes
    edges.current = layoutData.edges
    close()
  };

  const edit = async (member: any) => {
    console.log('edit') //go to bigger edit page to see all details
  };

  const remove = () => {
    console.log('remove');
    deleteElements({ nodes: [{ id }] });
  };

  const draft = () => {
    console.log('draft');
  };

  const openDialog = (member: string) => {
    switch(member){
      case "parent": 
        defaultValues = {lastname: data.lastname} //add default partnerId and add alert dialog if there is already one marriage to add another one
        break
      case "child":
        defaultValues = {lastname: data.gender === "M" ? data.lastname : "", parentIds:[id]}
        break
      case "partner":
        defaultValues = {gender: data.gender === "M" ? "F" : "M", marriages: [{ partnerId: [id] }]}
        break
      case "sibling":
        defaultValues = {lastname: data.lastname, parentIds: data.parentIds ?? []}
        break
    }
    openCreate = true;
  };
  const close = () => {
    openCreate = false;
    onclick()
  }
</script>


{#snippet addMember(label)}
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class='cursor-pointer p-2 hover:bg-neutral-100 flex items-center gap-1 w-full' onclick={(e)=>{e.stopPropagation();openDialog(label)}}>
  <Plus size={18} strokeWidth={1.5} />
  {label}
</div>
{/snippet}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div style="position: relative; top: {top}px; left: {left}px; right: {right}px; bottom: {bottom}px;" {onclick} class="bg-white w-35 shadow-md rounded-sm z-1 border-1 border-black/5">
  {@render addMember("parent")}
  {@render addMember("sibling")}
  {@render addMember("child")}
  {@render addMember("partner")}
  <Separator />
  <!-- <div
    class='cursor-pointer px-2 py-1 hover:bg-neutral-100 flex items-center gap-1'
    onclick={draft}>Move to drafts</div
  > -->
  <!-- <div
    class='cursor-pointer px-2 py-1 hover:bg-neutral-100 flex items-center gap-1'
    onclick={edit}>Edit</div
  > -->
  <div
    class='cursor-pointer px-2 py-1 hover:bg-neutral-100 flex items-center gap-1 text-red-700'
    onclick={remove}>Delete</div
  >
</div>
<CreateMemberDialog
  bind:open={openCreate}
  submit={create}
  members={nodes.current}
  bind:defaultValues
/>
