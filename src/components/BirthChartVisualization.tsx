import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { cn } from '@/lib/utils';
import { BirthChartData } from './BirthChartForm';

interface BirthChartVisualizationProps {
  className?: string;
  birthData?: BirthChartData;
}

// Custom Node Component for Planets
const PlanetNode = ({ data }: { data: any }) => {
  return (
    <div className={cn(
      "relative w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-2 shadow-lg",
      data.color || "bg-star-bright border-constellation text-night-deep"
    )}>
      <span>{data.symbol}</span>
      {data.showLabel && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-star-bright whitespace-nowrap">
          {data.label}
        </div>
      )}
    </div>
  );
};

// Custom Node Component for Houses
const HouseNode = ({ data }: { data: any }) => {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <div className="text-xs font-bold text-constellation">
        {data.number}
      </div>
      {data.showLabel && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
          {data.label}
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  planet: PlanetNode,
  house: HouseNode,
};

const BirthChartVisualization = ({ className, birthData }: BirthChartVisualizationProps) => {
  
  // Generate planetary positions (simplified calculation for demo)
  const generatePlanetaryData = useCallback(() => {
    if (!birthData) return { nodes: [], edges: [] };

    const planets = [
      { id: 'sun', symbol: '☉', name: 'Sun', color: 'bg-yellow-400 border-yellow-500 text-black' },
      { id: 'moon', symbol: '☽', name: 'Moon', color: 'bg-gray-200 border-gray-400 text-gray-800' },
      { id: 'mercury', symbol: '☿', name: 'Mercury', color: 'bg-orange-400 border-orange-500 text-white' },
      { id: 'venus', symbol: '♀', name: 'Venus', color: 'bg-pink-400 border-pink-500 text-white' },
      { id: 'mars', symbol: '♂', name: 'Mars', color: 'bg-red-500 border-red-600 text-white' },
      { id: 'jupiter', symbol: '♃', name: 'Jupiter', color: 'bg-purple-500 border-purple-600 text-white' },
      { id: 'saturn', symbol: '♄', name: 'Saturn', color: 'bg-blue-600 border-blue-700 text-white' },
      { id: 'uranus', symbol: '♅', name: 'Uranus', color: 'bg-cyan-500 border-cyan-600 text-white' },
      { id: 'neptune', symbol: '♆', name: 'Neptune', color: 'bg-indigo-500 border-indigo-600 text-white' },
      { id: 'pluto', symbol: '♇', name: 'Pluto', color: 'bg-gray-700 border-gray-800 text-white' },
      { id: 'north-node', symbol: '☊', name: 'North Node', color: 'bg-green-500 border-green-600 text-white' },
      { id: 'south-node', symbol: '☋', name: 'South Node', color: 'bg-red-400 border-red-500 text-white' },
    ];

    const centerX = 300;
    const centerY = 300;
    const radius = 200;

    // Create nodes for planets positioned in a circle
    const planetNodes: Node[] = planets.map((planet, index) => {
      const angle = (index / planets.length) * 2 * Math.PI;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      return {
        id: planet.id,
        type: 'planet',
        position: { x: x - 24, y: y - 24 }, // Center the 48px node
        data: {
          symbol: planet.symbol,
          label: planet.name,
          color: planet.color,
          showLabel: true,
        },
        draggable: false,
        selectable: true,
      };
    });

    // Create house nodes (12 houses)
    const houses = Array.from({ length: 12 }, (_, i) => i + 1);
    const houseRadius = 120;
    
    const houseNodes: Node[] = houses.map((house, index) => {
      const angle = (index / 12) * 2 * Math.PI - Math.PI / 2; // Start from top
      const x = centerX + Math.cos(angle) * houseRadius;
      const y = centerY + Math.sin(angle) * houseRadius;

      return {
        id: `house-${house}`,
        type: 'house',
        position: { x: x - 16, y: y - 16 }, // Center the 32px node
        data: {
          number: house,
          label: `House ${house}`,
          showLabel: false,
        },
        draggable: false,
        selectable: false,
      };
    });

    // Create aspect lines (simplified)
    const aspectEdges: Edge[] = [
      {
        id: 'sun-moon-aspect',
        source: 'sun',
        target: 'moon',
        style: { stroke: '#FFD700', strokeWidth: 2, strokeDasharray: '5,5' },
        animated: false,
        selectable: false,
      },
      {
        id: 'venus-mars-aspect',
        source: 'venus',
        target: 'mars',
        style: { stroke: '#FF69B4', strokeWidth: 2, strokeDasharray: '3,3' },
        animated: false,
        selectable: false,
      },
      {
        id: 'jupiter-saturn-aspect',
        source: 'jupiter',
        target: 'saturn',
        style: { stroke: '#8A2BE2', strokeWidth: 1, strokeDasharray: '2,2' },
        animated: false,
        selectable: false,
      },
    ];

    // Central chart node
    const centerNode: Node = {
      id: 'chart-center',
      position: { x: centerX - 40, y: centerY - 40 },
      data: { 
        symbol: '⚹', 
        label: 'Birth Chart',
        color: 'bg-night-light/50 border-constellation text-star-bright'
      },
      type: 'planet',
      draggable: false,
      selectable: false,
    };

    return {
      nodes: [centerNode, ...planetNodes, ...houseNodes],
      edges: aspectEdges,
    };
  }, [birthData]);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => generatePlanetaryData(), [generatePlanetaryData]);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className={cn("w-full h-96 rounded-lg overflow-hidden border border-constellation/30", className)}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        zoomOnScroll={false}
        zoomOnPinch={false}
        panOnDrag={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
        style={{ background: 'transparent' }}
      >
        <Background 
          gap={20} 
          size={1} 
          color="rgba(100, 150, 255, 0.1)"
        />
        <Controls 
          showZoom={true} 
          showFitView={true} 
          showInteractive={false}
          className="bg-night-light/80 border-constellation/30"
        />
      </ReactFlow>
      
      {!birthData && (
        <div className="absolute inset-0 flex items-center justify-center bg-night-light/20 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-4xl mb-2">⚹</div>
            <p className="text-muted-foreground text-sm">
              Complete the form to generate your birth chart
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthChartVisualization;