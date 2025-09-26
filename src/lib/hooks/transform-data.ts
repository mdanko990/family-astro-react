import type { Edge, Node } from '@xyflow/svelte';

const getMarriageEdgeId = (node, partnerId) => {
  switch (node.gender) {
    case 'M':
      return `m:${node.id}&${partnerId}`;
    case 'F':
      return `m:${partnerId}&${node.id}`;
  }
};

export const transformData = (data: Member[]) => {
  const personNodes: Node[] = [];
  // const marriageNodes: Node[] = [];
  const edges: Edge[] = [];

  // 1) Add person nodes
  data.forEach(member => {
    personNodes.push({
      id: member.id,
      type: 'person',
      position: { x: 0, y: 0 }, // ELK will update this
      draggable: member.isDraft,
      data: member,
    });

    if (!member.marriages || !member.marriages.length) return;

    // 2) Add marriages for this person
    member.marriages.forEach((m) => {
      if (!m.partnerId) return;

      // const mid = getMarriageNodeId(member, m.partnerId);
      // // if marriage node doesn't exist yet → add
      // if (!marriageNodes.find((n) => n.id === mid)) {
      //   marriageNodes.push({
      //     id: mid,
      //     type: 'marriage',
      //     position: { x: 0, y: 0 },
      //     data: { partnerIds: [member.id, m.partnerId], childIds: m.childrenIds ?? [] },
      //   });
      // }

      // 3) Partner → marriage edges
      // const marriageEdgeId = getMarriageEdgeId(member, m.partnerId);
      // if(!edges.find(e=>e.id===marriageEdgeId)) {
      //   edges.push({
      //     id: marriageEdgeId,
      //     source: m.partnerId,
      //     target: member.id,
      //     sourceHandle: member.gender === "M" ? "partnerLeft" : "partnerRight",
      //     targetHandle: member.gender === "M" ? "marriageRight" : "marriageLeft"
      //   });
      // }

      // 4) Parents → children edges
      for (const cid of m.childrenIds ?? []) {
        const childParentEdgeId = `e:${member.id}->${cid}`
        edges.push({
          id: childParentEdgeId,
          source: cid,
          target: member.id,
          sourceHandle: "childTop",
          targetHandle: "parentBottom"
        });
      }
    });
  })

  // const nodes = [...personNodes, ...marriageNodes]

  return {
    rawNodes: personNodes, //nodes,
    rawEdges: edges,
  };
};
