import { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { getChineseZodiac, getZodiacSign } from '@/lib/astrologyUtils';
import { astrologyEngine, createBirthData } from '@/lib/astrologyEngine';
import { getElementColor } from '@/lib/astrologyUtils';
import { getHoroscope } from '@/lib/horoscopeAPI';
import BirthChartForm, { BirthChartData } from '@/components/BirthChartForm';
import BirthChartVisualization from '@/components/BirthChartVisualization';
import NumerologyInfo from '@/components/NumerologyInfo';
import { User, Star, Calculator, Sparkles, Calendar, MapPin, Clock } from 'lucide-react';

const Profile = () => {
  const [chartData, setChartData] = useState<BirthChartData | null>(null);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [horoscope, setHoroscope] = useState<any>(null);
  const isMobile = useIsMobile();
  
  // Generate background stars for aesthetic
  const generateBackgroundStars = () => {
    const stars = [];
    const starCount = 50;
    
    for (let i = 0; i < starCount; i++) {
      const size = Math.random() * 2 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = 3 + Math.random() * 4;
      const delay = Math.random() * 2;
      
      stars.push(
        <div 
          key={i}
          className="absolute rounded-full bg-star-bright animate-star-twinkle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}%`,
            top: `${y}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            opacity: Math.random() * 0.5 + 0.3,
          }}
        />
      );
    }
    
    return stars;
  };
  
  const backgroundStars = generateBackgroundStars();

  // Calculate astrological information when chart data changes
  const astrologyInfo = chartData ? {
    sunSign: getZodiacSign(parseInt(chartData.month), parseInt(chartData.day)),
    chineseZodiac: getChineseZodiac(parseInt(chartData.year)),
    numerology: null
  } : null;

  const handleGenerateChart = async (data: BirthChartData) => {
    setLoading(true);
    setChartData(data);
    
    // Fetch horoscope for the sun sign
    if (data) {
      const sunSign = getZodiacSign(parseInt(data.month), parseInt(data.day));
      if (sunSign) {
        try {
          const horoscopeData = await getHoroscope(sunSign.id.toLowerCase(), 'today');
          setHoroscope(horoscopeData);
        } catch (error) {
          console.error('Failed to fetch horoscope:', error);
        }
      }
    }
    setLoading(false);
  };

  const handleProfileSave = () => {
    // In a real app, this would save to a database
    console.log('Profile saved:', { profileData, chartData });
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fixed background stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {backgroundStars}
      </div>
      
      <NavBar />
      
      <main className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-serif mb-2">
              <span className="bg-gradient-to-r from-star-bright via-celestial-blue to-celestial-purple bg-clip-text text-transparent">
                Your Celestial Profile
              </span>
            </h1>
            <p className="text-muted-foreground">Discover your complete astrological and numerological identity</p>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User size={16} />
                Profile
              </TabsTrigger>
              <TabsTrigger value="chart" className="flex items-center gap-2">
                <Star size={16} />
                Birth Chart
              </TabsTrigger>
              <TabsTrigger value="numerology" className="flex items-center gap-2">
                <Calculator size={16} />
                Numerology
              </TabsTrigger>
              <TabsTrigger value="readings" className="flex items-center gap-2">
                <Sparkles size={16} />
                Readings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6 animate-fade-in">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card className="glass-card border-constellation/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User size={20} />
                        Personal Information
                      </CardTitle>
                      <CardDescription>Complete your profile for accurate cosmic insights</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Input 
                          id="bio" 
                          value={profileData.bio}
                          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                          placeholder="Tell us about yourself"
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleProfileSave} className="ml-auto">
                        Save Profile
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                {/* Astrological Summary */}
                <div className="space-y-4">
                  {astrologyInfo?.sunSign && (
                    <Card className="glass-card border-constellation/30">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Your Signs</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-night-light/30">
                          <span className="text-3xl" style={{ color: getElementColor(astrologyInfo.sunSign.element) }}>
                            {astrologyInfo.sunSign.symbol}
                          </span>
                          <div>
                            <div className="font-medium">{astrologyInfo.sunSign.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {astrologyInfo.sunSign.element} Sign
                            </div>
                          </div>
                        </div>
                        
                        {astrologyInfo.chineseZodiac && (
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-night-light/30">
                            <span className="text-2xl">🐉</span>
                            <div>
                              <div className="font-medium">{astrologyInfo.chineseZodiac.animal}</div>
                              <div className="text-xs text-muted-foreground">
                                Chinese Zodiac
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                  
                  {chartData && (
                    <Card className="glass-card border-constellation/30">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Calendar size={16} />
                          Birth Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-muted-foreground" />
                          {chartData.month}/{chartData.day}/{chartData.year}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-muted-foreground" />
                          {chartData.hour}:{chartData.minute}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-muted-foreground" />
                          {chartData.city}, {chartData.country}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="chart" className="space-y-6 animate-fade-in">
              <Card className="glass-card border-constellation/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star size={20} />
                    Birth Chart Generator
                  </CardTitle>
                  <CardDescription>Enter your birth details to generate your complete astrological chart</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={cn(
                    "grid gap-6",
                    isMobile ? "grid-cols-1" : "grid-cols-2"
                  )}>
                    <div>
                      <BirthChartForm 
                        onGenerateChart={handleGenerateChart}
                      />
                    </div>
                    
                    <div className="min-h-96">
                      {loading ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <div className="animate-spin text-2xl mb-2">⚹</div>
                            <p className="text-muted-foreground text-sm">Calculating your chart...</p>
                          </div>
                        </div>
                      ) : (
                        <BirthChartVisualization 
                          birthData={chartData} 
                          className="h-full"
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="numerology" className="space-y-6 animate-fade-in">
              <Card className="glass-card border-constellation/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator size={20} />
                    Numerology Analysis
                  </CardTitle>
                  <CardDescription>Discover the hidden meanings in your name and birth date</CardDescription>
                </CardHeader>
                <CardContent>
                  {profileData.name && chartData ? (
                    <NumerologyInfo />
                  ) : (
                    <div className="text-center py-12">
                      <Calculator size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">Complete Your Profile</h3>
                      <p className="text-muted-foreground mb-4">
                        Enter your name and birth details to unlock your numerology analysis
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Badge variant="outline">Name Required</Badge>
                        <Badge variant="outline">Birth Date Required</Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="readings" className="space-y-6 animate-fade-in">
              <Card className="glass-card border-constellation/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles size={20} />
                    Cosmic Readings
                  </CardTitle>
                  <CardDescription>Personalized insights and forecasts based on your astrological profile</CardDescription>
                </CardHeader>
                <CardContent>
                  {astrologyInfo?.sunSign ? (
                    <div className="space-y-6">
                      {/* Current Horoscope */}
                      {horoscope && (
                        <div className="grid gap-4 md:grid-cols-3">
                          <Card className="glass-card border-constellation/30">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base">Today</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                              {horoscope.daily || "The stars are aligning to bring new opportunities your way. Stay open to unexpected possibilities."}
                            </CardContent>
                          </Card>
                          
                          <Card className="glass-card border-constellation/30">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base">This Month</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                              {horoscope.monthly || "A time of growth and transformation awaits. Focus on personal development and meaningful connections."}
                            </CardContent>
                          </Card>
                          
                          <Card className="glass-card border-constellation/30">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base">This Year</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                              {horoscope.yearly || "This year brings significant changes and new beginnings. Trust your intuition and embrace the journey ahead."}
                            </CardContent>
                          </Card>
                        </div>
                      )}
                      
                      {/* Personality Analysis */}
                      <div className="grid gap-6 md:grid-cols-2">
                        <Card className="glass-card border-constellation/30">
                          <CardHeader>
                            <CardTitle className="text-lg">Personality Traits</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                              {astrologyInfo.sunSign.traits.map((trait, index) => (
                                <Badge key={index} variant="secondary" className="justify-center">
                                  {trait}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {astrologyInfo.sunSign.description}
                            </p>
                          </CardContent>
                        </Card>
                        
                        {astrologyInfo.chineseZodiac && (
                          <Card className="glass-card border-constellation/30">
                            <CardHeader>
                              <CardTitle className="text-lg">Chinese Zodiac Insights</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center gap-3 mb-4">
                                <span className="text-4xl">🐉</span>
                                <div>
                                  <div className="font-medium text-lg">{astrologyInfo.chineseZodiac.animal}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {astrologyInfo.chineseZodiac.element} Element
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {astrologyInfo.chineseZodiac.personality}
                              </p>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Sparkles size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">Generate Your Chart</h3>
                      <p className="text-muted-foreground mb-4">
                        Complete your birth chart to unlock personalized cosmic readings
                      </p>
                      <Badge variant="outline">Birth Chart Required</Badge>
                    </div>
                  )}
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