import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react';

interface BirthDetailsSelectorProps {
  className?: string;
  onBirthDetailsChange?: (details: BirthDetails) => void;
}

export interface BirthDetails {
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
  city: string;
  country: string;
  timezone: string;
}

const months = [
  { value: '01', name: 'January' },
  { value: '02', name: 'February' },
  { value: '03', name: 'March' },
  { value: '04', name: 'April' },
  { value: '05', name: 'May' },
  { value: '06', name: 'June' },
  { value: '07', name: 'July' },
  { value: '08', name: 'August' },
  { value: '09', name: 'September' },
  { value: '10', name: 'October' },
  { value: '11', name: 'November' },
  { value: '12', name: 'December' },
];

import { countries, cities, getCitiesByCountryCode } from '@/lib/locationData';

// Generate days 1-31
const days = Array.from({ length: 31 }, (_, i) => ({ 
  value: (i + 1).toString().padStart(2, '0'), 
  name: (i + 1).toString() 
}));

// Generate years from 1900 to current year + 10
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1900 + 11 }, (_, i) => ({
  value: (1900 + i).toString(),
  name: (1900 + i).toString()
})).reverse();

// Generate hours 0-23
const hours = Array.from({ length: 24 }, (_, i) => ({
  value: i.toString().padStart(2, '0'),
  name: `${i.toString().padStart(2, '0')}:00`
}));

// Generate minutes in 15-minute intervals
const minutes = ['00', '15', '30', '45'].map(min => ({
  value: min,
  name: min
}));

const BirthDetailsSelector = ({ className, onBirthDetailsChange }: BirthDetailsSelectorProps) => {
  const [birthDetails, setBirthDetails] = useState<BirthDetails>({
    day: '',
    month: '',
    year: '',
    hour: '',
    minute: '',
    city: '',
    country: '',
    timezone: ''
  });

  const handleChange = (field: keyof BirthDetails, value: string) => {
    let updatedDetails = { ...birthDetails, [field]: value };
    
    // If country changes, reset city and update timezone
    if (field === 'country') {
      const country = countries.find(c => c.name === value);
      updatedDetails = {
        ...updatedDetails,
        city: '',
        timezone: country?.timezone || ''
      };
    }
    
    setBirthDetails(updatedDetails);
    onBirthDetailsChange?.(updatedDetails);
  };

  const selectedCountryCode = countries.find(c => c.name === birthDetails.country)?.code;
  const availableCities = selectedCountryCode ? getCitiesByCountryCode(selectedCountryCode) : [];

  return (
    <div className={cn("glass-card rounded-xl p-4 space-y-4", className)}>
      <h3 className="text-lg font-serif mb-4 text-center flex items-center justify-center gap-2">
        <MapPinIcon size={20} />
        Find Your Sign
      </h3>

      {/* Date Selection */}
      <div className="space-y-2">
        <Label className="text-sm flex items-center gap-2">
          <CalendarIcon size={16} />
          Enter your birth date
        </Label>
        <div className="grid grid-cols-3 gap-2">
          <Select onValueChange={(value) => handleChange('day', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent className="bg-card/95 backdrop-blur-lg border-border/50 max-h-40 z-50">
              {days.map((day) => (
                <SelectItem key={day.value} value={day.value}>
                  {day.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => handleChange('month', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent className="bg-card/95 backdrop-blur-lg border-border/50 z-50">
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => handleChange('year', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="bg-card/95 backdrop-blur-lg border-border/50 max-h-40 z-50">
              {years.map((year) => (
                <SelectItem key={year.value} value={year.value}>
                  {year.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Time Selection */}
      <div className="space-y-2">
        <Label className="text-sm flex items-center gap-2">
          <ClockIcon size={16} />
          Birth Time
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <Select onValueChange={(value) => handleChange('hour', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent className="bg-card/95 backdrop-blur-lg border-border/50 max-h-40 z-50">
              {hours.map((hour) => (
                <SelectItem key={hour.value} value={hour.value}>
                  {hour.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => handleChange('minute', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Min" />
            </SelectTrigger>
            <SelectContent className="bg-card/95 backdrop-blur-lg border-border/50 z-50">
              {minutes.map((minute) => (
                <SelectItem key={minute.value} value={minute.value}>
                  {minute.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Country Selection */}
      <div className="space-y-2">
        <Label className="text-sm">Country</Label>
        <Select onValueChange={(value) => handleChange('country', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your birth country" />
          </SelectTrigger>
          <SelectContent className="bg-card/95 backdrop-blur-lg border-border/50 z-50">
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.name}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City Selection */}
      <div className="space-y-2">
        <Label className="text-sm">City</Label>
        <Select 
          onValueChange={(value) => handleChange('city', value)}
          disabled={!selectedCountryCode}
          value={birthDetails.city}
        >
          <SelectTrigger>
            <SelectValue placeholder={selectedCountryCode ? "Select your birth city" : "Select country first"} />
          </SelectTrigger>
          <SelectContent className="bg-card/95 backdrop-blur-lg border-border/50 z-50">
            {availableCities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary */}
      {birthDetails.day && birthDetails.month && birthDetails.year && birthDetails.country && birthDetails.city && (
        <div className="mt-4 p-3 bg-night-light/30 rounded-lg border border-constellation/20">
          <div className="text-sm text-muted-foreground">Birth Details:</div>
          <div className="text-sm">
            {months.find(m => m.value === birthDetails.month)?.name} {birthDetails.day}, {birthDetails.year}
            {birthDetails.hour && birthDetails.minute && ` at ${birthDetails.hour}:${birthDetails.minute}`}
          </div>
          <div className="text-sm">
            {birthDetails.city}, {birthDetails.country}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Timezone: {birthDetails.timezone}
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthDetailsSelector;