import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { BirthDetails } from './BirthDetailsSelector';
import { astrologyEngine, createBirthData, calculateBirthChart } from '@/lib/astrologyEngine';
import { calculateNumerologyProfile, getNumerologyMeaning } from '@/lib/enhancedNumerology';
import { getZodiacSign, getChineseZodiac } from '@/lib/astrologyUtils';
import { getHoroscope } from '@/lib/horoscopeAPI';
import BirthChartVisualization from './BirthChartVisualization';
import { Loader2, Star, Moon, Sun, Calendar } from 'lucide-react';

interface DetailedResultsProps {
  birthDetails: BirthDetails;
  options: {
    displayAspects: boolean;
    displayMinorAspects: boolean;
    displayLilithAspects: boolean;
    displayAsteroidAspects: boolean;
    showNumerology: boolean;
    showSunSign: boolean;
    showMoonSign: boolean;
    showChineseZodiac: boolean;
    showDailyHoroscope: boolean;
    showMonthlyHoroscope: boolean;
    showYearlyHoroscope: boolean;
  };
  className?: string;
}

const DetailedResults = ({ birthDetails, options, className }: DetailedResultsProps) => {
  const [astroData, setAstroData] = useState<any>(null);
  const [numerologyData, setNumerologyData] = useState<any>(null);
  const [horoscopeData, setHoroscopeData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isFormComplete()) {
      calculateResults();
    }
  }, [birthDetails, options]);

  const isFormComplete = () => {
    return birthDetails.day && birthDetails.month && birthDetails.year && 
           birthDetails.country && birthDetails.city;
  };

  const calculateResults = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Parse birth data
      const birthDate = new Date(
        parseInt(birthDetails.year),
        parseInt(birthDetails.month) - 1,
        parseInt(birthDetails.day),
        parseInt(birthDetails.hour || '12'),
        parseInt(birthDetails.minute || '0')
      );

      // Get coordinates for the city (simplified - in real app, use geocoding API)
      const coordinates = getCoordinatesForCity(birthDetails.city, birthDetails.country);
      
      // Calculate astrology data
      if (coordinates) {
        const birthData = createBirthData(
          parseInt(birthDetails.year),
          parseInt(birthDetails.month),
          parseInt(birthDetails.day),
          parseInt(birthDetails.hour || '12'),
          parseInt(birthDetails.minute || '0'),
          coordinates.latitude,
          coordinates.longitude,
          birthDetails.timezone || 'UTC'
        );

        const astroResults = calculateBirthChart(birthData);
        setAstroData(astroResults);
      }

      // Calculate numerology data
      if (options.showNumerology) {
        const fullName = "User Name"; // In real app, get from form
        const numerologyResults = calculateNumerologyProfile(fullName, birthDate);
        setNumerologyData(numerologyResults);
      }

      // Fetch horoscope data
      if (options.showDailyHoroscope || options.showMonthlyHoroscope || options.showYearlyHoroscope) {
        const sunSign = getZodiacSign(parseInt(birthDetails.month), parseInt(birthDetails.day));
        const horoscopeResults = await Promise.all([
          options.showDailyHoroscope ? getHoroscope(sunSign.name.toLowerCase(), 'daily') : null,
          options.showMonthlyHoroscope ? getHoroscope(sunSign.name.toLowerCase(), 'monthly') : null,
          options.showYearlyHoroscope ? getHoroscope(sunSign.name.toLowerCase(), 'yearly') : null,
        ]);
        
        setHoroscopeData({
          daily: horoscopeResults[0] ? { description: horoscopeResults[0] } : null,
          monthly: horoscopeResults[1] ? { description: horoscopeResults[1] } : null,
          yearly: horoscopeResults[2] ? { description: horoscopeResults[2] } : null
        });
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while calculating results');
    } finally {
      setLoading(false);
    }
  };

  const getCoordinatesForCity = (city: string, country: string) => {
    // Simplified coordinate lookup - in real app, use proper geocoding
    const coordinates: Record<string, { latitude: number; longitude: number }> = {
      'New York': { latitude: 40.7128, longitude: -74.0060 },
      'London': { latitude: 51.5074, longitude: -0.1278 },
      'Paris': { latitude: 48.8566, longitude: 2.3522 },
      'Tokyo': { latitude: 35.6762, longitude: 139.6503 },
      'Sydney': { latitude: -33.8688, longitude: 151.2093 },
      'Los Angeles': { latitude: 34.0522, longitude: -118.2437 },
      'Chicago': { latitude: 41.8781, longitude: -87.6298 },
      'Berlin': { latitude: 52.5200, longitude: 13.4050 },
      'Rome': { latitude: 41.9028, longitude: 12.4964 },
      'Madrid': { latitude: 40.4168, longitude: -3.7038 }
    };
    
    return coordinates[city] || { latitude: 0, longitude: 0 };
  };

  if (!isFormComplete()) {
    return (
      <Card className={cn("glass-card", className)}>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Star className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Enter Your Birth Details</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Complete your birth information to generate your personalized astrological chart, 
            numerology profile, and readings.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className={cn("glass-card", className)}>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p className="text-sm text-muted-foreground">Calculating your cosmic profile...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn("glass-card", className)}>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-destructive mb-4">⚠️</div>
          <h3 className="text-lg font-medium mb-2">Calculation Error</h3>
          <p className="text-sm text-muted-foreground text-center">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const birthDate = new Date(
    parseInt(birthDetails.year),
    parseInt(birthDetails.month) - 1,
    parseInt(birthDetails.day)
  );

  const sunSign = getZodiacSign(parseInt(birthDetails.month), parseInt(birthDetails.day));
  const chineseZodiac = getChineseZodiac(parseInt(birthDetails.year));

  return (
    <div className={cn("space-y-6", className)}>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Your Detailed Results
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Born {birthDetails.day}/{birthDetails.month}/{birthDetails.year} in {birthDetails.city}, {birthDetails.country}
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="chart" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="chart">Birth Chart</TabsTrigger>
          <TabsTrigger value="signs">Signs</TabsTrigger>
          <TabsTrigger value="numerology" disabled={!options.showNumerology}>Numerology</TabsTrigger>
          <TabsTrigger value="horoscope" disabled={!horoscopeData}>Horoscope</TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="space-y-4">
          <BirthChartVisualization 
            birthData={{
              day: birthDetails.day,
              month: birthDetails.month,
              year: birthDetails.year,
              hour: birthDetails.hour || '12',
              minute: birthDetails.minute || '0',
              city: birthDetails.city,
              country: birthDetails.country,
              timezone: birthDetails.timezone
            }}
          />
          
          {astroData && options.displayAspects && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Planetary Aspects</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {astroData.aspects?.map((aspect: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-2 rounded bg-background/50">
                        <span className="text-sm">
                          {aspect.planet1} {aspect.aspect} {aspect.planet2}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {aspect.orb.toFixed(1)}°
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="signs" className="space-y-4">
          {options.showSunSign && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-yellow-500" />
                  Sun Sign: {sunSign.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{sunSign.symbol}</span>
                    <Badge variant="secondary">{sunSign.element}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{sunSign.description}</p>
                  <div className="text-sm">
                    <strong>Key Traits:</strong> {sunSign.traits.join(', ')}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {options.showMoonSign && astroData?.moonSign && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-blue-400" />
                  Moon Sign: {astroData.moonSign.sign}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your Moon is at {astroData.moonSign.degree.toFixed(1)}° in {astroData.moonSign.sign}
                </p>
              </CardContent>
            </Card>
          )}

          {options.showChineseZodiac && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-red-500" />
                  Chinese Zodiac: {chineseZodiac.animal}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{chineseZodiac.element}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{chineseZodiac.personality}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="numerology" className="space-y-4">
          {numerologyData && (
            <div className="grid gap-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Life Path Number: {numerologyData.lifePathNumber}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {getNumerologyMeaning(numerologyData.lifePathNumber, 'lifePath')}
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Destiny Number: {numerologyData.destinyNumber}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {getNumerologyMeaning(numerologyData.destinyNumber, 'destiny')}
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Personality Number: {numerologyData.personalityNumber}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {getNumerologyMeaning(numerologyData.personalityNumber, 'personality')}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="horoscope" className="space-y-4">
          {horoscopeData && (
            <div className="space-y-4">
              {options.showDailyHoroscope && horoscopeData.daily && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Daily Horoscope</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{horoscopeData.daily.description}</p>
                    {horoscopeData.daily.compatibility && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        Compatible with: {horoscopeData.daily.compatibility}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {options.showMonthlyHoroscope && horoscopeData.monthly && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Monthly Horoscope</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{horoscopeData.monthly.description}</p>
                  </CardContent>
                </Card>
              )}

              {options.showYearlyHoroscope && horoscopeData.yearly && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Yearly Horoscope</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{horoscopeData.yearly.description}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DetailedResults;