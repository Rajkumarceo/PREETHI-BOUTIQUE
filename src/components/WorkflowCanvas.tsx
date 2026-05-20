"use client";

import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Node,
  Edge,
  Handle,
  Position,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Smartphone, Cpu, Settings, Zap } from 'lucide-react';

// Node A
function TelegramTriggerNode({ data }: { data: any }) {
  return (
    <div className="bg-[#faf9f6]/80 backdrop-blur-md border border-[#1a1a1a]/20 rounded-[16px] p-4 shadow-xl w-[280px]">
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-[#1a1a1a] !border-2 !border-[#faf9f6]" />
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center shadow-md">
          <Smartphone className="w-4 h-4 text-[#faf9f6]" />
        </div>
        <h3 className="text-[#1a1a1a] font-bold text-xs tracking-widest uppercase">Telegram Input</h3>
      </div>
      <p className="text-[11px] text-[#1a1a1a]/60">Listening for user messages...</p>
    </div>
  );
}

// Node B
function AICoreNode({ data }: { data: any }) {
  return (
    <div className="bg-[#1a1a1a]/90 backdrop-blur-md border border-[#faf9f6]/20 rounded-[16px] p-4 shadow-2xl w-[320px]">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-[#faf9f6] !border-2 !border-[#1a1a1a]" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-[#faf9f6] !border-2 !border-[#1a1a1a]" />
      <div className="flex items-center justify-center gap-3 mb-4 border-b border-[#faf9f6]/10 pb-4">
        <Cpu className="w-5 h-5 text-[#faf9f6]" />
        <h3 className="text-[#faf9f6] font-bold text-xs tracking-widest uppercase">AI Core Agent</h3>
      </div>
      <div className="flex gap-2 justify-center">
        <span className="text-[10px] font-bold tracking-widest uppercase bg-[#faf9f6]/10 text-[#faf9f6] px-3 py-1.5 rounded-full border border-[#faf9f6]/20 flex items-center gap-1"><Zap className="w-3 h-3 text-nykaa-pink" /> Gemini</span>
        <span className="text-[10px] font-bold tracking-widest uppercase bg-[#faf9f6]/10 text-[#faf9f6] px-3 py-1.5 rounded-full border border-[#faf9f6]/20 flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-400" /> Groq</span>
      </div>
    </div>
  );
}

// Node C
function ToolsNode({ data }: { data: any }) {
  return (
    <div className="bg-[#faf9f6]/80 backdrop-blur-md border border-[#1a1a1a]/20 rounded-[16px] p-4 shadow-xl w-[280px]">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-[#1a1a1a] !border-2 !border-[#faf9f6]" />
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center bg-white/50 shadow-sm">
          <Settings className="w-4 h-4 text-[#1a1a1a]" />
        </div>
        <h3 className="text-[#1a1a1a] font-bold text-xs tracking-widest uppercase">Operational Tools</h3>
      </div>
      <ul className="text-xs text-[#1a1a1a]/70 space-y-2 font-medium tracking-wide">
        <li className="flex items-center gap-2 px-3 py-2 bg-white/50 rounded-lg border border-[#1a1a1a]/5">• Tracking APIs</li>
        <li className="flex items-center gap-2 px-3 py-2 bg-white/50 rounded-lg border border-[#1a1a1a]/5">• Email Routing</li>
      </ul>
    </div>
  );
}

const nodeTypes = {
  telegramNode: TelegramTriggerNode,
  aiCoreNode: AICoreNode,
  toolsNode: ToolsNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'telegramNode',
    position: { x: 50, y: 150 },
    data: { label: 'Telegram Trigger' },
  },
  {
    id: '2',
    type: 'aiCoreNode',
    position: { x: 450, y: 140 },
    data: { label: 'AI Core' },
  },
  {
    id: '3',
    type: 'toolsNode',
    position: { x: 880, y: 145 },
    data: { label: 'Tools' },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#1a1a1a', strokeWidth: 2 },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: true,
    style: { stroke: '#1a1a1a', strokeWidth: 2, opacity: 0.5 },
  },
];

export default function WorkflowCanvas() {
  const onNodesChange = useCallback((changes: NodeChange[]) => {}, []);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => {}, []);

  return (
    <div className="w-full h-full min-h-[500px] rounded-[30px] overflow-hidden border border-[#1a1a1a]/10 bg-[#faf9f6]/40 backdrop-blur-md shadow-inner relative">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        className="react-flow-dashboard"
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#1a1a1a" className="opacity-20" />
        <Controls className="!bg-[#faf9f6]/80 !border-[#1a1a1a]/10 !shadow-md !rounded-xl overflow-hidden [&>button]:!border-b-[#1a1a1a]/10 [&>button]:!text-[#1a1a1a] hover:[&>button]:!bg-[#1a1a1a]/5" />
      </ReactFlow>
    </div>
  );
}
