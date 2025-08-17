import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react';

interface BirthChartFormProps {
  className?: string;
  onGenerateChart?: (details: BirthChartData) => void;
}

export interface BirthChartData {
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
  { code: 'MA', name: 'Morocco', timezone: 'Africa/Casablanca' },
  { code: 'EG', name: 'Egypt', timezone: 'Africa/Cairo' },
  { code: 'ZA', name: 'South Africa', timezone: 'Africa/Johannesburg' },
  { code: 'RU', name: 'Russia', timezone: 'Europe/Moscow' },
  { code: 'CN', name: 'China', timezone: 'Asia/Shanghai' },
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
  MA: ['Rabat', 'Casablanca', 'Marrakech', 'Fez', 'Tangier', 'Agadir', 'Meknes', 'Oujda', 'Kenitra', 'Tetouan'],
  EG: ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said', 'Suez', 'Luxor', 'Mansoura', 'El Mahalla El Kubra', 'Tanta'],
  ZA: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein', 'East London', 'Nelspruit', 'Kimberley', 'Polokwane'],
  RU: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Nizhny Novgorod', 'Kazan', 'Chelyabinsk', 'Omsk', 'Samara', 'Rostov-on-Don'],
  CN: ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'Tianjin', 'Wuhan', 'Dongguan', 'Chengdu', 'Nanjing', 'Xi\'an'],
} as const;

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

const BirthChartForm = ({ className, onGenerateChart }: BirthChartFormProps) => {
  const [birthData, setBirthData] = useState<BirthChartData>({
    day: '',
    month: '',
    year: '',
    hour: '',
    minute: '',
    city: '',
    country: '',
    timezone: ''
  });

  const handleChange = (field: keyof BirthChartData, value: string) => {
    let updatedData = { ...birthData, [field]: value };
    
    // If country changes, reset city and update timezone
    if (field === 'country') {
      const country = countries.find(c => c.name === value);
      updatedData = {
        ...updatedData,
        city: '',
        timezone: country?.timezone || ''
      };
    }
    
    setBirthData(updatedData);
  };

  const handleGenerateChart = () => {
    if (isFormValid()) {
      onGenerateChart?.(birthData);
    }
  };

  const isFormValid = () => {
    return birthData.day && birthData.month && birthData.year && 
           birthData.hour && birthData.minute && birthData.city && birthData.country;
  };

  const selectedCountryCode = countries.find(c => c.name === birthData.country)?.code;
  const availableCities = selectedCountryCode ? cities[selectedCountryCode as keyof typeof cities] || [] : [];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Date Selection */}
      <div className="space-y-2">
        <Label className="text-sm flex items-center gap-2">
          <CalendarIcon size={16} />
          Birth Date
        </Label>
        <div className="grid grid-cols-3 gap-3">
          <Select onValueChange={(value) => handleChange('day', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent className="bg-night-light/90 backdrop-blur-sm border-constellation/30 max-h-40">
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
            <SelectContent className="bg-night-light/90 backdrop-blur-sm border-constellation/30">
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
            <SelectContent className="bg-night-light/90 backdrop-blur-sm border-constellation/30 max-h-40">
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
          Birth Time (24h format)
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <Select onValueChange={(value) => handleChange('hour', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent className="bg-night-light/90 backdrop-blur-sm border-constellation/30 max-h-40">
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
            <SelectContent className="bg-night-light/90 backdrop-blur-sm border-constellation/30">
              {minutes.map((minute) => (
                <SelectItem key={minute.value} value={minute.value}>
                  {minute.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Location Selection */}
      <div className="space-y-4">
        <Label className="text-sm flex items-center gap-2">
          <MapPinIcon size={16} />
          Birth Place
        </Label>
        
        <div className="space-y-3">
          <Select onValueChange={(value) => handleChange('country', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your birth country" />
            </SelectTrigger>
            <SelectContent className="bg-night-light/90 backdrop-blur-sm border-constellation/30">
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            onValueChange={(value) => handleChange('city', value)}
            disabled={!selectedCountryCode}
            value={birthData.city}
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
      </div>

      {/* Generate Button */}
      <Button 
        className="w-full" 
        onClick={handleGenerateChart}
        disabled={!isFormValid()}
      >
        Generate Chart
      </Button>

      {/* Summary */}
      {isFormValid() && (
        <div className="mt-4 p-4 bg-night-light/30 rounded-lg border border-constellation/20">
          <div className="text-sm text-muted-foreground mb-1">Birth Details:</div>
          <div className="text-sm font-medium">
            {months.find(m => m.value === birthData.month)?.name} {birthData.day}, {birthData.year}
          </div>
          <div className="text-sm">
            Time: {birthData.hour}:{birthData.minute}
          </div>
          <div className="text-sm">
            Location: {birthData.city}, {birthData.country}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Timezone: {birthData.timezone}
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthChartForm;