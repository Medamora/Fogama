// Enhanced Numerology System with comprehensive calculations
// Includes all major numerology numbers and their interpretations

export interface NumerologyProfile {
  lifePathNumber: number;
  destinyNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  expressionNumber: number;
  birthdayNumber: number;
  personalYearNumber: number;
  personalMonthNumber: number;
  personalDayNumber: number;
  karmaNumbers: number[];
  challengeNumbers: number[];
  pinnacleNumbers: number[];
  masterNumbers: number[];
}

// Master numbers that aren't reduced
const MASTER_NUMBERS = [11, 22, 33, 44];

// Letter to number mapping (Pythagorean system)
const LETTER_VALUES: { [key: string]: number } = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

// Vowels for Soul Urge calculation
const VOWELS = 'AEIOU';

// Consonants for Personality calculation
const CONSONANTS = 'BCDFGHJKLMNPQRSTVWXYZ';

/**
 * Reduces a number to single digit unless it's a master number
 */
export const reduceToSingleDigit = (num: number): number => {
  if (MASTER_NUMBERS.includes(num)) {
    return num;
  }
  
  while (num > 9) {
    num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    if (MASTER_NUMBERS.includes(num)) {
      return num;
    }
  }
  
  return num;
};

/**
 * Calculate Life Path Number from birth date
 */
export const calculateLifePathNumber = (birthDate: Date): number => {
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  
  // Method 1: Add all digits
  const allDigits = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
  const sum = allDigits.split('').reduce((total, digit) => total + parseInt(digit), 0);
  
  return reduceToSingleDigit(sum);
};

/**
 * Calculate Destiny/Expression Number from full name
 */
export const calculateDestinyNumber = (fullName: string): number => {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  const sum = cleanName.split('').reduce((total, letter) => total + (LETTER_VALUES[letter] || 0), 0);
  return reduceToSingleDigit(sum);
};

/**
 * Calculate Soul Urge Number from vowels in name
 */
export const calculateSoulUrgeNumber = (fullName: string): number => {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  const vowelSum = cleanName.split('').reduce((total, letter) => {
    return VOWELS.includes(letter) ? total + (LETTER_VALUES[letter] || 0) : total;
  }, 0);
  return reduceToSingleDigit(vowelSum);
};

/**
 * Calculate Personality Number from consonants in name
 */
export const calculatePersonalityNumber = (fullName: string): number => {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  const consonantSum = cleanName.split('').reduce((total, letter) => {
    return CONSONANTS.includes(letter) ? total + (LETTER_VALUES[letter] || 0) : total;
  }, 0);
  return reduceToSingleDigit(consonantSum);
};

/**
 * Calculate Birthday Number
 */
export const calculateBirthdayNumber = (birthDate: Date): number => {
  const day = birthDate.getDate();
  return reduceToSingleDigit(day);
};

/**
 * Calculate Personal Year Number
 */
export const calculatePersonalYearNumber = (birthDate: Date, currentYear?: number): number => {
  const year = currentYear || new Date().getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  
  const sum = month + day + year;
  return reduceToSingleDigit(sum);
};

/**
 * Calculate Personal Month Number
 */
export const calculatePersonalMonthNumber = (birthDate: Date, currentMonth?: number, currentYear?: number): number => {
  const personalYear = calculatePersonalYearNumber(birthDate, currentYear);
  const month = currentMonth || (new Date().getMonth() + 1);
  
  return reduceToSingleDigit(personalYear + month);
};

/**
 * Calculate Personal Day Number
 */
export const calculatePersonalDayNumber = (birthDate: Date, currentDate?: Date): number => {
  const date = currentDate || new Date();
  const personalMonth = calculatePersonalMonthNumber(birthDate, date.getMonth() + 1, date.getFullYear());
  const day = date.getDate();
  
  return reduceToSingleDigit(personalMonth + day);
};

/**
 * Calculate Challenge Numbers (4 challenges in life)
 */
export const calculateChallengeNumbers = (birthDate: Date): number[] => {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const year = birthDate.getFullYear();
  
  const monthReduced = reduceToSingleDigit(month);
  const dayReduced = reduceToSingleDigit(day);
  const yearReduced = reduceToSingleDigit(year);
  
  const challenge1 = Math.abs(monthReduced - dayReduced);
  const challenge2 = Math.abs(dayReduced - yearReduced);
  const challenge3 = Math.abs(challenge1 - challenge2);
  const challenge4 = Math.abs(monthReduced - yearReduced);
  
  return [challenge1, challenge2, challenge3, challenge4];
};

/**
 * Calculate Pinnacle Numbers (4 major life periods)
 */
export const calculatePinnacleNumbers = (birthDate: Date): number[] => {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const year = birthDate.getFullYear();
  
  const monthReduced = reduceToSingleDigit(month);
  const dayReduced = reduceToSingleDigit(day);
  const yearReduced = reduceToSingleDigit(year);
  
  const pinnacle1 = reduceToSingleDigit(monthReduced + dayReduced);
  const pinnacle2 = reduceToSingleDigit(dayReduced + yearReduced);
  const pinnacle3 = reduceToSingleDigit(pinnacle1 + pinnacle2);
  const pinnacle4 = reduceToSingleDigit(monthReduced + yearReduced);
  
  return [pinnacle1, pinnacle2, pinnacle3, pinnacle4];
};

/**
 * Find missing numbers in full name (Karmic Lessons)
 */
export const calculateKarmicLessons = (fullName: string): number[] => {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  const presentNumbers = new Set<number>();
  
  cleanName.split('').forEach(letter => {
    const value = LETTER_VALUES[letter];
    if (value) presentNumbers.add(value);
  });
  
  const missingNumbers: number[] = [];
  for (let i = 1; i <= 9; i++) {
    if (!presentNumbers.has(i)) {
      missingNumbers.push(i);
    }
  }
  
  return missingNumbers;
};

/**
 * Calculate complete numerology profile
 */
export const calculateNumerologyProfile = (fullName: string, birthDate: Date): NumerologyProfile => {
  return {
    lifePathNumber: calculateLifePathNumber(birthDate),
    destinyNumber: calculateDestinyNumber(fullName),
    soulUrgeNumber: calculateSoulUrgeNumber(fullName),
    personalityNumber: calculatePersonalityNumber(fullName),
    expressionNumber: calculateDestinyNumber(fullName), // Same as destiny
    birthdayNumber: calculateBirthdayNumber(birthDate),
    personalYearNumber: calculatePersonalYearNumber(birthDate),
    personalMonthNumber: calculatePersonalMonthNumber(birthDate),
    personalDayNumber: calculatePersonalDayNumber(birthDate),
    karmaNumbers: calculateKarmicLessons(fullName),
    challengeNumbers: calculateChallengeNumbers(birthDate),
    pinnacleNumbers: calculatePinnacleNumbers(birthDate),
    masterNumbers: findMasterNumbers(fullName, birthDate)
  };
};

/**
 * Find all master numbers in a person's chart
 */
const findMasterNumbers = (fullName: string, birthDate: Date): number[] => {
  const masterNumbers: number[] = [];
  
  // Check each calculation for master numbers before reduction
  const checks = [
    calculateDestinyNumber,
    calculateSoulUrgeNumber,
    calculatePersonalityNumber
  ];
  
  checks.forEach(fn => {
    const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
    let sum = 0;
    
    if (fn === calculateSoulUrgeNumber) {
      sum = cleanName.split('').reduce((total, letter) => {
        return VOWELS.includes(letter) ? total + (LETTER_VALUES[letter] || 0) : total;
      }, 0);
    } else if (fn === calculatePersonalityNumber) {
      sum = cleanName.split('').reduce((total, letter) => {
        return CONSONANTS.includes(letter) ? total + (LETTER_VALUES[letter] || 0) : total;
      }, 0);
    } else {
      sum = cleanName.split('').reduce((total, letter) => total + (LETTER_VALUES[letter] || 0), 0);
    }
    
    // Check for master numbers in the reduction process
    while (sum > 9) {
      if (MASTER_NUMBERS.includes(sum)) {
        masterNumbers.push(sum);
      }
      sum = sum.toString().split('').reduce((total, digit) => total + parseInt(digit), 0);
    }
  });
  
  // Remove duplicates
  return [...new Set(masterNumbers)];
};

/**
 * Get detailed interpretation for any numerology number
 */
export const getNumerologyMeaning = (number: number, type: string = 'general'): string => {
  const meanings: { [key: number]: { [key: string]: string } } = {
    1: {
      general: "The number 1 represents independence, leadership, and pioneering spirit. You are a natural-born leader with strong individuality and the courage to forge new paths. Your determination and self-reliance help you overcome obstacles and achieve your goals through your own efforts.",
      lifePath: "Your life path is about developing leadership qualities and learning to stand on your own. You're here to be a pioneer, breaking new ground and inspiring others to follow. Independence and self-reliance are your key themes.",
      destiny: "Your destiny involves taking leadership roles and being a pioneer in your chosen field. You're meant to be original, innovative, and independent in your approach to life and work.",
      soulUrge: "Deep within, you desire to be first, to lead, and to be recognized for your unique contributions. You crave independence and the freedom to express your individuality without constraint."
    },
    2: {
      general: "The number 2 represents cooperation, diplomacy, and partnership. You are naturally diplomatic and work well with others. Your sensitivity and intuition make you an excellent mediator and peacemaker.",
      lifePath: "Your path involves learning cooperation, developing your intuitive abilities, and working in partnership with others. You're here to bring harmony and balance to situations and relationships.",
      destiny: "Your destiny is to be a peacemaker, diplomat, or counselor. You're meant to work behind the scenes, supporting others and creating harmony in your environment.",
      soulUrge: "Your soul seeks harmony, peace, and meaningful relationships. You desire to be loved and appreciated for your caring, sensitive nature."
    },
    3: {
      general: "The number 3 represents creativity, communication, and artistic expression. You have natural creative abilities and excellent communication skills. Joy, optimism, and inspiration flow through everything you do.",
      lifePath: "Your path involves developing your creative talents and sharing them with the world. You're here to inspire others through art, communication, or entertainment.",
      destiny: "Your destiny is to be a creative communicator - an artist, writer, entertainer, or teacher. You're meant to inspire others and bring beauty into the world.",
      soulUrge: "Your soul desires to create, express, and inspire. You need creative outlets and the freedom to share your unique vision with others."
    },
    4: {
      general: "The number 4 represents stability, hard work, and building solid foundations. You are practical, reliable, and methodical in your approach to life. Your patience and persistence help you achieve lasting success.",
      lifePath: "Your path involves building something lasting and meaningful through hard work and dedication. You're here to create stability and security for yourself and others.",
      destiny: "Your destiny is to be a builder, organizer, or manager. You're meant to create systems, structures, and foundations that will endure.",
      soulUrge: "Your soul seeks security, stability, and the satisfaction of building something meaningful. You desire recognition for your hard work and reliability."
    },
    5: {
      general: "The number 5 represents freedom, adventure, and change. You crave variety and new experiences. Your curiosity and versatility make you adaptable to any situation.",
      lifePath: "Your path involves experiencing life to the fullest through travel, change, and adventure. You're here to learn through experience and share what you discover.",
      destiny: "Your destiny involves freedom, travel, and constant change. You're meant to be a messenger, teacher, or explorer who brings new ideas and experiences to others.",
      soulUrge: "Your soul desires freedom, adventure, and variety. You need the ability to move freely and experience all that life has to offer."
    },
    6: {
      general: "The number 6 represents nurturing, responsibility, and service to others. You have a strong desire to help and heal others. Family and community are very important to you.",
      lifePath: "Your path involves taking care of others and creating harmony in your family and community. You're here to be a healer, teacher, or counselor.",
      destiny: "Your destiny is to be a nurturer and healer. You're meant to serve others through caring professions or by creating a loving, stable home environment.",
      soulUrge: "Your soul seeks to love and be loved, to care for others, and to create a harmonious, beautiful environment for yourself and your loved ones."
    },
    7: {
      general: "The number 7 represents wisdom, spirituality, and deep thinking. You are naturally drawn to understanding life's mysteries and developing your spiritual awareness. Solitude and reflection are important to you.",
      lifePath: "Your path involves developing your inner wisdom and spiritual understanding. You're here to seek truth and share your insights with others.",
      destiny: "Your destiny is to be a seeker of truth, whether through spiritual pursuits, research, or teaching. You're meant to develop and share deep wisdom.",
      soulUrge: "Your soul seeks truth, wisdom, and spiritual understanding. You desire solitude for reflection and the opportunity to explore life's deeper mysteries."
    },
    8: {
      general: "The number 8 represents material success, business acumen, and personal power. You have natural leadership abilities and the drive to achieve significant material success.",
      lifePath: "Your path involves achieving material success and learning to use power responsibly. You're here to build something significant in the material world.",
      destiny: "Your destiny is to achieve material success and recognition. You're meant to be a leader in business or another field where you can exercise authority and build wealth.",
      soulUrge: "Your soul desires recognition, achievement, and material success. You want to build something lasting and be recognized for your accomplishments."
    },
    9: {
      general: "The number 9 represents universal love, humanitarianism, and completion. You have a broad perspective and genuine concern for humanity. Your generosity and compassion inspire others.",
      lifePath: "Your path involves serving humanity and working for the greater good. You're here to be a humanitarian, healer, or teacher who helps make the world a better place.",
      destiny: "Your destiny is to serve others and work for humanitarian causes. You're meant to be a teacher, healer, or leader who helps humanity evolve.",
      soulUrge: "Your soul seeks to serve others and make a positive difference in the world. You desire to be loved and appreciated for your compassionate, generous nature."
    },
    11: {
      general: "Master Number 11 represents intuition, inspiration, and spiritual enlightenment. You have highly developed psychic abilities and serve as a channel for higher wisdom. Your sensitivity is extraordinary.",
      lifePath: "Your path involves developing your spiritual gifts and serving as an inspirational teacher or healer. You're here to be a spiritual beacon for others.",
      destiny: "Your destiny is to be a spiritual teacher, healer, or inspirational leader. You're meant to channel higher wisdom and help others awaken spiritually.",
      soulUrge: "Your soul seeks spiritual enlightenment and the opportunity to inspire others. You desire to be a channel for higher wisdom and divine love."
    },
    22: {
      general: "Master Number 22 represents the Master Builder - combining spiritual insight with practical application. You have the ability to manifest great things in the material world through spiritual understanding.",
      lifePath: "Your path involves building something significant that serves humanity. You're here to combine spiritual wisdom with practical skills to create lasting change.",
      destiny: "Your destiny is to be a Master Builder who creates something meaningful for humanity. You're meant to manifest spiritual ideals in practical, tangible ways.",
      soulUrge: "Your soul seeks to build something great that will benefit humanity. You desire to manifest your highest ideals in concrete, practical ways."
    },
    33: {
      general: "Master Number 33 represents the Master Teacher - the highest form of spiritual service through teaching and healing. You embody unconditional love and have the ability to uplift humanity.",
      lifePath: "Your path involves serving as a Master Teacher or Healer. You're here to embody unconditional love and help humanity evolve through your teaching and healing.",
      destiny: "Your destiny is to be a Master Teacher who serves humanity through unconditional love, healing, and spiritual guidance.",
      soulUrge: "Your soul seeks to serve humanity through teaching, healing, and embodying unconditional love. You desire to be a beacon of spiritual light for others."
    }
  };

  const numberMeanings = meanings[number];
  if (!numberMeanings) {
    return "This is a unique number that requires individual interpretation based on your specific circumstances and spiritual journey.";
  }

  return numberMeanings[type] || numberMeanings.general;
};

/**
 * Get compatibility between two numerology numbers
 */
export const getNumerologyCompatibility = (number1: number, number2: number): {
  score: number;
  description: string;
} => {
  const compatibilityMatrix: { [key: string]: number } = {
    '1-1': 85, '1-2': 70, '1-3': 80, '1-4': 65, '1-5': 75, '1-6': 60, '1-7': 55, '1-8': 90, '1-9': 70,
    '2-2': 90, '2-3': 75, '2-4': 85, '2-5': 60, '2-6': 95, '2-7': 80, '2-8': 65, '2-9': 85,
    '3-3': 80, '3-4': 55, '3-5': 90, '3-6': 75, '3-7': 60, '3-8': 70, '3-9': 85,
    '4-4': 85, '4-5': 50, '4-6': 80, '4-7': 75, '4-8': 90, '4-9': 65,
    '5-5': 75, '5-6': 60, '5-7': 65, '5-8': 70, '5-9': 80,
    '6-6': 90, '6-7': 70, '6-8': 75, '6-9': 95,
    '7-7': 85, '7-8': 60, '7-9': 75,
    '8-8': 85, '8-9': 70,
    '9-9': 80
  };

  const key1 = `${Math.min(number1, number2)}-${Math.max(number1, number2)}`;
  const score = compatibilityMatrix[key1] || 50;

  let description = '';
  if (score >= 90) description = 'Exceptional compatibility - you understand each other deeply';
  else if (score >= 80) description = 'Excellent compatibility - you complement each other well';
  else if (score >= 70) description = 'Good compatibility - you can build a strong relationship';
  else if (score >= 60) description = 'Moderate compatibility - requires understanding and patience';
  else description = 'Challenging compatibility - will need significant effort and compromise';

  return { score, description };
};