import { Handle, useNodeConnections } from '@xyflow/react';

const ParentHandle = (props: {type: string, connectionCount: number} & any) => {
  const connections = useNodeConnections({
    handleType: props.type,
  });

  return (
    <Handle
      {...props}
      isConnectable={connections.length < props.connectionCount}
    />
  );
};

export default ParentHandle;
