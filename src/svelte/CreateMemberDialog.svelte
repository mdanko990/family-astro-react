<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import UserRoundPlus from "@lucide/svelte/icons/user-round-plus";
  import MemberForm from "./MemberForm.svelte";

  let { open = $bindable(false), defaultValues = $bindable(null), submit, members } = $props()
  const handleSubmit = (data) => {
    submit(data)
  }
</script>
 
<Dialog.Root bind:open>
 <Dialog.Content class="max-w-[525px]">
  <Dialog.Header>
   <Dialog.Title>Create a member</Dialog.Title>
   <Dialog.Description>
    This member would not be connected by default.
   </Dialog.Description>
  </Dialog.Header>
  <MemberForm {defaultValues} {members} submit={handleSubmit}/>
 </Dialog.Content>
</Dialog.Root>