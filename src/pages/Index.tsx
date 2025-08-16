
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import StarChart from '@/components/StarChart';
import AstrologyOptions from '@/components/AstrologyOptions';
import ZodiacInfo from '@/components/ZodiacInfo';
import NumerologyInfo from '@/components/NumerologyInfo';
import NavBar from '@/components/NavBar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { getAstrologicalDate } from '@/lib/astrologyUtils';

const Index = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showNumerology, setShowNumerology] = useState(false);
  const isMobile = useIsMobile();
  const [backgroundStars, setBackgroundStars] = useState<JSX.Element[]>([]);
  const today = getAstrologicalDate();

  // Create random star background effect
  useEffect(() => {
    const stars = [];
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
      const size = Math.random() * 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = 3 + Math.random() * 4;
      const delay = Math.random() * 2;
      
      stars.push(
        <div 
          key={i}
          className="absolute rounded-full bg-white animate-star-twinkle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}%`,
            top: `${y}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            opacity: Math.random() * 0.7 + 0.3,
          }}
        />
      );
    }
    
    setBackgroundStars(stars);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fixed background stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {backgroundStars}
      </div>
      
      <NavBar />
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col items-center text-center mb-8 animate-fade-in">
          <div className="mb-2 inline-block py-1 px-3 rounded-full bg-night-light/50 text-sm">
            {today}
          </div>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            <span className="bg-gradient-to-r from-star-bright via-celestial-blue to-celestial-purple bg-clip-text text-transparent">
              Celestial Skyview
            </span>
          </h1>
          <p className="max-w-lg text-muted-foreground">
            Explore the night sky, track celestial movements, and discover how the stars influence your life's journey.
          </p>
        </div>

        <div className={cn(
          "grid gap-8",
          isMobile ? "grid-cols-1" : "grid-cols-3"
        )}>
          {/* Left sidebar for non-mobile */}
          {!isMobile && (
            <div className="col-span-1 space-y-6">
              <AstrologyOptions />
              <div className="flex justify-center gap-4 mb-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className={cn(
                    "rounded-full px-4",
                    !showNumerology && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => setShowNumerology(false)}
                >
                  Zodiac
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={cn(
                    "rounded-full px-4",
                    showNumerology && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => setShowNumerology(true)}
                >
                  Numerology
                </Button>
              </div>
              {showNumerology ? (
                <NumerologyInfo className="animate-fade-in" />
              ) : (
                <ZodiacInfo className="animate-fade-in" />
              )}
            </div>
          )}
          
          {/* Main star chart */}
          <div className={cn(
            isMobile ? "col-span-1" : "col-span-2",
            "flex flex-col gap-6"
          )}>
            <div className="glass-card rounded-xl p-6 pb-8 flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-4">
                <h2 className="text-xl font-serif">Night Sky View</h2>
                <div className="text-xs text-muted-foreground">Interactive Star Chart</div>
              </div>
              
              <div className="relative w-full aspect-square overflow-hidden">
                <StarChart className="w-full h-full animate-fade-in" />
                
                <div className="absolute bottom-4 left-4 text-xs rounded-full bg-night-deep/80 px-3 py-1 backdrop-blur-sm">
                  Northern Hemisphere View
                </div>
              </div>
            </div>
            
            {/* Mobile info section */}
            {isMobile && (
              <div className="space-y-6">
                <div className="flex justify-center gap-4 mb-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={cn(
                      "rounded-full px-4",
                      !showNumerology && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => setShowNumerology(false)}
                  >
                    Zodiac
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={cn(
                      "rounded-full px-4",
                      showNumerology && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => setShowNumerology(true)}
                  >
                    Numerology
                  </Button>
                </div>
                
                {showNumerology ? (
                  <NumerologyInfo className="animate-fade-in" />
                ) : (
                  <ZodiacInfo className="animate-fade-in" />
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile options toggle */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 z-10">
            <div className="container mx-auto px-4">
              <div className="relative">
                <Button
                  variant="outline"
                  className="absolute left-1/2 -translate-x-1/2 -top-10 rounded-t-xl rounded-b-none border-b-0 bg-night-light/90 backdrop-blur-sm flex items-center gap-2 px-6"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  Options {showOptions ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </Button>
                
                <div className={cn(
                  "transform transition-transform duration-300 ease-in-out",
                  showOptions ? "translate-y-0" : "translate-y-full"
                )}>
                  <AstrologyOptions className="rounded-b-none rounded-t-xl" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
