
// Zodiac sign data with dates and descriptions
export const zodiacSigns = [
  {
    id: "aries",
    name: "Aries",
    symbol: "♈",
    element: "Fire",
    startDate: "March 21",
    endDate: "April 19",
    color: "#FF5757",
    ruling: "Mars",
    description: "Bold and ambitious, Aries dives headfirst into challenging situations. They're determined, confident, enthusiastic, and natural-born leaders.",
    traits: ["Courageous", "Energetic", "Confident", "Impulsive", "Impatient"]
  },
  {
    id: "taurus",
    name: "Taurus",
    symbol: "♉",
    element: "Earth",
    startDate: "April 20",
    endDate: "May 20",
    color: "#57C857",
    ruling: "Venus",
    description: "Reliable and devoted, Taurus values security, comfort, and pleasure. They're grounded, patient, and practical, with a strong appreciation for beauty.",
    traits: ["Patient", "Reliable", "Devoted", "Stubborn", "Possessive"]
  },
  {
    id: "gemini",
    name: "Gemini",
    symbol: "♊",
    element: "Air",
    startDate: "May 21",
    endDate: "June 20",
    color: "#FFDD57",
    ruling: "Mercury",
    description: "Curious and adaptable, Gemini is constantly juggling multiple passions. They're expressive, quick-witted, and sociable, with a playful approach to life.",
    traits: ["Versatile", "Communicative", "Curious", "Inconsistent", "Nervous"]
  },
  {
    id: "cancer",
    name: "Cancer",
    symbol: "♋",
    element: "Water",
    startDate: "June 21",
    endDate: "July 22",
    color: "#5E7EFF",
    ruling: "Moon",
    description: "Deeply intuitive and sentimental, Cancer uses emotional intelligence to connect with others. They're protective, nurturing, and deeply loyal to loved ones.",
    traits: ["Intuitive", "Emotional", "Protective", "Moody", "Insecure"]
  },
  {
    id: "leo",
    name: "Leo",
    symbol: "♌",
    element: "Fire",
    startDate: "July 23",
    endDate: "August 22",
    color: "#FF8C57",
    ruling: "Sun",
    description: "Passionate and charismatic, Leo loves to bask in the spotlight. They're creative, generous, and warm-hearted, with natural leadership qualities.",
    traits: ["Generous", "Creative", "Cheerful", "Stubborn", "Self-centered"]
  },
  {
    id: "virgo",
    name: "Virgo",
    symbol: "♍",
    element: "Earth",
    startDate: "August 23",
    endDate: "September 22",
    color: "#57FFCB",
    ruling: "Mercury",
    description: "Analytical and practical, Virgo pays attention to the smallest details. They're methodical, reliable, and always strive for improvement and perfection.",
    traits: ["Analytical", "Hardworking", "Practical", "Critical", "Perfectionist"]
  },
  {
    id: "libra",
    name: "Libra",
    symbol: "♎",
    element: "Air",
    startDate: "September 23",
    endDate: "October 22",
    color: "#FF57E2",
    ruling: "Venus",
    description: "Diplomatic and gracious, Libra values harmony in all forms. They're fair-minded, social, and seek balance and symmetry in their relationships and environment.",
    traits: ["Diplomatic", "Fair", "Social", "Indecisive", "Avoids conflict"]
  },
  {
    id: "scorpio",
    name: "Scorpio",
    symbol: "♏",
    element: "Water",
    startDate: "October 23",
    endDate: "November 21",
    color: "#8C57FF",
    ruling: "Pluto, Mars",
    description: "Passionate and resourceful, Scorpio is determined and decisive. They're emotionally deep, intuitive, and value authenticity in themselves and others.",
    traits: ["Passionate", "Resourceful", "Brave", "Jealous", "Secretive"]
  },
  {
    id: "sagittarius",
    name: "Sagittarius",
    symbol: "♐",
    element: "Fire",
    startDate: "November 22",
    endDate: "December 21",
    color: "#FF5791",
    ruling: "Jupiter",
    description: "Freedom-loving and philosophical, Sagittarius seeks adventure and knowledge. They're optimistic, enthusiastic, and always looking toward the horizon.",
    traits: ["Optimistic", "Adventurous", "Honest", "Restless", "Careless"]
  },
  {
    id: "capricorn",
    name: "Capricorn",
    symbol: "♑",
    element: "Earth",
    startDate: "December 22",
    endDate: "January 19",
    color: "#57A9FF",
    ruling: "Saturn",
    description: "Disciplined and responsible, Capricorn excels through persistence and dedication. They're practical, ambitious, and respect tradition and experience.",
    traits: ["Disciplined", "Responsible", "Patient", "Pessimistic", "Stubborn"]
  },
  {
    id: "aquarius",
    name: "Aquarius",
    symbol: "♒",
    element: "Air",
    startDate: "January 20",
    endDate: "February 18",
    color: "#57FFFF",
    ruling: "Uranus, Saturn",
    description: "Progressive and original, Aquarius marches to their own drummer. They're intellectual, independent, and humanitarian, with a vision for the future.",
    traits: ["Independent", "Humanitarian", "Original", "Detached", "Unpredictable"]
  },
  {
    id: "pisces",
    name: "Pisces",
    symbol: "♓",
    element: "Water",
    startDate: "February 19",
    endDate: "March 20",
    color: "#C857FF",
    ruling: "Neptune, Jupiter",
    description: "Compassionate and artistic, Pisces connects deeply with the emotional world. They're intuitive, gentle, and often feel things deeply and intensely.",
    traits: ["Intuitive", "Compassionate", "Artistic", "Escapist", "Overly sensitive"]
  }
];

// Major constellations
export const majorConstellations = [
  {
    id: "ursa-major",
    name: "Ursa Major",
    description: "The Great Bear, containing the Big Dipper",
    stars: [
      { name: "Dubhe", x: 10, y: 15, magnitude: 1.8 },
      { name: "Merak", x: 15, y: 20, magnitude: 2.4 },
      { name: "Phecda", x: 20, y: 25, magnitude: 2.4 },
      { name: "Megrez", x: 25, y: 22, magnitude: 3.3 },
      { name: "Alioth", x: 30, y: 20, magnitude: 1.8 },
      { name: "Mizar", x: 35, y: 18, magnitude: 2.2 },
      { name: "Alkaid", x: 40, y: 15, magnitude: 1.9 }
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]
    ]
  },
  {
    id: "ursa-minor",
    name: "Ursa Minor",
    description: "The Little Bear, containing Polaris (the North Star)",
    stars: [
      { name: "Polaris", x: 50, y: 15, magnitude: 2.0 },
      { name: "Kochab", x: 55, y: 20, magnitude: 2.1 },
      { name: "Pherkad", x: 58, y: 22, magnitude: 3.0 },
      { name: "Yildun", x: 52, y: 18, magnitude: 4.3 },
      { name: "Epsilon UMi", x: 54, y: 25, magnitude: 4.2 },
      { name: "Zeta UMi", x: 57, y: 28, magnitude: 4.3 },
      { name: "Eta UMi", x: 59, y: 30, magnitude: 4.9 }
    ],
    lines: [
      [0, 3], [3, 4], [4, 5], [5, 6], [6, 2], [2, 1], [1, 4]
    ]
  },
  {
    id: "orion",
    name: "Orion",
    description: "The Hunter, one of the most recognizable constellations",
    stars: [
      { name: "Betelgeuse", x: 70, y: 40, magnitude: 0.5 },
      { name: "Rigel", x: 80, y: 60, magnitude: 0.1 },
      { name: "Bellatrix", x: 65, y: 45, magnitude: 1.6 },
      { name: "Mintaka", x: 72, y: 50, magnitude: 2.2 },
      { name: "Alnilam", x: 75, y: 50, magnitude: 1.7 },
      { name: "Alnitak", x: 78, y: 50, magnitude: 1.8 },
      { name: "Saiph", x: 85, y: 55, magnitude: 2.1 }
    ],
    lines: [
      [0, 2], [2, 3], [3, 4], [4, 5], [5, 1], [1, 6], [6, 0]
    ]
  }
];

// Sample planets data
export const planets = [
  {
    id: "sun",
    name: "Sun",
    symbol: "☉",
    description: "Represents the core essence, ego, and life force",
    color: "#FFD700"
  },
  {
    id: "moon",
    name: "Moon",
    symbol: "☽",
    description: "Represents emotions, instincts, and the subconscious mind",
    color: "#E6E6FA"
  },
  {
    id: "mercury",
    name: "Mercury",
    symbol: "☿",
    description: "Represents communication, intellect, and perception",
    color: "#C0C0C0"
  },
  {
    id: "venus",
    name: "Venus",
    symbol: "♀",
    description: "Represents love, beauty, and value systems",
    color: "#FFB6C1"
  },
  {
    id: "mars",
    name: "Mars",
    symbol: "♂",
    description: "Represents drive, passion, and assertiveness",
    color: "#FF4500"
  },
  {
    id: "jupiter",
    name: "Jupiter",
    symbol: "♃",
    description: "Represents growth, expansion, and wisdom",
    color: "#F0E68C"
  },
  {
    id: "saturn",
    name: "Saturn",
    symbol: "♄",
    description: "Represents discipline, responsibility, and limitation",
    color: "#778899"
  },
  {
    id: "uranus",
    name: "Uranus",
    symbol: "♅",
    description: "Represents innovation, rebellion, and sudden change",
    color: "#00FFFF"
  },
  {
    id: "neptune",
    name: "Neptune",
    symbol: "♆",
    description: "Represents dreams, intuition, and spiritual insight",
    color: "#9370DB"
  },
  {
    id: "pluto",
    name: "Pluto",
    symbol: "♇",
    description: "Represents transformation, power, and rebirth",
    color: "#8B0000"
  }
];

// Sample houses data
export const houses = [
  {
    id: 1,
    name: "First House",
    alias: "House of Self",
    description: "Physical appearance, personality, and how others see you",
  },
  {
    id: 2,
    name: "Second House",
    alias: "House of Value",
    description: "Money, possessions, and personal values",
  },
  {
    id: 3,
    name: "Third House",
    alias: "House of Communication",
    description: "Communication, siblings, and short travel",
  },
  {
    id: 4,
    name: "Fourth House",
    alias: "House of Home",
    description: "Home, family, and emotional foundation",
  },
  {
    id: 5,
    name: "Fifth House",
    alias: "House of Pleasure",
    description: "Creativity, romance, and self-expression",
  },
  {
    id: 6,
    name: "Sixth House",
    alias: "House of Health",
    description: "Daily routines, health, and service",
  },
  {
    id: 7,
    name: "Seventh House",
    alias: "House of Partnership",
    description: "Marriage, business partnerships, and open enemies",
  },
  {
    id: 8,
    name: "Eighth House",
    alias: "House of Transformation",
    description: "Shared resources, intimacy, and transformation",
  },
  {
    id: 9,
    name: "Ninth House",
    alias: "House of Philosophy",
    description: "Higher education, philosophy, and long journeys",
  },
  {
    id: 10,
    name: "Tenth House",
    alias: "House of Career",
    description: "Career, public reputation, and authority",
  },
  {
    id: 11,
    name: "Eleventh House",
    alias: "House of Friendship",
    description: "Friendships, groups, and hopes",
  },
  {
    id: 12,
    name: "Twelfth House",
    alias: "House of Unconscious",
    description: "Subconscious, secrets, and hidden strengths",
  }
];

// Generate horoscope for demo purposes (normally would come from API)
export const generateHoroscope = (sign: string, type: 'daily' | 'monthly' | 'yearly') => {
  const horoscopes = {
    daily: [
      "Today brings an opportunity for meaningful connections. Be open to new perspectives.",
      "Focus on self-care today. Your energy needs replenishing for upcoming challenges.",
      "A surprising encounter may shift your perspective. Stay flexible and receptive.",
      "Creative energies are high today. Express yourself through your favorite medium.",
      "Today favors practical matters. Address lingering tasks with renewed determination."
    ],
    monthly: [
      "This month highlights your relationships. Old connections may resurface with new meaning.",
      "Professional growth takes center stage this month. Your efforts will be recognized.",
      "A period of introspection awaits you. Inner discoveries will guide external decisions.",
      "Financial matters improve this month. A long-term investment begins to show promise.",
      "Travel and education are favored. Consider how you might expand your horizons."
    ],
    yearly: [
      "This year marks a significant turning point in your personal development. Trust the process.",
      "Professional transformations define this year. Embrace change rather than resist it.",
      "Relationships take on deeper meaning this year. Authenticity will strengthen bonds.",
      "Health and well-being become priorities. Establishing sustainable routines brings lasting benefits.",
      "Creative projects flourish this year. Your unique voice finds its audience."
    ]
  };

  // Get random horoscope from appropriate array
  const index = Math.floor(Math.random() * horoscopes[type].length);
  return horoscopes[type][index];
};

// Calculate zodiac sign from birth date
export const getZodiacSign = (month: number, day: number) => {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns[0]; // Aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns[1]; // Taurus
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns[2]; // Gemini
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns[3]; // Cancer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns[4]; // Leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns[5]; // Virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns[6]; // Libra
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns[7]; // Scorpio
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns[8]; // Sagittarius
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns[9]; // Capricorn
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns[10]; // Aquarius
  return zodiacSigns[11]; // Pisces
};

// Generate random stars for background
export const generateRandomStars = (count: number, containerWidth: number, containerHeight: number) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const size = Math.random();
    let sizeClass;
    
    if (size < 0.5) sizeClass = "star-small";
    else if (size < 0.8) sizeClass = "star-medium";
    else sizeClass = "star-large";
    
    stars.push({
      id: `star-${i}`,
      x: Math.random() * containerWidth,
      y: Math.random() * containerHeight,
      class: sizeClass,
      twinkle: Math.random() > 0.5 ? "animate-star-twinkle" : "animate-star-twinkle-slow",
      delay: `${Math.random() * 5}s`
    });
  }
  return stars;
};
