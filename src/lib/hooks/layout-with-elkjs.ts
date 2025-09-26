import ELK from "elkjs/lib/elk.bundled.js";
const elk = new ELK();

export async function layoutWithElk(nodes, edges) {
  const graph = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "UP",
      "elk.spacing.nodeNode": "20",
      "elk.layered.spacing.nodeNodeBetweenLayers": "40"
    },
    children: nodes.map(n => ({
      id: n.id,
      width: n.type === "marriage" ? 20 : 120,
      height: n.type === "marriage" ? 20 : 60,
    })),
    edges: edges.map(e => ({
      id: e.id,
      sources: [e.source],
      targets: [e.target]
    }))
  };

  const layout = await elk.layout(graph);

  return {
    nodes: nodes.map(n => {
      const pos = layout.children.find(c => c.id === n.id);
      return { ...n, position: { x: pos.x, y: pos.y } };
    }),
    edges
  };
}
