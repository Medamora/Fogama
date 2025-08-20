import React, { useCallback, useMemo, useState } from 'react';
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
import { astrologyEngine, createBirthData, PLANETS, ZODIAC_SIGNS, HOUSES, ASPECTS } from '@/lib/astrologyEngine';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [selectedTab, setSelectedTab] = useState('chart');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simple coordinate lookup for major cities
  const getCoordinatesForCity = (city: string, country: string) => {
    const coordinates: Record<string, { lat: number; lng: number }> = {
      // US Cities
      'New York': { lat: 40.7128, lng: -74.0060 },
      'Los Angeles': { lat: 34.0522, lng: -118.2437 },
      'Chicago': { lat: 41.8781, lng: -87.6298 },
      'Houston': { lat: 29.7604, lng: -95.3698 },
      'Phoenix': { lat: 33.4484, lng: -112.0740 },
      
      // UK Cities
      'London': { lat: 51.5074, lng: -0.1278 },
      'Birmingham': { lat: 52.4862, lng: -1.8904 },
      'Manchester': { lat: 53.4808, lng: -2.2426 },
      'Glasgow': { lat: 55.8642, lng: -4.2518 },
      
      // Morocco Cities
      'Rabat': { lat: 34.0209, lng: -6.8416 },
      'Casablanca': { lat: 33.5731, lng: -7.5898 },
      'Marrakech': { lat: 31.6295, lng: -7.9811 },
      'Fez': { lat: 34.0181, lng: -5.0078 },
      
      // Default coordinates (London)
      'default': { lat: 51.5074, lng: -0.1278 }
    };
    
    return coordinates[city] || coordinates['default'];
  };

  // Calculate real astrological data
  const astroData = useMemo(() => {
    if (!birthData) return null;
    
    try {
      setLoading(true);
      setError(null);
      
      const coordinates = getCoordinatesForCity(birthData.city, birthData.country);
      
      const birthDataEngine = createBirthData(
        parseInt(birthData.year),
        parseInt(birthData.month),
        parseInt(birthData.day),
        parseInt(birthData.hour),
        parseInt(birthData.minute),
        coordinates.lat,
        coordinates.lng,
        birthData.timezone
      );
      
      const positions = astrologyEngine.calculatePlanetaryPositions(birthDataEngine);
      const aspects = astrologyEngine.calculateAspects(positions, true);
      const moonSign = astrologyEngine.calculateMoonSign(birthDataEngine);
      
      setLoading(false);
      return { positions, aspects, moonSign };
    } catch (err) {
      setError('Failed to calculate astrological data');
      setLoading(false);
      return null;
    }
  }, [birthData]);

  // Generate visual chart data
  const generateChartData = useCallback(() => {
    if (!astroData) return { nodes: [], edges: [] };

    const centerX = 300;
    const centerY = 300;
    const planetRadius = 200;
    const houseRadius = 120;

    // Create planet nodes with real positions
    const planetNodes: Node[] = astroData.positions.map((position, index) => {
      const planet = PLANETS.find(p => p.id === position.planet);
      if (!planet) return null;

      // Convert astrological degrees to visual position
      const angle = (position.longitude * Math.PI) / 180;
      const x = centerX + Math.cos(angle) * planetRadius;
      const y = centerY + Math.sin(angle) * planetRadius;

      return {
        id: position.planet,
        type: 'planet',
        position: { x: x - 24, y: y - 24 },
        data: {
          symbol: planet.symbol,
          label: `${planet.name} in ${position.sign}`,
          color: `border-2 text-white`,
          style: { borderColor: planet.color, backgroundColor: `${planet.color}20` },
          showLabel: true,
          retrograde: position.retrograde,
          degree: Math.round(position.degree),
          house: position.house,
        },
        draggable: false,
        selectable: true,
      };
    }).filter(Boolean) as Node[];

    // Create house nodes
    const houseNodes: Node[] = HOUSES.map((house, index) => {
      const angle = (index * 30 * Math.PI) / 180; // 30 degrees per house
      const x = centerX + Math.cos(angle) * houseRadius;
      const y = centerY + Math.sin(angle) * houseRadius;

      return {
        id: `house-${house.number}`,
        type: 'house',
        position: { x: x - 16, y: y - 16 },
        data: {
          number: house.number,
          label: house.alias,
          showLabel: false,
        },
        draggable: false,
        selectable: false,
      };
    });

    // Create aspect edges
    const aspectEdges: Edge[] = astroData.aspects.map((aspect, index) => {
      const aspectInfo = ASPECTS.find(a => a.name === aspect.aspect);
      return {
        id: `aspect-${index}`,
        source: aspect.planet1,
        target: aspect.planet2,
        style: { 
          stroke: aspectInfo?.color || '#FFFFFF', 
          strokeWidth: aspect.orb < 2 ? 3 : 2,
          strokeDasharray: aspectInfo?.strength === 'Minor' ? '3,3' : 'none'
        },
        animated: false,
        selectable: false,
        label: `${aspect.aspect} (${Math.round(aspect.orb)}°)`,
      };
    });

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
  }, [astroData]);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => generateChartData(), [generateChartData]);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  if (!birthData) {
    return (
      <div className={cn("w-full h-96 rounded-lg overflow-hidden border border-constellation/30 flex items-center justify-center", className)}>
        <div className="text-center">
          <div className="text-4xl mb-2">⚹</div>
          <p className="text-muted-foreground text-sm">
            Complete the form to generate your birth chart
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cn("w-full h-96 rounded-lg overflow-hidden border border-constellation/30 flex items-center justify-center", className)}>
        <div className="text-center">
          <div className="animate-spin text-2xl mb-2">⚹</div>
          <p className="text-muted-foreground text-sm">Calculating celestial positions...</p>
        </div>
      </div>
    );
  }

  if (error || !astroData) {
    return (
      <div className={cn("w-full h-96 rounded-lg overflow-hidden border border-constellation/30 flex items-center justify-center", className)}>
        <div className="text-center">
          <div className="text-4xl mb-2 text-destructive">⚠</div>
          <p className="text-destructive text-sm">{error || 'Failed to generate chart'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full rounded-lg overflow-hidden", className)}>
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chart">Birth Chart</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="aspects">Aspects</TabsTrigger>
          <TabsTrigger value="houses">Houses</TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="mt-4">
          <div className="h-96 border border-constellation/30 rounded-lg overflow-hidden">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              zoomOnScroll={true}
              zoomOnPinch={true}
              panOnDrag={true}
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
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Card className="glass-card border-constellation/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Birth Info</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-1">
                <div>Date: {birthData.month}/{birthData.day}/{birthData.year}</div>
                <div>Time: {birthData.hour.toString().padStart(2, '0')}:{birthData.minute.toString().padStart(2, '0')}</div>
                <div>Location: {birthData.city}, {birthData.country}</div>
                <div>Coordinates: {getCoordinatesForCity(birthData.city, birthData.country).lat.toFixed(2)}°, {getCoordinatesForCity(birthData.city, birthData.country).lng.toFixed(2)}°</div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-constellation/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Key Signs</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-1">
                <div>Sun: {astroData.positions.find(p => p.planet === 'sun')?.sign || 'Unknown'}</div>
                <div>Moon: {astroData.moonSign.sign} ({astroData.moonSign.degree.toFixed(1)}°)</div>
                <div>Ascendant: {astroData.positions.find(p => p.planet === 'sun')?.house || 'Unknown'} House</div>
                <div>Total Aspects: {astroData.aspects.length}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="positions" className="mt-4">
          <Card className="glass-card border-constellation/30">
            <CardHeader>
              <CardTitle>Planetary Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {astroData.positions.map((position) => {
                    const planet = PLANETS.find(p => p.id === position.planet);
                    const sign = ZODIAC_SIGNS.find(s => s.name === position.sign);
                    const house = HOUSES.find(h => h.number === position.house);
                    const strength = astrologyEngine.getPlanetaryStrength(position);
                    
                    return (
                      <div key={position.planet} className="flex items-center justify-between p-2 rounded bg-night-light/30">
                        <div className="flex items-center gap-2">
                          <span className="text-lg" style={{ color: planet?.color }}>{planet?.symbol}</span>
                          <div>
                            <div className="font-medium text-sm">{planet?.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {position.degree.toFixed(1)}° {position.sign} 
                              {position.retrograde && ' ℞'}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs mb-1">
                            House {position.house}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {strength.strength}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aspects" className="mt-4">
          <Card className="glass-card border-constellation/30">
            <CardHeader>
              <CardTitle>Planetary Aspects</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {astroData.aspects.map((aspect, index) => {
                    const aspectInfo = ASPECTS.find(a => a.name === aspect.aspect);
                    const planet1 = PLANETS.find(p => p.id === aspect.planet1);
                    const planet2 = PLANETS.find(p => p.id === aspect.planet2);
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-2 rounded bg-night-light/30">
                        <div className="flex items-center gap-2">
                          <span style={{ color: planet1?.color }}>{planet1?.symbol}</span>
                          <span style={{ color: aspectInfo?.color }}>{aspectInfo?.symbol}</span>
                          <span style={{ color: planet2?.color }}>{planet2?.symbol}</span>
                          <div className="ml-2">
                            <div className="font-medium text-sm">{aspect.aspect}</div>
                            <div className="text-xs text-muted-foreground">
                              {planet1?.name} - {planet2?.name}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant="outline" 
                            className="text-xs"
                            style={{ borderColor: aspectInfo?.color }}
                          >
                            {Math.round(aspect.orb)}° orb
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {aspectInfo?.strength}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="houses" className="mt-4">
          <Card className="glass-card border-constellation/30">
            <CardHeader>
              <CardTitle>House Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="grid grid-cols-1 gap-2">
                  {HOUSES.map((house) => {
                    const planetsInHouse = astroData.positions.filter(p => p.house === house.number);
                    
                    return (
                      <div key={house.number} className="p-2 rounded bg-night-light/30">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium text-sm">
                            House {house.number} - {house.alias}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {planetsInHouse.length} planet(s)
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {house.description}
                        </div>
                        {planetsInHouse.length > 0 && (
                          <div className="flex gap-1">
                            {planetsInHouse.map((position) => {
                              const planet = PLANETS.find(p => p.id === position.planet);
                              return (
                                <Badge key={position.planet} variant="secondary" className="text-xs">
                                  {planet?.symbol} {planet?.name}
                                </Badge>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BirthChartVisualization;