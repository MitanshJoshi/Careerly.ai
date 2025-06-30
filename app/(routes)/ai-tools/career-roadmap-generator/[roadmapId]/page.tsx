"use client";

import RoadmapDialog from '@/app/(routes)/dashboard/_components/RoadmapDialog';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import ReactFlow, { Background, Controls, MiniMap, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

const AiRoadmapAgent = () => {
  const { roadmapId } = useParams();
  const [roadmap, setRoadmap] = React.useState<any>(null);
  const [oepnDialog, setRoadmapDialogOpen] = React.useState<boolean>(false);

  useEffect(() => {
    roadmapId && getRoadmap();
    // eslint-disable-next-line
  }, [roadmapId]);

  const getRoadmap = async () => {
    const result = await axios.get("/api/history", {
      params: {
        recordId: roadmapId,
      },
    });

    if (result.data.length > 0) {
      setRoadmap(result.data[0].content);
    }
  };

  // Convert roadmap.initialNodes and roadmap.initialEdges to react-flow format
  const nodes = roadmap?.initialNodes?.map((node: any) => ({
    id: node.id,
    type: 'roadmap', // use custom node type
    position: node.position,
    data: {
      title: node.data.title,
      description: node.data.description,
      link: node.data.link,
    },
  })) || [];

  const edges = roadmap?.initialEdges?.map((edge: any) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
  })) || [];

  // Custom node component
  const RoadmapNode = ({ data }: any) => (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        padding: 12,
        minWidth: 180,
        maxWidth: 260,
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
        overflow: 'visible', // allow content to expand
        wordBreak: 'break-word',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Handle type="target" position={Position.Top} />
      <div className="font-semibold text-indigo-700 mb-1">{data.title}</div>
      <div className="text-xs text-gray-600 mb-2">{data.description}</div>
      <a
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline text-xs"
        style={{ marginTop: 4, wordBreak: 'break-all' }}
      >
        Resource
      </a>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );

  const nodeTypes = {
    roadmap: RoadmapNode,
  };

  return (
    <div>
      <div className='w-full flex items-center justify-between mb-4'>
      <h1 className='text-2xl font-semibold mb-2'>{roadmap?.roadmapTitle || "Career Roadmap"}</h1>
      <Button onClick={()=> setRoadmapDialogOpen(true)}>
        + New Roadmap
      </Button>
      </div>
      <p className="mb-4 text-gray-600">{roadmap?.description}</p>
      <div className="mb-4 text-sm text-gray-500">{roadmap?.duration}</div>
      <div style={{ width: '100%', height: '67vh', background: '#f9fafb', borderRadius: 8 }}>
        {nodes.length > 0 ? (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            panOnScroll
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        ) : (
          <p>Loading roadmap...</p>
        )}
      </div>

      <RoadmapDialog openDialog={oepnDialog} setRoadmapDialogOpen={setRoadmapDialogOpen}/>
    </div>
  );
};

export default AiRoadmapAgent;