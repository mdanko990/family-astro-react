<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import UserRoundPlus from "@lucide/svelte/icons/user-round-plus";
  import MemberForm from "./MemberForm.svelte";

  let { submit, members } = $props()
  let open = $state(false)

  const handleSubmit = (data) => {
    submit(data)
    open = false
  }
</script>
 
<Dialog.Root bind:open>
 <Dialog.Trigger class={buttonVariants({variant: "ghost", size: "xs"})} >
    <UserRoundPlus />
 </Dialog.Trigger>
 <Dialog.Content class="max-w-[525px]">
  <Dialog.Header>
   <Dialog.Title>Create a member</Dialog.Title>
   <Dialog.Description>
    This member would not be connected by default.
   </Dialog.Description>
  </Dialog.Header>
  <MemberForm {members} submit={handleSubmit}/>
 </Dialog.Content>
</Dialog.Root>