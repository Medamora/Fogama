import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react';

interface LocationSelectorProps {
  className?: string;
  onLocationChange?: (location: LocationData) => void;
}

export interface LocationData {
  date: string;
  time: string;
  city: string;
  country: string;
  timezone: string;
}

// Sample data - in a real app, this would come from an API
const countries = [
  { code: 'US', name: 'United States', timezone: 'America/New_York' },
  { code: 'UK', name: 'United Kingdom', timezone: 'Europe/London' },
  { code: 'CA', name: 'Canada', timezone: 'America/Toronto' },
  { code: 'AU', name: 'Australia', timezone: 'Australia/Sydney' },
  { code: 'DE', name: 'Germany', timezone: 'Europe/Berlin' },
  { code: 'FR', name: 'France', timezone: 'Europe/Paris' },
  { code: 'JP', name: 'Japan', timezone: 'Asia/Tokyo' },
  { code: 'IN', name: 'India', timezone: 'Asia/Kolkata' },
  { code: 'BR', name: 'Brazil', timezone: 'America/Sao_Paulo' },
  { code: 'MX', name: 'Mexico', timezone: 'America/Mexico_City' },
];

const cities = {
  US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
  UK: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Bristol', 'Sheffield', 'Leeds', 'Edinburgh', 'Cardiff'],
  CA: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener'],
  AU: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Sunshine Coast', 'Wollongong'],
  DE: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
  FR: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
  JP: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kawasaki', 'Kyoto', 'Saitama'],
  IN: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'],
  BR: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Goiânia'],
  MX: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Juárez', 'Torreón', 'Querétaro', 'San Luis Potosí'],
} as const;

const LocationSelector = ({ className, onLocationChange }: LocationSelectorProps) => {
  const [location, setLocation] = useState<LocationData>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    city: '',
    country: '',
    timezone: ''
  });

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      const updatedLocation = {
        ...location,
        country: country.name,
        timezone: country.timezone,
        city: '' // Reset city when country changes
      };
      setLocation(updatedLocation);
      onLocationChange?.(updatedLocation);
    }
  };

  const handleCityChange = (city: string) => {
    const updatedLocation = { ...location, city };
    setLocation(updatedLocation);
    onLocationChange?.(updatedLocation);
  };

  const handleDateChange = (date: string) => {
    const updatedLocation = { ...location, date };
    setLocation(updatedLocation);
    onLocationChange?.(updatedLocation);
  };

  const handleTimeChange = (time: string) => {
    const updatedLocation = { ...location, time };
    setLocation(updatedLocation);
    onLocationChange?.(updatedLocation);
  };

  const selectedCountryCode = countries.find(c => c.name === location.country)?.code;
  const availableCities = selectedCountryCode ? cities[selectedCountryCode as keyof typeof cities] || [] : [];

  return (
    <div className={cn("glass-card rounded-xl p-4 space-y-4", className)}>
      <h3 className="text-lg font-serif mb-4 text-center flex items-center justify-center gap-2">
        <MapPinIcon size={20} />
        Birth Details
      </h3>
      
      {/* Date and Time Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="birth-date" className="text-sm flex items-center gap-2">
            <CalendarIcon size={16} />
            Birth Date
          </Label>
          <Input
            id="birth-date"
            type="date"
            value={location.date}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="birth-time" className="text-sm flex items-center gap-2">
            <ClockIcon size={16} />
            Birth Time
          </Label>
          <Input
            id="birth-time"
            type="time"
            value={location.time}
            onChange={(e) => handleTimeChange(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Country Selection */}
      <div className="space-y-2">
        <Label htmlFor="country" className="text-sm">Country</Label>
        <Select onValueChange={handleCountryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select your birth country" />
          </SelectTrigger>
          <SelectContent className="bg-night-light/90 backdrop-blur-sm border-constellation/30">
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City Selection */}
      <div className="space-y-2">
        <Label htmlFor="city" className="text-sm">City</Label>
        <Select 
          onValueChange={handleCityChange} 
          disabled={!selectedCountryCode}
          value={location.city}
        >
          <SelectTrigger>
            <SelectValue placeholder={selectedCountryCode ? "Select your birth city" : "Select country first"} />
          </SelectTrigger>
          <SelectContent className="bg-night-light/90 backdrop-blur-sm border-constellation/30">
            {availableCities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary */}
      {location.country && location.city && (
        <div className="mt-4 p-3 bg-night-light/30 rounded-lg border border-constellation/20">
          <div className="text-sm text-muted-foreground">Birth Details:</div>
          <div className="text-sm">
            {location.date} at {location.time}
          </div>
          <div className="text-sm">
            {location.city}, {location.country}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Timezone: {location.timezone}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;