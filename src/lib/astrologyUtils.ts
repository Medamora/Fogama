
// Utility functions for astrological calculations and data

// Calculate the Chinese zodiac sign based on birth year
export const getChineseZodiac = (year: number) => {
  const zodiacSigns = [
    { animal: "Rat", years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020], element: "Water", personality: "Quick-witted, resourceful, and adaptable" },
    { animal: "Ox", years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021], element: "Earth", personality: "Diligent, dependable, and strong" },
    { animal: "Tiger", years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022], element: "Wood", personality: "Brave, competitive, and unpredictable" },
    { animal: "Rabbit", years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023], element: "Wood", personality: "Quiet, elegant, and kind" },
    { animal: "Dragon", years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024], element: "Earth", personality: "Confident, ambitious, and enthusiastic" },
    { animal: "Snake", years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025], element: "Fire", personality: "Enigmatic, intuitive, and wise" },
    { animal: "Horse", years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026], element: "Fire", personality: "Energetic, independent, and free-spirited" },
    { animal: "Goat", years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027], element: "Earth", personality: "Gentle, compassionate, and creative" },
    { animal: "Monkey", years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028], element: "Metal", personality: "Clever, charismatic, and mischievous" },
    { animal: "Rooster", years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029], element: "Metal", personality: "Observant, hardworking, and courageous" },
    { animal: "Dog", years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030], element: "Earth", personality: "Loyal, honest, and protective" },
    { animal: "Pig", years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031], element: "Water", personality: "Compassionate, generous, and diligent" }
  ];

  // Find the zodiac sign that includes the birth year
  const sign = zodiacSigns.find(sign => sign.years.includes(year));
  
  if (sign) {
    return sign;
  }
  
  // If the exact year isn't in our list, calculate based on the 12-year cycle
  const remainder = year % 12;
  const index = (remainder === 0) ? 11 : remainder - 1;
  return zodiacSigns[index];
};

// Calculate Western zodiac sign based on birth month and day
export const getZodiacSign = (month: number, day: number) => {
  const signs = [
    { id: "aries", name: "Aries", symbol: "♈", element: "Fire", ruling: "Mars", startDate: "March 21", endDate: "April 19", traits: ["Bold", "Independent", "Courageous", "Impulsive", "Passionate"], description: "Aries is the first sign of the zodiac, and that's exactly how they like to be regarded: first. Aries are the leaders of the pack, first in line to get things going. They are passionate, energetic, and confident." },
    { id: "taurus", name: "Taurus", symbol: "♉", element: "Earth", ruling: "Venus", startDate: "April 20", endDate: "May 20", traits: ["Patient", "Reliable", "Stubborn", "Sensual", "Practical"], description: "Taurus is known for being reliable, practical, ambitious and sensual. Taurus values stability, beautification of the physical world, and enjoying life through the five senses." },
    { id: "gemini", name: "Gemini", symbol: "♊", element: "Air", ruling: "Mercury", startDate: "May 21", endDate: "June 20", traits: ["Adaptable", "Outgoing", "Curious", "Versatile", "Indecisive"], description: "Gemini is often described as curious, adaptable, and communicative. Gemini individuals are sociable, outgoing, and love to share ideas and learn new things." },
    { id: "cancer", name: "Cancer", symbol: "♋", element: "Water", ruling: "Moon", startDate: "June 21", endDate: "July 22", traits: ["Intuitive", "Emotional", "Protective", "Nurturing", "Moody"], description: "Cancer is deeply intuitive and sentimental. Those born under this sign are very emotional and sensitive, and care deeply about matters of the family and their home." },
    { id: "leo", name: "Leo", symbol: "♌", element: "Fire", ruling: "Sun", startDate: "July 23", endDate: "August 22", traits: ["Generous", "Proud", "Theatrical", "Passionate", "Loyal"], description: "Leo is represented by the lion, and these spirited fire signs are the kings and queens of the celestial jungle. They're delighted to embrace their royal status." },
    { id: "virgo", name: "Virgo", symbol: "♍", element: "Earth", ruling: "Mercury", startDate: "August 23", endDate: "September 22", traits: ["Analytical", "Practical", "Diligent", "Critical", "Modest"], description: "Virgo is known for being practical, sensible, and loyal. They make excellent friends and partners. Virgos are perfectionists at heart and are always striving for improvement." },
    { id: "libra", name: "Libra", symbol: "♎", element: "Air", ruling: "Venus", startDate: "September 23", endDate: "October 22", traits: ["Diplomatic", "Fair", "Cooperative", "Indecisive", "Social"], description: "Libra is obsessed with symmetry and strives to create equilibrium in all areas of life. These air signs are the aesthetes of the zodiac and are typically drawn to art and harmony." },
    { id: "scorpio", name: "Scorpio", symbol: "♏", element: "Water", ruling: "Pluto", startDate: "October 23", endDate: "November 21", traits: ["Passionate", "Resourceful", "Brave", "Jealous", "Secretive"], description: "Scorpio is one of the most misunderstood signs of the zodiac. Because of their incredible passion and power, Scorpios are often mistaken for a fire sign." },
    { id: "sagittarius", name: "Sagittarius", symbol: "♐", element: "Fire", ruling: "Jupiter", startDate: "November 22", endDate: "December 21", traits: ["Optimistic", "Adventurous", "Independent", "Restless", "Honest"], description: "Sagittarius is symbolized by the archer, and these adventurous souls are always on a quest for knowledge. Sagittarius is a fire sign and known for their independence and philosophical views." },
    { id: "capricorn", name: "Capricorn", symbol: "♑", element: "Earth", ruling: "Saturn", startDate: "December 22", endDate: "January 19", traits: ["Disciplined", "Responsible", "Patient", "Ambitious", "Reserved"], description: "Capricorn is a sign known for its ambition, determination, and practicality. Those born under this sign are typically the hardest workers of the zodiac." },
    { id: "aquarius", name: "Aquarius", symbol: "♒", element: "Air", ruling: "Uranus", startDate: "January 20", endDate: "February 18", traits: ["Original", "Independent", "Humanitarian", "Aloof", "Inventive"], description: "Aquarius is known to be the most humanitarian astrological sign. These revolutionary thinkers fervently support 'power to the people' and value freedom and individuality." },
    { id: "pisces", name: "Pisces", symbol: "♓", element: "Water", ruling: "Neptune", startDate: "February 19", endDate: "March 20", traits: ["Compassionate", "Intuitive", "Artistic", "Dreamy", "Empathetic"], description: "Pisces are known for their empathy and emotional capacity. They are highly intuitive and can be very sensitive to the feelings of others as well as their environment." }
  ];

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return signs[0]; // Aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return signs[1]; // Taurus
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return signs[2]; // Gemini
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return signs[3]; // Cancer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return signs[4]; // Leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return signs[5]; // Virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return signs[6]; // Libra
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return signs[7]; // Scorpio
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return signs[8]; // Sagittarius
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return signs[9]; // Capricorn
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return signs[10]; // Aquarius
  return signs[11]; // Pisces
};

// Get Element color based on element type
export const getElementColor = (element: string) => {
  const elementColors = {
    "Fire": "#FF5757",
    "Earth": "#57C857",
    "Air": "#57FFFF",
    "Water": "#5E7EFF",
    "Metal": "#C0C0C0",
    "Wood": "#8B4513"
  };
  
  return elementColors[element as keyof typeof elementColors] || "#FFFFFF";
};

// Calculate compatibility between two zodiac signs (simplified)
export const calculateCompatibility = (sign1: string, sign2: string) => {
  // Element compatibility
  const elements = {
    "Aries": "Fire", "Leo": "Fire", "Sagittarius": "Fire",
    "Taurus": "Earth", "Virgo": "Earth", "Capricorn": "Earth",
    "Gemini": "Air", "Libra": "Air", "Aquarius": "Air",
    "Cancer": "Water", "Scorpio": "Water", "Pisces": "Water"
  };
  
  const compatibilityMatrix = {
    "Fire": { "Fire": 90, "Earth": 60, "Air": 80, "Water": 40 },
    "Earth": { "Fire": 60, "Earth": 85, "Air": 50, "Water": 90 },
    "Air": { "Fire": 80, "Earth": 50, "Air": 85, "Water": 60 },
    "Water": { "Fire": 40, "Earth": 90, "Water": 95, "Air": 60 }
  };
  
  const element1 = elements[sign1 as keyof typeof elements] || "Unknown";
  const element2 = elements[sign2 as keyof typeof elements] || "Unknown";
  
  if (element1 === "Unknown" || element2 === "Unknown") {
    return { score: 50, message: "Compatibility is uncertain." };
  }
  
  const score = compatibilityMatrix[element1 as keyof typeof compatibilityMatrix]?.[element2 as keyof typeof compatibilityMatrix["Fire"]] || 50;
  
  // Generate a message based on the score
  let message = "";
  if (score >= 90) message = "Excellent compatibility! A natural and harmonious connection.";
  else if (score >= 80) message = "Great compatibility. You complement each other well.";
  else if (score >= 70) message = "Good compatibility with some effort needed in certain areas.";
  else if (score >= 60) message = "Moderate compatibility. Communication will be key.";
  else if (score >= 50) message = "Average compatibility. Will require work and understanding.";
  else message = "Challenging compatibility. Will need patience and compromise.";
  
  return { score, message };
};

// Determine moon phase (simplified calculation)
export const getMoonPhase = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  
  // Simple algorithm to estimate moon phase
  // This is a simplified version and not astronomically accurate
  const c = Math.floor(year / 100);
  const y = year - 100 * c;
  const m = month;
  const d = day;
  
  let i = 291.0 * m / 10.0 + d - 0.5;
  i = i - Math.floor(i / 29.5) * 29.5;
  
  // Determine the phase name and icon
  let phaseName = "";
  let phaseIcon = "";
  let phaseDescription = "";
  
  if (i < 1.84566) {
    phaseName = "New Moon";
    phaseIcon = "🌑";
    phaseDescription = "A time for new beginnings and setting intentions.";
  } else if (i < 5.53699) {
    phaseName = "Waxing Crescent";
    phaseIcon = "🌒";
    phaseDescription = "A time for growth, creation, and manifestation.";
  } else if (i < 9.22831) {
    phaseName = "First Quarter";
    phaseIcon = "🌓";
    phaseDescription = "A time for decision making and taking action.";
  } else if (i < 12.91963) {
    phaseName = "Waxing Gibbous";
    phaseIcon = "🌔";
    phaseDescription = "A time for refining and perfecting your intentions.";
  } else if (i < 16.61096) {
    phaseName = "Full Moon";
    phaseIcon = "🌕";
    phaseDescription = "A time of culmination, clarity, and fulfillment.";
  } else if (i < 20.30228) {
    phaseName = "Waning Gibbous";
    phaseIcon = "🌖";
    phaseDescription = "A time for gratitude, sharing, and reflecting.";
  } else if (i < 23.99361) {
    phaseName = "Last Quarter";
    phaseIcon = "🌗";
    phaseDescription = "A time for release, letting go, and forgiveness.";
  } else {
    phaseName = "Waning Crescent";
    phaseIcon = "🌘";
    phaseDescription = "A time for surrender, rest, and recuperation.";
  }
  
  return {
    phase: phaseName,
    icon: phaseIcon,
    percentage: Math.round((i / 29.5) * 100),
    description: phaseDescription
  };
};

// Format current date for astrological reference
export const getAstrologicalDate = () => {
  const now = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  return `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
};

// Get current astrological season
export const getCurrentSeason = () => {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  const day = now.getDate();
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries Season";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus Season";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini Season";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer Season";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo Season";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo Season";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra Season";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio Season";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius Season";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn Season";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius Season";
  return "Pisces Season";
};
