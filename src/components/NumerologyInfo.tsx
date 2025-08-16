
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { calculateLifePathNumber, calculateDestinyNumber, calculatePersonalityNumber } from '@/lib/numerologyUtils';

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
    if (birthdate) {
      const lifePathNumber = calculateLifePathNumber(birthdate);
      setResults(prev => ({ ...prev, lifePathNumber }));
    }
    
    if (name) {
      const destinyNumber = calculateDestinyNumber(name);
      const personalityNumber = calculatePersonalityNumber(name);
      setResults(prev => ({ ...prev, destinyNumber, personalityNumber }));
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
        <div className="mt-6 pt-4 border-t border-constellation/30 space-y-3">
          {results.lifePathNumber && (
            <div>
              <h4 className="text-sm font-semibold">Life Path Number: {results.lifePathNumber}</h4>
              <p className="text-xs text-muted-foreground">
                Your life's purpose and the path you'll take to fulfill that purpose.
              </p>
            </div>
          )}
          
          {results.destinyNumber && (
            <div>
              <h4 className="text-sm font-semibold">Destiny Number: {results.destinyNumber}</h4>
              <p className="text-xs text-muted-foreground">
                Your goals and the direction your life is meant to take.
              </p>
            </div>
          )}
          
          {results.personalityNumber && (
            <div>
              <h4 className="text-sm font-semibold">Personality Number: {results.personalityNumber}</h4>
              <p className="text-xs text-muted-foreground">
                How others perceive you and the impression you give.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NumerologyInfo;
