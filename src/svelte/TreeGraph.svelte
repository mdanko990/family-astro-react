<script>
import '@xyflow/svelte/dist/style.css';
import { SvelteFlow, Background, Controls, Panel } from '@xyflow/svelte';
import TreeNode from './TreeNode.svelte';
import ButtonPanel from './ButtonPanel.svelte';

const data = [
{ gender: "F", firstname: 'Kateryna', patronym: 'Mykolaiivna', lastname: 'Shut', birthDate: "1950-09-23T00:00:00Z", deathDate: null, parentIds: ['2', '3'], children: [], isMain: true, position: {x:600, y: 500} },
{ gender: "M", firstname: 'Mykola', patronym: 'Fedunovych', lastname: 'Shut', birthDate: "1925-03-25T00:00:00Z", deathDate: "2010-10-18T00:00:00Z", parentIds: [], children: ['1'], position: {x:540, y: 430} },
{ gender: "F", firstname: 'Mariia', patronym: 'Fedorivna', lastname: 'Romanenko', birthDate: "1925-07-10T00:00:00Z", deathDate: "2003-10-18T00:00:00Z", parentIds: [], children: ['1'], position: {x:660, y: 430} }
]

// const fatherX = (children) => {
//   return ( children.length > 1
//     ? children[children.length - 1].position.x + 50 - children[0].position.x
//     : children[0].position.x
//   ) - 50 - 10}

// const motherX = (children) => ( children.length > 1
//         ? children[children.length - 1].position.x + 50 - children[0].position.x
//         : children[0].position.x
//       ) + 50 + 10

// const parentY = (child) => child.position.y + 10 + 25

// const calcPosition = (node) => {
//   const screenWidth = window.innerWidth
//   const screenHeight = window.innerHeight
//   console.log('IS MAIN', node.isMain)
//   if(node.isMain) return ({ x: screenWidth/2 - 50, y: screenHeight - 30})
//   else {
//     const { children } = node
//     if(!children || !children.length) return ({ x: undefined, y: undefined })

//     const parentX = node.gender === "M" ? fatherX(children) : motherX(children)
//     const parentY = parentY(children[0])
      
//     return ({ x: parentX, y: parentY })
//   }
// }


// let nodes = $state.raw(data.map(person => ({
//   id: person.id,
//   data: person,
//   type: 'main',
//   position: person.position
// })));
let nodes = $state.raw([
  {
    id: 'A',
    data: { label: 'parent' },
    position: { x: 0, y: 0 },
  },
  {
    id: 'B',
    data: { label: 'child' },
    position: { x: 10, y: 10 },
    parentId: 'A',
  },
]);
let edges = $state.raw([]);
// let edges = $derived(data.reduce((acc, person) => {
//   const personEdges = (person.parentIds || []).map(parentId => ({
//     id: `e${parentId}-${person.id}`,
//     source: parentId,
//     target: person.id
//   }));
//   return acc.concat(...personEdges);
// }, []));
const nodeTypes = { main: TreeNode };

</script>

<div style:width="100vw" style:height="100vh">
  <SvelteFlow bind:nodes bind:edges {nodeTypes}>
    <Background />
    <Controls />
    <Panel position="top-right">
      <ButtonPanel />
    </Panel>
  </SvelteFlow>
</div>