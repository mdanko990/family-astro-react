<script lang="ts">
 import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
 import { navigationMenuTriggerStyle } from "$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";
 import CircleUserRound from "@lucide/svelte/icons/circle-user-round";
 
  const {isPinned = false} = $props();

</script>
 
<div class={`w-full h-10 flex justify-center border-b-1 border-solid bg-white ${isPinned?'absolute z-1':''}`}>
  <NavigationMenu.Root viewport={false}>
    <NavigationMenu.List>
      <NavigationMenu.Item>
        <NavigationMenu.Link>
          {#snippet child()}
          <a href="/" class={navigationMenuTriggerStyle()}>Home</a>
          {/snippet}
        </NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link>
          {#snippet child()}
          <a href="/list" class={navigationMenuTriggerStyle()}>List</a>
          {/snippet}
        </NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>
          <CircleUserRound strokeWidth={1} />
        </NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <ul class="grid w-[200px] gap-4 p-2">
          <li>
            <NavigationMenu.Link href="#">Profile</NavigationMenu.Link>
            <NavigationMenu.Link href="#" class="text-red-600 hover:text-red-700">Logout</NavigationMenu.Link>
          </li>
          </ul>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
</div>