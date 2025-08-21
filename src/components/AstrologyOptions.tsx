
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';

interface AstrologyOptionProps {
  className?: string;
  onOptionsChange?: (options: any) => void;
}

const AstrologyOptions = ({ className, onOptionsChange }: AstrologyOptionProps) => {
  const isMobile = useIsMobile();
  const [options, setOptions] = useState({
    // Aspects
    displayAspects: true,
    displayMinorAspects: false,
    displayLilithAspects: false,
    displayAsteroidAspects: false,
    
    // Bodies
    displayLilith: false,
    displayNorthNode: false,
    displayAsteroids: false,
    displayHypotheticalPlanets: false,
    
    // Calculation types
    useTrueLilith: true,
    useTrueNorthNode: true,
    
    // View options
    showNumerology: false,
    showSunSign: true,
    showMoonSign: true,
    showChineseZodiac: false,
    
    // Horoscope types
    showDailyHoroscope: true,
    showMonthlyHoroscope: false,
    showYearlyHoroscope: false
  });

  const handleToggle = (option: keyof typeof options) => {
    const newOptions = { ...options, [option]: !options[option] };
    setOptions(newOptions);
    onOptionsChange?.(newOptions);
  };

  return (
    <div className={cn("glass-card rounded-xl p-4", className)}>
      <h3 className="text-lg font-serif mb-4 text-center">Display Options</h3>
      
      <Tabs defaultValue="aspects" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="aspects">Aspects</TabsTrigger>
          <TabsTrigger value="bodies">Celestial Bodies</TabsTrigger>
          <TabsTrigger value="info">Info & Readings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="aspects" className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="display-aspects" className="text-sm">
                AS and MC Aspects
              </Label>
              <Switch 
                id="display-aspects" 
                checked={options.displayAspects}
                onCheckedChange={() => handleToggle('displayAspects')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="display-minor-aspects" className="text-sm">
                Minor Aspects
              </Label>
              <Switch 
                id="display-minor-aspects" 
                checked={options.displayMinorAspects}
                onCheckedChange={() => handleToggle('displayMinorAspects')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="display-lilith-aspects" className="text-sm">
                Lilith and North Node Aspects
              </Label>
              <Switch 
                id="display-lilith-aspects" 
                checked={options.displayLilithAspects}
                onCheckedChange={() => handleToggle('displayLilithAspects')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="display-asteroid-aspects" className="text-sm">
                Asteroid Aspects
              </Label>
              <Switch 
                id="display-asteroid-aspects" 
                checked={options.displayAsteroidAspects}
                onCheckedChange={() => handleToggle('displayAsteroidAspects')} 
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="bodies" className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="display-lilith" className="text-sm">
                Display Lilith
              </Label>
              <Switch 
                id="display-lilith" 
                checked={options.displayLilith}
                onCheckedChange={() => handleToggle('displayLilith')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="display-north-node" className="text-sm">
                Display North Node
              </Label>
              <Switch 
                id="display-north-node" 
                checked={options.displayNorthNode}
                onCheckedChange={() => handleToggle('displayNorthNode')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="display-asteroids" className="text-sm">
                Display Asteroids
              </Label>
              <Switch 
                id="display-asteroids" 
                checked={options.displayAsteroids}
                onCheckedChange={() => handleToggle('displayAsteroids')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="display-hypothetical" className="text-sm">
                Display Hypothetical Planets
              </Label>
              <Switch 
                id="display-hypothetical" 
                checked={options.displayHypotheticalPlanets}
                onCheckedChange={() => handleToggle('displayHypotheticalPlanets')} 
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-constellation/30">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="true-lilith" className="text-xs block mb-2">Lilith Type</Label>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant={options.useTrueLilith ? "default" : "outline"} 
                    className="text-xs py-1 h-auto"
                    onClick={() => {
                      const newOptions = { ...options, useTrueLilith: true };
                      setOptions(newOptions);
                      onOptionsChange?.(newOptions);
                    }}
                  >
                    True
                  </Button>
                  <Button 
                    size="sm" 
                    variant={!options.useTrueLilith ? "default" : "outline"} 
                    className="text-xs py-1 h-auto"
                    onClick={() => {
                      const newOptions = { ...options, useTrueLilith: false };
                      setOptions(newOptions);
                      onOptionsChange?.(newOptions);
                    }}
                  >
                    Mean
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="true-node" className="text-xs block mb-2">North Node Type</Label>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant={options.useTrueNorthNode ? "default" : "outline"} 
                    className="text-xs py-1 h-auto"
                    onClick={() => {
                      const newOptions = { ...options, useTrueNorthNode: true };
                      setOptions(newOptions);
                      onOptionsChange?.(newOptions);
                    }}
                  >
                    True
                  </Button>
                  <Button 
                    size="sm" 
                    variant={!options.useTrueNorthNode ? "default" : "outline"} 
                    className="text-xs py-1 h-auto"
                    onClick={() => {
                      const newOptions = { ...options, useTrueNorthNode: false };
                      setOptions(newOptions);
                      onOptionsChange?.(newOptions);
                    }}
                  >
                    Mean
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="info" className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-numerology" className="text-sm">
                Numerology
              </Label>
              <Switch 
                id="show-numerology" 
                checked={options.showNumerology}
                onCheckedChange={() => handleToggle('showNumerology')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-sun-sign" className="text-sm">
                Sun Sign
              </Label>
              <Switch 
                id="show-sun-sign" 
                checked={options.showSunSign}
                onCheckedChange={() => handleToggle('showSunSign')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-moon-sign" className="text-sm">
                Moon Sign
              </Label>
              <Switch 
                id="show-moon-sign" 
                checked={options.showMoonSign}
                onCheckedChange={() => handleToggle('showMoonSign')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-chinese-zodiac" className="text-sm">
                Chinese Zodiac Sign
              </Label>
              <Switch 
                id="show-chinese-zodiac" 
                checked={options.showChineseZodiac}
                onCheckedChange={() => handleToggle('showChineseZodiac')} 
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-constellation/30">
            <Label className="text-xs mb-3 block">Horoscope Readings</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-daily-horoscope" className="text-sm">
                  Daily Horoscope
                </Label>
                <Switch 
                  id="show-daily-horoscope" 
                  checked={options.showDailyHoroscope}
                  onCheckedChange={() => handleToggle('showDailyHoroscope')} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="show-monthly-horoscope" className="text-sm">
                  Monthly Horoscope
                </Label>
                <Switch 
                  id="show-monthly-horoscope" 
                  checked={options.showMonthlyHoroscope}
                  onCheckedChange={() => handleToggle('showMonthlyHoroscope')} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="show-yearly-horoscope" className="text-sm">
                  Yearly Horoscope
                </Label>
                <Switch 
                  id="show-yearly-horoscope" 
                  checked={options.showYearlyHoroscope}
                  onCheckedChange={() => handleToggle('showYearlyHoroscope')} 
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 pt-4 border-t border-constellation/30">
        <Button className="w-full">
          Apply Settings
        </Button>
      </div>
    </div>
  );
};

export default AstrologyOptions;
