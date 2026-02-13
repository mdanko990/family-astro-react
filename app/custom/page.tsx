'use client'

import { ReactFlow, Background, Controls, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange, Node, Edge, useReactFlow, addEdge, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useRef, useState } from 'react';
import MemberNode from './member-node';
import MemberDetails from './member-details';
import { v4 as uuidv4 } from 'uuid'
import { initialNodes, initialEdges } from './initial-nodes';
import ContextMenu from './context-menu';
function CustomFlow({setShowMemberDetails}: {setShowMemberDetails: (value: boolean)=>void}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const nodeTypes = {
    member: MemberNode,
  };
  
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [menu, setMenu] = useState<any>(null);
  const { screenToFlowPosition } = useReactFlow();
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onConnectEnd = useCallback(
    (event: any, connectionState: any) => {
      // when a connection is dropped on the pane it's not valid
      if (!connectionState.isValid) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = uuidv4();
        const { clientX, clientY } =
          'changedTouches' in event ? event.changedTouches[0] : event;
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: clientX,
            y: clientY,
          }),
          data: { label: `Node ${id}` },
          origin: [0.5, 0.0],
          type: "member",
          // draggable: false
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectionState.fromNode.id, target: id, type:"step"}),
        );
      }
    },
    [screenToFlowPosition],
  );

  const onNodeContextMenu = useCallback(
    (event: any, node: any) => {
      // Prevent native context menu from showing
      event.preventDefault();
 
      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      if (!ref.current) return;
      const pane = ref.current.getBoundingClientRect();
      console.log("pane", pane)
      console.log("event",event)
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu],
  );
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);
  return (
    <div style={{ height: '100%', width: '100%' }} className='flex'>
        <ReactFlow
          ref={ref}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          // onNodeClick={() => setShowMemberDetails(true)}
          // onConnect={onConnect}
          // onConnectEnd={onConnectEnd}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          fitView>
          <Background />
          <Controls />
          {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
        </ReactFlow>
            </div>
  )
}

export default function Custom(){
  const [showMemberDetails, setShowMemberDetails] = useState(false)

  return (
    <>
      <ReactFlowProvider>
        <CustomFlow setShowMemberDetails={setShowMemberDetails} />
      </ReactFlowProvider>
      {showMemberDetails ? <MemberDetails close={() => setShowMemberDetails(false)} /> : null}
    </>
  )
}