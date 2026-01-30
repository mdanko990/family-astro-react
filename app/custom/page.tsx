'use client'

import { ReactFlow, Background, Controls, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';
import MemberNode from './member-node';
import MemberDetails from './member-details';

export default function Custom() {
  const [showMemberDetails, setShowMemberDetails] = useState(false)
  const nodeTypes = {
    member: MemberNode,
  };
  const initialNodes = [
    {
      id: 'n1',
      type: "member",
      position: { x: 0, y: 0 },
      data: { label: 'Node 1' },
    },
    {
      id: 'n2',
      type: "member",
      position: { x: 100, y: 100 },
      data: { label: 'Node 2' },
    },
  ];
  const initialEdges = [
    {
      id: 'n1-n2',
      source: 'n1',
      target: 'n2',
      type: "step"
    },
  ];
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  return (
    <div style={{ height: '100%', width: '100%' }} className='flex'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={()=>setShowMemberDetails(true)}>
        <Background />
        <Controls />
      </ReactFlow>
      {showMemberDetails ? <MemberDetails close={()=>setShowMemberDetails(false)}/> : null}
    </div>
  )
}