
import { useState } from 'react';
import NavBar from '@/components/NavBar';
import HoroscopeCard from '@/components/HoroscopeCard';
import { zodiacSigns } from '@/lib/celestialData';
import { zodiacSigns as signs } from '@/lib/celestialData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { getZodiacSign } from '@/lib/celestialData';
import { getChineseZodiac } from '@/lib/astrologyUtils';
import { useIsMobile } from '@/hooks/use-mobile';

const Horoscope = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Get zodiac sign based on birth date
  const month = date ? date.getMonth() + 1 : 0; // Adding 1 because getMonth() returns 0-11
  const day = date ? date.getDate() : 0;
  const year = date ? date.getFullYear() : 0;
  
  const userZodiacSign = date ? getZodiacSign(month, day) : null;
  const chineseZodiac = date ? getChineseZodiac(year) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-night-deep to-night">
      <NavBar />
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col items-center text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            <span className="bg-gradient-to-r from-star-bright via-celestial-pink to-celestial-purple bg-clip-text text-transparent">
              Your Horoscope
            </span>
          </h1>
          <p className="max-w-lg text-muted-foreground">
            Discover how the celestial movements influence your path. Daily, monthly, and yearly insights for all zodiac signs.
          </p>
        </div>
        
        {/* Birth date selector */}
        <div className="glass-card rounded-xl max-w-2xl mx-auto mb-12 p-6 animate-fade-in">
          <h2 className="text-xl font-serif mb-4 text-center">Find Your Sign</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="text-sm text-muted-foreground mb-2 block">
                Enter your birth date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-night-light" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {date && userZodiacSign && chineseZodiac && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-constellation/30">
              <div className="flex flex-col items-center text-center">
                <div className="text-sm text-muted-foreground mb-2">Your Western Zodiac Sign</div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-3xl" style={{ color: userZodiacSign.color }}>
                    {userZodiacSign.symbol}
                  </span>
                  <h3 className="text-2xl font-serif">{userZodiacSign.name}</h3>
                </div>
                <div className="text-sm text-muted-foreground">{userZodiacSign.element} Element • {userZodiacSign.startDate} - {userZodiacSign.endDate}</div>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="text-sm text-muted-foreground mb-2">Your Chinese Zodiac Sign</div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-2xl font-serif">{chineseZodiac.animal}</h3>
                </div>
                <div className="text-sm text-muted-foreground">{chineseZodiac.element} Element • Born in {chineseZodiac.years.includes(year) ? year : chineseZodiac.years[chineseZodiac.years.length - 1]}</div>
              </div>
            </div>
          )}
        </div>
        
        {/* All zodiac horoscopes */}
        <div className="mb-4">
          <h2 className="text-2xl font-serif mb-6 text-center">Daily Horoscopes</h2>
          
          {/* Zodiac sign selector (small screens) */}
          {isMobile && (
            <div className="mb-6 overflow-x-auto py-2">
              <div className="flex gap-2 min-w-max">
                {signs.map((sign) => (
                  <button
                    type="button"
                    key={sign.id}
                    onClick={() => setSelectedSign(sign.id === selectedSign ? null : sign.id)}
                    className={cn(
                      "flex flex-col items-center p-2 rounded-lg transition-all",
                      sign.id === selectedSign ? "bg-night-light/50 scale-110" : "hover:bg-night-light/20"
                    )}
                  >
                    <span className="text-2xl mb-1" style={{ color: sign.color }}>{sign.symbol}</span>
                    <span className="text-xs">{sign.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {signs
              .filter(sign => !selectedSign || sign.id === selectedSign)
              .map((sign) => (
                <HoroscopeCard
                  key={sign.id}
                  sign={sign.id}
                  name={sign.name}
                  symbol={sign.symbol}
                  color={sign.color}
                  className="animate-scale-in"
                />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Horoscope;
