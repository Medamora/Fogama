
import { useState, useEffect } from 'react';
import { zodiacSigns } from '@/lib/celestialData';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ZodiacInfoProps {
  className?: string;
  initialSign?: string;
}

const ZodiacInfo = ({ className, initialSign }: ZodiacInfoProps) => {
  const [selectedSign, setSelectedSign] = useState(initialSign || "aries");
  const [signData, setSignData] = useState(zodiacSigns[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Find the data for the selected sign
    const data = zodiacSigns.find(sign => sign.id === selectedSign) || zodiacSigns[0];
    
    // Trigger animation
    setIsAnimating(true);
    setSignData(data);
    
    // Reset animation state after animation completes
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [selectedSign]);

  return (
    <div className={cn("glass-card rounded-xl overflow-hidden", className)}>
      {/* Zodiac sign selector */}
      <div className="flex overflow-x-auto py-3 px-2 gap-1 border-b border-constellation/30 hide-scrollbar">
        {zodiacSigns.map((sign) => (
          <button
            key={sign.id}
            onClick={() => setSelectedSign(sign.id)}
            className={cn(
              "zodiac-icon flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all",
              selectedSign === sign.id 
                ? "bg-gradient-to-br from-celestial-blue/20 to-constellation/10 border border-constellation/40"
                : "hover:bg-night-light/30"
            )}
            style={{ '--color': sign.color } as React.CSSProperties}
          >
            <span className="text-xl">{sign.symbol}</span>
          </button>
        ))}
      </div>
      
      {/* Sign information */}
      <div className="p-5">
        <div className={cn("transition-all duration-500", isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0")}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-2xl font-serif text-star-bright">{signData.name}</h3>
            <span 
              className="text-3xl" 
              style={{ color: signData.color }}
            >
              {signData.symbol}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
            <div>
              <span className="text-muted-foreground">Dates:</span>
              <div className="text-star-bright">{signData.startDate} - {signData.endDate}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Element:</span>
              <div className="text-star-bright">{signData.element}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Ruling Planet:</span>
              <div className="text-star-bright">{signData.ruling}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Quality:</span>
              <div className="text-star-bright">
                {signData.id === "aries" || signData.id === "cancer" || signData.id === "libra" || signData.id === "capricorn" 
                  ? "Cardinal" 
                  : signData.id === "taurus" || signData.id === "leo" || signData.id === "scorpio" || signData.id === "aquarius" 
                  ? "Fixed" 
                  : "Mutable"}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="text-muted-foreground text-sm mb-2">Detailed Description:</div>
            <ScrollArea className="h-32 w-full">
              <p className="text-sm leading-relaxed pr-4">{signData.description}</p>
            </ScrollArea>
          </div>
          
          <div>
            <div className="text-muted-foreground text-sm mb-2">Key Traits:</div>
            <div className="flex flex-wrap gap-2">
              {signData.traits.map((trait, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 rounded-full text-xs bg-night-light/50 border border-constellation/20"
                  style={{ borderColor: `${signData.color}30` }}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZodiacInfo;
