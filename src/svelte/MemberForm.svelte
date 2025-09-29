<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import DatePicker from "$lib/components/ui/DatePicker.svelte";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
  import * as Select from "$lib/components/ui/select";

  let { defaultValues, members, submit } = $props()
  let formData = $state({
    gender: "M",
    firstname: "",
    patronym: "",
    lastname: "",
    birthDate: "",
    deathDate: "",
    parentIds: [],
    children: [],
    ...defaultValues
  })
  const males = $state.raw(members.filter(member=>member.data.gender==='M'))
  const females = $state.raw(members.filter(member=>member.data.gender==='F'))

  const triggerContentFather = $derived(
    members.find((m) => m.id === formData.parentIds[0])?.label
  );
  const triggerContentMother = $derived(
    members.find((m) => m.id === formData.parentIds[1])?.label
  );
  console.log('formdata', formData, defaultValues)
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.birthDate) formData.birthDate = formData.birthDate.toString()
    if(formData.deathDate) formData.deathDate = formData.deathDate.toString()

    submit(formData)
  }
</script>

<form class="grid grid-cols-4 gap-4 py-4" onsubmit={handleSubmit}>
  <Label for="lastname" class="text-right col-span-1">Lastname</Label>
  <Input id="lastname" class="col-span-3" bind:value={formData.lastname} />
  <Label for="firstname" class="text-right">Firstname</Label>
  <Input id="firstname" class="col-span-3" bind:value={formData.firstname} />
  <Label for="patronym" class="text-right">Patronym</Label>
  <Input id="patronym" class="col-span-3" bind:value={formData.patronym} />
  <Label class="text-right">Gender</Label>
  <RadioGroup.Root bind:value={formData.gender} class="flex col-span-3">
    <div class="flex items-center space-x-2">
    <RadioGroup.Item value="M" id="male" />
    <Label for="male">Male</Label>
    </div>
    <div class="flex items-center space-x-2">
    <RadioGroup.Item value="F" id="female" />
    <Label for="female">Female</Label>
    </div>
  </RadioGroup.Root>
  <Label class="text-right">Birth date</Label>
  <DatePicker triggerProps={{ class: "col-span-3" }} bind:value={formData.birthDate}/>
  <Label class="text-right">Death date</Label>
  <DatePicker triggerProps={{ class: "col-span-3" }} bind:value={formData.deathDate}/>
  <Label class="text-right">Father</Label>
  <Select.Root type="single" allowDeselect bind:value={formData.parentIds[0]}>
    <Select.Trigger class="w-full col-span-3">{triggerContentFather}</Select.Trigger>
    <Select.Content>
      {#each males as member}
        <Select.Item value={member.id}>{member.label}</Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>
  <Label class="text-right">Mother</Label>
  <Select.Root type="single" allowDeselect bind:value={formData.parentIds[1]}>
    <Select.Trigger class="w-full col-span-3">{triggerContentMother}</Select.Trigger>
    <Select.Content>
      {#each females as member}
        <Select.Item value={member.id}>{member.label}</Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>
  <div class="flex justify-center col-span-4">
    <Button type="submit">Submit</Button>
  </div>
</form>