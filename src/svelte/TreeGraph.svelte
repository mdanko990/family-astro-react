<script lang="ts">
import '@xyflow/svelte/dist/style.css';
import { SvelteFlow, Background, Controls, Panel, type Node } from '@xyflow/svelte';
import TreeNode from './TreeNode.svelte';
import MarriageNode from './MarriageNode.svelte';
import ButtonPanel from './ButtonPanel.svelte';
import {v4 as uuidv4} from 'uuid';

type Member = {
 id: string,
 label: string,
 gender: "F" | "M",
 firstname: string,
 patronym: string,
 lastname: string,
 birthDate: string,
 deathDate: string,
 parentIds: string[],
 partnerId: string | null,
 children: string[],
 isMain?: boolean,
}
const data: Member[] = [
{ id: '1', label: 'Kateryna Shut', gender: "F", firstname: 'Kateryna', patronym: 'Mykolaiivna', lastname: 'Shut', birthDate: "1950-09-23T00:00:00Z", deathDate: null, parentIds: ['2', '3'], partnerId: null, children: [], isMain: true },
{ id: '2', label: 'Mykola Shut', gender: "M", firstname: 'Mykola', patronym: 'Fedunovych', lastname: 'Shut', birthDate: "1925-03-25T00:00:00Z", deathDate: "2010-10-18T00:00:00Z", parentIds: [], partnerId: '3', children: ['1'] },
{ id: '3', label: 'Mariia Romanenko', gender: "F", firstname: 'Mariia', patronym: 'Fedorivna', lastname: 'Romanenko', birthDate: "1925-07-10T00:00:00Z", deathDate: "2003-10-18T00:00:00Z", parentIds: [], partnerId: '2', children: ['1'] }
]

// const getMarriageNodeId = (node) => {
//   switch (node.gender) {
//     case "M": return `${node.id}-${node.partnerId}`
//     case "F": return `${node.partnerId}-${node.id}`
//   }
// }
const getParentPosition = (gender, child) => {
  switch (gender) {
    case "M": return { x: -70, y: -60 }
    case "F": return { x: 70, y: -60 }
  }
}
const groupData = () => {
  //add nodes for each person
  const peopleNodes: Node[] = data.map((item)=>{
    let position
    if(item.isMain) position = { x: 0, y: 0}
    if(!item.isMain && item.children.length) position = getParentPosition(item.gender, item.children[0])
    return ({
      id: item.id,
        type: 'main',
        data: item,
        position: position,
        // parentId: item.partnerId ? getMarriageNodeId(item) : null
      }
    )
  })
  //add marriage parent nodes
  // const marriageNodes: Node[] = peopleNodes.reduce((acc: Node[], current: Node) => {
  //   const exists = acc?.find(item=>item?.id === current.parentId)
  //   if(!exists && current && current.data.partnerId) {
  //     const partnerNode = peopleNodes.find(node=>node?.id === current.data.partnerId)
  //     console.log('partner', partnerNode)
  //     acc.push({
  //       id: current.parentId,
  //       type: 'marriage',
  //       data: { date: new Date()},
  //       position: {
  //         x: (current.data.position.x + partnerNode.data.position.x) / 2 - 75,
  //         y: current.position.y - 15
  //       }
  //     })
  //   }
  //   return acc
  // }, [] as Node[])
  //add marriageNodes
  // const allNodes =  peopleNodes.concat(marriageNodes)
  // const allNodes =  marriageNodes.concat(peopleNodes)

  return peopleNodes
}

let nodes = $state(groupData())
let edges = $state([])
// let edges = $state.raw(data.reduce((acc, person) => {
//   const parentNodes = nodes.filter(node => person.parentIds.includes(node.id));
//   const fatherNode = parentNodes.find(node => node.data.gender === "M")
//   const motherNode = parentNodes.find(node => node.data.gender === "F")
//   if(fatherNode && motherNode) {
//     const personEdge = {
//       id: `e${fatherNode?.id}&${motherNode?.id}-${person.id}`,
//       source: `${fatherNode?.id}&${motherNode?.id}`,
//       target: person.id,
//       type: 'smoothstep',
//     };
//     acc.push(personEdge);
//   }
//   return acc
// }, []));
const nodeTypes = { main: TreeNode, marriage: MarriageNode };

const memberAddClick = (member: Member) => {
  const newNode = {
    data: member,
    position: {x: -150, y: 150},
    type: 'main',
    id: uuidv4()
  }
  console.log(newNode)
  nodes.push(newNode)
}
</script>

<div style:width="100vw" style:height="100vh">
  <SvelteFlow bind:nodes bind:edges {nodeTypes} fitView>
    <Background />
    <Controls />
    <Panel position="top-left">
      <ButtonPanel {memberAddClick} members={data} />
    </Panel>
  </SvelteFlow>
</div>