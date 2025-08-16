
import { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { getChineseZodiac, getZodiacSign } from '@/lib/astrologyUtils';
import { planets, houses, generateHoroscope } from '@/lib/celestialData';

const Profile = () => {
  const [birthYear, setBirthYear] = useState<number>(2000);
  const [birthMonth, setBirthMonth] = useState<number>(1);
  const [birthDay, setBirthDay] = useState<number>(1);
  const [birthTime, setBirthTime] = useState<string>("12:00");
  const [birthPlace, setBirthPlace] = useState<string>("");
  const isMobile = useIsMobile();
  
  const chineseZodiac = getChineseZodiac(birthYear);
  const zodiacSign = getZodiacSign(birthMonth, birthDay);
  
  // Generate background stars for aesthetic
  const generateBackgroundStars = () => {
    const stars = [];
    const starCount = 50;
    
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
    
    return stars;
  };
  
  const backgroundStars = generateBackgroundStars();
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fixed background stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {backgroundStars}
      </div>
      
      <NavBar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-serif mb-2">
              <span className="bg-gradient-to-r from-star-bright via-celestial-blue to-celestial-purple bg-clip-text text-transparent">
                Celestial Profile
              </span>
            </h1>
            <p className="text-muted-foreground">Discover your celestial identity and cosmic influences</p>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="readings">Readings</TabsTrigger>
              <TabsTrigger value="chart">Birth Chart</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Enter your birth details to customize your cosmic profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className={cn(
                    "grid gap-6",
                    isMobile ? "grid-cols-1" : "grid-cols-2"
                  )}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="birthYear">Birth Year</Label>
                        <Input 
                          id="birthYear" 
                          type="number" 
                          min={1900} 
                          max={2100} 
                          value={birthYear} 
                          onChange={(e) => setBirthYear(parseInt(e.target.value))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="birthMonth">Birth Month</Label>
                        <Select 
                          value={birthMonth.toString()} 
                          onValueChange={(value) => setBirthMonth(parseInt(value))}
                        >
                          <SelectTrigger id="birthMonth">
                            <SelectValue placeholder="Select month" />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map((month, index) => (
                              <SelectItem key={index} value={(index + 1).toString()}>
                                {month}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="birthDay">Birth Day</Label>
                        <Input 
                          id="birthDay" 
                          type="number" 
                          min={1} 
                          max={31} 
                          value={birthDay} 
                          onChange={(e) => setBirthDay(parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    
                    <div className="glass-card p-4 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl mb-2">{chineseZodiac.animal}</div>
                        <div className="text-xl mb-1">
                          {chineseZodiac.animal} ({chineseZodiac.element})
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {chineseZodiac.personality}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Save Profile</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="readings" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Your Personal Readings</CardTitle>
                  <CardDescription>Insights based on your cosmic profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {zodiacSign ? (
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/3 p-6 glass-card rounded-lg text-center">
                          <div className="text-4xl mb-2">{zodiacSign.symbol}</div>
                          <h3 className="text-xl font-semibold mb-1">{zodiacSign.name}</h3>
                          <div className="text-sm text-muted-foreground mb-2">
                            {zodiacSign.element} · {zodiacSign.ruling}
                          </div>
                          <div className="text-xs">
                            {zodiacSign.startDate} - {zodiacSign.endDate}
                          </div>
                        </div>
                        
                        <div className="w-full md:w-2/3 space-y-4">
                          <div className="p-4 glass-card rounded-lg">
                            <h3 className="font-medium mb-2">Daily Horoscope</h3>
                            <p>{generateHoroscope(zodiacSign.id, 'daily')}</p>
                          </div>
                          
                          <div className="p-4 glass-card rounded-lg">
                            <h3 className="font-medium mb-2">Monthly Outlook</h3>
                            <p>{generateHoroscope(zodiacSign.id, 'monthly')}</p>
                          </div>
                          
                          <div className="p-4 glass-card rounded-lg">
                            <h3 className="font-medium mb-2">Yearly Forecast</h3>
                            <p>{generateHoroscope(zodiacSign.id, 'yearly')}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 glass-card rounded-lg">
                        <h3 className="text-lg font-medium mb-3">Personality Traits</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                          {zodiacSign.traits.map((trait, index) => (
                            <div 
                              key={index} 
                              className="text-center p-2 glass-card rounded"
                            >
                              {trait}
                            </div>
                          ))}
                        </div>
                        <div className="mt-4">
                          <p className="text-sm">{zodiacSign.description}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        Complete your profile to unlock personalized readings
                      </p>
                      <Button>Update Profile</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="chart" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Birth Chart</CardTitle>
                  <CardDescription>Your complete astrological birth chart</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="birthTime">Birth Time (24h)</Label>
                        <Input 
                          id="birthTime" 
                          type="time" 
                          value={birthTime} 
                          onChange={(e) => setBirthTime(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="birthPlace">Birth Place</Label>
                        <Input 
                          id="birthPlace" 
                          type="text" 
                          placeholder="City, Country" 
                          value={birthPlace} 
                          onChange={(e) => setBirthPlace(e.target.value)}
                        />
                      </div>
                      
                      <Button className="w-full mt-2">Generate Chart</Button>
                    </div>
                    
                    <div className="aspect-square bg-black/20 rounded-lg flex items-center justify-center border border-white/10">
                      <div className="text-center">
                        <div className="text-5xl mb-2">⚝</div>
                        <p className="text-muted-foreground">
                          Enter your complete birth details to view your chart
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Planetary Positions</h3>
                      <div className="space-y-2">
                        {planets.slice(0, 6).map((planet) => (
                          <div key={planet.id} className="flex items-center p-2 glass-card rounded-lg">
                            <div className="text-2xl mr-3">{planet.symbol}</div>
                            <div>
                              <div className="font-medium">{planet.name}</div>
                              <div className="text-xs text-muted-foreground">{planet.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Houses</h3>
                      <div className="space-y-2">
                        {houses.slice(0, 6).map((house) => (
                          <div key={house.id} className="p-2 glass-card rounded-lg">
                            <div className="font-medium">{house.name} ({house.alias})</div>
                            <div className="text-xs text-muted-foreground">{house.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
