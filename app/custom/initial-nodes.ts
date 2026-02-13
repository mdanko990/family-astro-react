export const initialNodes = [
  { id: '1', position: { x: 175, y: 0 }, data: { label: 'a' }, type: "member" },
  { id: '2', position: { x: 0, y: 250 }, data: { label: 'b' }, type: "member" },
  { id: '3', position: { x: 175, y: 250 }, data: { label: 'c' }, type: "member" },
  { id: '4', position: { x: 350, y: 250 }, data: { label: 'd' }, type: "member" },
];

export const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: "step"
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: "step"
  },
  {
    id: 'e1-4',
    source: '1',
    target: '4',
    type: "step"
  },
];

export default { initialNodes, initialEdges };
