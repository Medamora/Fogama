
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
    description: "Bold and ambitious, Aries individuals are natural-born leaders who dive headfirst into challenging situations with remarkable courage and determination. Ruled by Mars, the planet of action and energy, they possess an incredible drive that propels them forward in life. Their pioneering spirit makes them excellent at initiating new projects and breaking new ground where others fear to tread. They're confident, enthusiastic, and possess an infectious energy that inspires others to follow their lead. However, their impulsive nature can sometimes lead to hasty decisions, and their impatience may cause them to abandon projects before completion. Learning to balance their natural leadership abilities with patience and consideration for others' perspectives is key to their success and personal growth.",
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
    description: "Reliable and devoted, Taurus individuals are the bedrock of stability in an ever-changing world. Ruled by Venus, the planet of love and beauty, they have a natural appreciation for life's finer things and possess an innate ability to create beauty and comfort in their surroundings. Their practical, methodical approach to life ensures that they build solid foundations that can withstand any storm. They value security, both emotional and financial, and work tirelessly to create a comfortable life for themselves and their loved ones. Their patience and persistence are legendary, allowing them to see projects through to completion where others might give up. However, their love of routine and resistance to change can sometimes hold them back from embracing new opportunities. Learning to be more flexible while maintaining their grounded nature is essential for their continued growth and happiness.",
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
    description: "Curious and adaptable, Gemini individuals are the intellectual chameleons of the zodiac, constantly juggling multiple passions, interests, and social circles with remarkable ease. Ruled by Mercury, the planet of communication and intellect, they possess quick wit, exceptional communication skills, and an insatiable thirst for knowledge that drives them to explore every aspect of life. Their versatile nature allows them to adapt to any situation, making them excellent problem-solvers and entertaining companions. They have a playful approach to life and can find humor and interest in almost any situation. However, their multifaceted personality can sometimes lead to inconsistency, and their need for constant mental stimulation may result in difficulty focusing on one thing for extended periods. Learning to channel their diverse interests into meaningful pursuits while maintaining their natural versatility is crucial for their personal and professional success.",
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
    description: "Deeply intuitive and sentimental, Cancer individuals are the emotional nurturers of the zodiac who use their extraordinary emotional intelligence to create deep, meaningful connections with others. Ruled by the Moon, which governs emotions and intuition, they possess an almost psychic ability to understand the feelings and needs of those around them. Their protective instincts are incredibly strong, and they'll go to great lengths to ensure the safety and happiness of their loved ones, often putting others' needs before their own. They have a natural ability to create warm, welcoming environments that feel like true sanctuaries. Their memory for emotional experiences is remarkable, allowing them to learn from past hurts and joys. However, their intense sensitivity can sometimes lead to moodiness, and they may retreat into their shell when feeling overwhelmed or hurt. Learning to balance their caring nature with healthy emotional boundaries is essential for their well-being and the health of their relationships.",
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
    description: "Passionate and charismatic, Leo individuals are the natural performers of the zodiac who love to bask in the spotlight and share their radiant energy with the world. Ruled by the Sun, the center of our solar system, they possess a magnetic personality that draws others to them like moths to a flame. Their creative abilities are extraordinary, and they have a natural talent for dramatic expression, whether through art, performance, or simply their larger-than-life personality. They're generous to a fault, warm-hearted, and possess natural leadership qualities that inspire others to reach their full potential. Their confidence and optimism are infectious, making them excellent motivators and cheerleaders for those around them. However, their desire for attention and admiration can sometimes come across as self-centered, and their pride may prevent them from admitting mistakes or accepting criticism. Learning to balance their need for recognition with humility and genuine concern for others is crucial for maintaining healthy relationships and continued personal growth.",
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
    description: "Analytical and practical, Virgo individuals are the meticulous perfectionists of the zodiac who pay attention to the smallest details that others often overlook. Ruled by Mercury, the planet of communication and analysis, they possess extraordinary analytical abilities and a methodical approach to life that ensures nothing is left to chance. Their desire for improvement and perfection drives them to constantly refine their skills and surroundings, making them incredibly reliable and efficient in all their endeavors. They have a natural ability to see flaws and areas for improvement, which makes them excellent problem-solvers and quality controllers. Their practical wisdom and down-to-earth approach make them trusted advisors and dependable friends. However, their perfectionist tendencies can sometimes lead to excessive self-criticism and criticism of others, and they may become overwhelmed by their own impossibly high standards. Learning to appreciate progress over perfection and to show compassion for human imperfections, including their own, is essential for their happiness and well-being.",
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
    description: "Diplomatic and gracious, Libra individuals are the natural peacemakers of the zodiac who value harmony, balance, and beauty in all aspects of life. Ruled by Venus, the planet of love and aesthetics, they have an innate appreciation for art, beauty, and refined culture, often serving as the social glue that brings people together. Their diplomatic skills are unmatched, and they have a remarkable ability to see all sides of a situation, making them excellent mediators and negotiators. They seek balance and symmetry in their relationships and environment, and they're naturally drawn to partnerships and collaborative efforts. Their charm and social grace make them popular in social circles, and they have a talent for making others feel valued and heard. However, their desire to please everyone can sometimes lead to indecisiveness, and their avoidance of conflict may result in unresolved issues that fester over time. Learning to make decisive choices and address conflicts directly while maintaining their natural diplomatic approach is crucial for their personal growth and relationship success.",
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
    description: "Passionate and resourceful, Scorpio individuals are the transformative powerhouses of the zodiac who possess an intensity and depth that can be both mesmerizing and intimidating. Ruled by both Pluto, the planet of transformation and rebirth, and Mars, the planet of action and passion, they have an incredible ability to dive deep into life's mysteries and emerge transformed by their experiences. Their emotional depth is unparalleled, and they value authenticity and genuine connection above superficial pleasantries. They're naturally drawn to life's hidden truths and have an almost supernatural ability to read people's true motivations and hidden agendas. Their determination and resourcefulness make them formidable allies and fearsome opponents. However, their intensity can sometimes overwhelm others, and their tendency toward secrecy and possessiveness may create trust issues in relationships. Learning to channel their powerful emotions constructively and to trust others with their vulnerability is essential for building the deep, meaningful connections they crave.",
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
    description: "Freedom-loving and philosophical, Sagittarius individuals are the adventurous seekers of the zodiac who are constantly in pursuit of knowledge, truth, and new experiences that expand their understanding of the world. Ruled by Jupiter, the planet of expansion and wisdom, they possess an optimistic outlook that allows them to see possibilities where others see obstacles. Their love of adventure, whether physical, intellectual, or spiritual, drives them to explore new territories and push boundaries. They're natural teachers and philosophers who love to share their discoveries and insights with others. Their honesty and straightforward approach, while refreshing, can sometimes be brutally direct. They value their freedom above all else and resist any attempts to restrict their movement or thought. However, their restless nature can sometimes lead to a lack of commitment, and their blunt honesty may inadvertently hurt others' feelings. Learning to balance their need for freedom with responsibility and to temper their honesty with tact is important for maintaining stable relationships and achieving their long-term goals.",
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
    description: "Disciplined and responsible, Capricorn individuals are the ambitious mountain climbers of the zodiac who excel through persistence, dedication, and an unwavering commitment to their long-term goals. Ruled by Saturn, the planet of discipline and structure, they have a natural understanding of the importance of hard work, patience, and systematic progress in achieving lasting success. Their practical approach to life is grounded in tradition and proven methods, and they respect experience and wisdom gained through time and effort. They're natural leaders who lead by example, and their reliability makes them the backbone of any organization or family. Their ambition is legendary, but it's always tempered by a realistic assessment of what's possible and a willingness to put in the necessary work. However, their serious nature can sometimes make them appear cold or overly focused on material success, and their pessimistic tendencies may prevent them from taking necessary risks. Learning to balance their ambition with warmth and spontaneity, and to appreciate the journey as much as the destination, is crucial for their overall happiness and well-being.",
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
    description: "Progressive and original, Aquarius individuals are the humanitarian visionaries of the zodiac who march to the beat of their own drum while working tirelessly for the betterment of humanity as a whole. Ruled by both Uranus, the planet of innovation and rebellion, and Saturn, the planet of structure, they possess a unique ability to envision revolutionary changes while understanding the systematic approach needed to implement them. Their intellectual curiosity is boundless, and they're naturally drawn to cutting-edge ideas, technology, and social movements that promise to improve the world. They value independence and individuality above conformity and are often ahead of their time in their thinking and beliefs. Their humanitarian instincts are strong, and they genuinely care about making the world a better place for everyone. However, their detached approach to emotions can sometimes make them seem aloof or uncaring in personal relationships, and their unpredictable nature may confuse those who prefer consistency. Learning to balance their global vision with personal connections and to express their emotions more openly is important for developing deeper, more meaningful relationships.",
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
    description: "Compassionate and artistic, Pisces individuals are the empathetic dreamers of the zodiac who connect deeply with the emotional and spiritual dimensions of life in ways that often seem magical to others. Ruled by both Neptune, the planet of dreams and spirituality, and Jupiter, the planet of expansion and wisdom, they possess an extraordinary ability to feel and understand the emotions of others as if they were their own. Their artistic and creative abilities are often profound, serving as channels for expressing the ineffable experiences of the human soul. They have a natural inclination toward helping others and often sacrifice their own needs for the well-being of those they love. Their intuitive abilities are remarkable, often knowing things without logical explanation. However, their intense sensitivity can sometimes become overwhelming, leading them to seek escape through various means, and their tendency to absorb others' emotions can leave them feeling drained and confused about their own feelings. Learning to establish healthy emotional boundaries while maintaining their compassionate nature, and finding constructive outlets for their sensitivity, is crucial for their emotional well-being and personal growth.",
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
