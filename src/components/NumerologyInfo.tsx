
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { calculateNumerologyProfile, getNumerologyMeaning } from '@/lib/enhancedNumerology';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface NumerologyInfoProps {
  className?: string;
}

const NumerologyInfo = ({ className }: NumerologyInfoProps) => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [results, setResults] = useState<{
    lifePathNumber?: number;
    destinyNumber?: number;
    personalityNumber?: number;
  }>({});

  const handleCalculate = () => {
    if (name && birthdate) {
      const profile = calculateNumerologyProfile(name, new Date(birthdate));
      setResults({
        lifePathNumber: profile.lifePathNumber,
        destinyNumber: profile.destinyNumber,
        personalityNumber: profile.personalityNumber
      });
    }
  };

  return (
    <div className={cn("glass-card rounded-xl p-4", className)}>
      <h3 className="text-lg font-serif mb-4 text-center">Numerology</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm block mb-2">Full Name</Label>
          <Input 
            id="name" 
            placeholder="Enter your full name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="birthdate" className="text-sm block mb-2">Birthdate</Label>
          <Input 
            id="birthdate" 
            type="date" 
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>
        
        <Button 
          className="w-full"
          onClick={handleCalculate}
          disabled={!name && !birthdate}
        >
          Calculate Numbers
        </Button>
      </div>
      
      {(results.lifePathNumber || results.destinyNumber || results.personalityNumber) && (
        <div className="mt-6 pt-4 border-t border-constellation/30">
          <ScrollArea className="h-80 w-full">
            <div className="space-y-6 pr-4">
              {results.lifePathNumber && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-star-bright">Life Path Number</h4>
                    <span className="text-2xl font-bold text-celestial-blue">{results.lifePathNumber}</span>
                  </div>
                  <div className="bg-night-light/30 rounded-lg p-4 border border-constellation/20">
                    <p className="text-sm leading-relaxed text-foreground">
                      {getNumerologyMeaning(results.lifePathNumber)}
                    </p>
                  </div>
                </div>
              )}
              
              {results.destinyNumber && (
                <>
                  <Separator className="bg-constellation/30" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-star-bright">Destiny Number</h4>
                      <span className="text-2xl font-bold text-celestial-purple">{results.destinyNumber}</span>
                    </div>
                    <div className="bg-night-light/30 rounded-lg p-4 border border-constellation/20">
                      <p className="text-sm leading-relaxed text-foreground">
                        {getNumerologyMeaning(results.destinyNumber)}
                      </p>
                    </div>
                  </div>
                </>
              )}
              
              {results.personalityNumber && (
                <>
                  <Separator className="bg-constellation/30" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-star-bright">Personality Number</h4>
                      <span className="text-2xl font-bold text-celestial-pink">{results.personalityNumber}</span>
                    </div>
                    <div className="bg-night-light/30 rounded-lg p-4 border border-constellation/20">
                      <p className="text-sm leading-relaxed text-foreground">
                        {getNumerologyMeaning(results.personalityNumber)}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default NumerologyInfo;
