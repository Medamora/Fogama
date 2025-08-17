import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface PlanetaryMovementsProps {
  className?: string;
}

// Sample planetary movements data - in a real app this would come from an API
const planetaryEvents = [
  {
    id: 1,
    type: 'conjunction',
    planets: ['Mercury', 'Venus'],
    date: '2024-08-20',
    description: 'Mercury conjuncts Venus in Leo, bringing harmony between communication and love. This is an excellent time for creative expression, romantic conversations, and artistic endeavors. Your words carry extra charm and magnetism.',
    impact: 'high',
    symbol: '☿ ♀'
  },
  {
    id: 2,
    type: 'transit',
    planets: ['Mars'],
    date: '2024-08-18',
    description: 'Mars transits through Gemini, energizing communication and intellectual pursuits. Expect increased mental activity, rapid decision-making, and a desire to multitask. Channel this energy into productive learning and networking.',
    impact: 'medium',
    symbol: '♂'
  },
  {
    id: 3,
    type: 'retrograde',
    planets: ['Saturn'],
    date: '2024-08-15',
    description: 'Saturn stations retrograde in Pisces, calling for introspection regarding boundaries and spiritual discipline. This period favors reviewing long-term goals, refining spiritual practices, and restructuring emotional foundations.',
    impact: 'high',
    symbol: '♄ ℞'
  },
  {
    id: 4,
    type: 'opposition',
    planets: ['Sun', 'Pluto'],
    date: '2024-08-22',
    description: 'Sun opposes Pluto, intensifying themes of power, transformation, and deep psychological insights. This aspect brings hidden truths to light and encourages profound personal transformation through conscious awareness.',
    impact: 'high',
    symbol: '☉ ⚹ ♇'
  },
  {
    id: 5,
    type: 'trine',
    planets: ['Jupiter', 'Uranus'],
    date: '2024-08-25',
    description: 'Jupiter forms a harmonious trine with Uranus, bringing unexpected opportunities and innovative breakthroughs. This fortunate aspect supports technological advancement, humanitarian causes, and progressive thinking.',
    impact: 'medium',
    symbol: '♃ △ ♅'
  },
  {
    id: 6,
    type: 'new_moon',
    planets: ['Moon'],
    date: '2024-08-23',
    description: 'New Moon in Virgo emphasizes practical planning, health consciousness, and attention to detail. This lunation favors organizing your life, starting health routines, and focusing on service to others through practical means.',
    impact: 'medium',
    symbol: '🌑'
  }
];

const eventTypeColors = {
  conjunction: 'bg-celestial-blue/20 text-celestial-blue border-celestial-blue/30',
  transit: 'bg-constellation/20 text-constellation border-constellation/30',
  retrograde: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  opposition: 'bg-red-500/20 text-red-400 border-red-500/30',
  trine: 'bg-green-500/20 text-green-400 border-green-500/30',
  new_moon: 'bg-celestial-purple/20 text-celestial-purple border-celestial-purple/30'
};

const impactColors = {
  high: 'border-l-4 border-l-red-400',
  medium: 'border-l-4 border-l-yellow-400',
  low: 'border-l-4 border-l-green-400'
};

const PlanetaryMovements = ({ className }: PlanetaryMovementsProps) => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  return (
    <div className={cn("glass-card rounded-xl p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-serif">Current Planetary Movements</h3>
        <Badge variant="outline" className="text-xs">
          Live Updates
        </Badge>
      </div>

      <ScrollArea className="h-64 w-full">
        <div className="space-y-3 pr-4">
          {planetaryEvents.map((event) => (
            <div 
              key={event.id}
              className={cn(
                "p-3 rounded-lg bg-night-light/30 border border-constellation/20 cursor-pointer transition-all hover:bg-night-light/50",
                impactColors[event.impact],
                selectedEvent === event.id && "ring-2 ring-constellation/40"
              )}
              onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{event.symbol}</span>
                  <Badge className={cn("text-xs capitalize", eventTypeColors[event.type])}>
                    {event.type.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(event.date).toLocaleDateString()}
                </div>
              </div>
              
              <div className="text-sm font-medium mb-1">
                {event.planets.join(' & ')} {event.type === 'conjunction' ? 'Conjunction' : 
                 event.type === 'opposition' ? 'Opposition' :
                 event.type === 'trine' ? 'Trine' :
                 event.type === 'transit' ? 'Transit' :
                 event.type === 'retrograde' ? 'Retrograde' :
                 event.type === 'new_moon' ? 'New Moon' : ''}
              </div>
              
              {selectedEvent === event.id && (
                <div className="mt-2 pt-2 border-t border-constellation/20">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-4 pt-3 border-t border-constellation/20">
        <div className="text-xs text-muted-foreground text-center">
          Click on any event for detailed interpretation
        </div>
      </div>
    </div>
  );
};

export default PlanetaryMovements;