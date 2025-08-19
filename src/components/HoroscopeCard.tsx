
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getHoroscope } from '@/lib/horoscopeAPI';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface HoroscopeCardProps {
  sign: string;
  name: string;
  symbol: string;
  color: string;
  className?: string;
}

const HoroscopeCard = ({ sign, name, symbol, color, className }: HoroscopeCardProps) => {
  const [horoscopes, setHoroscopes] = useState({
    daily: '',
    monthly: '',
    yearly: '',
  });

  useEffect(() => {
    const loadHoroscopes = async () => {
      const daily = await getHoroscope(sign, 'daily');
      const monthly = await getHoroscope(sign, 'monthly');
      const yearly = await getHoroscope(sign, 'yearly');
      setHoroscopes({ daily, monthly, yearly });
    };
    loadHoroscopes();
  }, [sign]);

  const refreshHoroscope = async (tab: 'daily' | 'monthly' | 'yearly') => {
    const newHoroscope = await getHoroscope(sign, tab);
    setHoroscopes(prev => ({
      ...prev,
      [tab]: newHoroscope
    }));
  };

  return (
    <Card className={cn("glass-card overflow-hidden", className)}>
      <div className="p-4 flex items-center justify-between" style={{ backgroundColor: `${color}20` }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl" style={{ color }}>{symbol}</span>
          <h3 className="font-serif text-xl">{name}</h3>
        </div>
      </div>
      
      <Tabs defaultValue="daily" className="w-full">
        <div className="border-b border-constellation/30">
          <TabsList className="w-full grid grid-cols-3 bg-transparent p-0">
            {(['daily', 'monthly', 'yearly'] as const).map((tab) => (
              <TabsTrigger 
                key={tab}
                value={tab}
                className="py-2 px-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none capitalize"
                style={{ 
                  borderBottom: "2px solid transparent",
                  borderColor: "transparent"
                }}
                data-active-style={{ borderColor: color }}
              >
                <span className="relative">
                  {tab}
                  <div 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 scale-x-0 transition-transform data-[state=active]:scale-x-100"
                    style={{ backgroundColor: color }}
                    data-state={tab === 'daily' ? 'active' : 'inactive'}
                  />
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {(['daily', 'monthly', 'yearly'] as const).map((tab) => (
          <TabsContent key={tab} value={tab} className="p-5 relative">
            <div className="absolute top-2 right-2">
              <Button variant="ghost" size="icon" onClick={() => refreshHoroscope(tab)} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <div className="font-serif leading-relaxed text-sm italic pr-6">
              <p className="relative">
                <span 
                  className="absolute -top-2 -left-3 text-4xl opacity-20"
                  style={{ color }}
                >
                  "
                </span>
                {horoscopes[tab]}
                <span 
                  className="absolute -bottom-5 -right-1 text-4xl opacity-20"
                  style={{ color }}
                >
                  "
                </span>
              </p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};

export default HoroscopeCard;
