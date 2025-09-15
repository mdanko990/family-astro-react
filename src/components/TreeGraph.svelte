<script>
import '@xyflow/svelte/dist/style.css';
import { SvelteFlow, Background, Controls } from '@xyflow/svelte';
import TreeNode from './TreeNode.svelte';

const data = [
{ firstname: 'Kateryna', patronym: 'Mykolaivna', lastname: 'Shut', birthDate: "1950-09-23T00:00:00Z", deathDate: null, parentIds: ['2', '3'] },
{ firstname: 'Mykola', patronym: 'Fedunovych', lastname: 'Shut', birthDate: "1925-03-25T00:00:00Z", deathDate: "2010-10-18T00:00:00Z", parentIds: [] },
{ firstname: 'Mariia', patronym: 'Fedorivna', lastname: 'Romanenko', birthDate: "1925-07-10T00:00:00Z", deathDate: "2003-10-18T00:00:00Z", parentIds: [] }
]
let nodes = $derived(data.map(person => ({
  id: person.id,
  data: person,
  type: 'main',
  position: { x: 0, y: 0 } // temp, will compute below
})));

let edges = $derived(data.reduce((acc, person) => {
  const personEdges = (person.parentIds || []).map(parentId => ({
    id: `e${parentId}-${person.id}`,
    source: parentId,
    target: person.id
  }));
  return acc.concat(...personEdges);
}, []));
const nodeTypes = { main: TreeNode };

</script>

<div style:width="100vw" style:height="100vh">
  <SvelteFlow bind:nodes bind:edges {nodeTypes}>
    <Background />
    <Controls />
  </SvelteFlow>
</div>