<script>
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import CreateMemberDialog from "./CreateMemberDialog.svelte";

  let {memberAddClick, members} = $props()
</script>

<div class="flex flex-col mt-10 mr-50">
  <Sidebar.Trigger/>
  <CreateMemberDialog submit={memberAddClick} {members} />
</div>