import { Handle, Position, type NodeProps } from '@xyflow/react';
import { format, isValid } from 'date-fns';
import ParentHandle from './parent-handle';

export default function MemberNode({ id, data }: any) {
  const renderYear = (date: any): string => {
    if (!date) return '';
    const d = new Date(date);
    return isValid(d) ? format(d, 'yyyy') : '';
  };
  return <div className="flex flex-col justify-center items-center border-1 rounded-sm p-1 w-[100px] h-[40px] text-[8px]">
    {/* <div>{data.firstname} {data.lastname}</div> */}
    <div>{data.label}</div>
    <div>{renderYear(data.birthDate)} - {renderYear(data.deathDate)}</div>
    <ParentHandle
      id="top"
      type="target"
      position={Position.Top}
      isConnectable={false}
      connectionCount={2}
    />

    <Handle
      id="bottom"
      type="source"
      position={Position.Bottom}
      isConnectable={false}
    />
    {/* <Handle type="target" position={Position.Bottom} id="parentBottom" isConnectable={true} />
    <Handle type="source" position={Position.Top} id="childTop" isConnectable={true} />
    <Handle type="target" position={Position.Top} id="childTop" isConnectable={true} />
    <Handle type="source" position={Position.Bottom} id="parentBottom" isConnectable={true} /> */}
  </div>

}