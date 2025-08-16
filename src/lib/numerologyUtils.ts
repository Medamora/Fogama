
// Basic numerology utility functions

// Helper function to reduce a number to a single digit (1-9)
// Exception: 11, 22, and 33 are considered master numbers and aren't reduced
const reduceToSingleDigit = (num: number): number => {
  // Check for master numbers
  if (num === 11 || num === 22 || num === 33) {
    return num;
  }
  
  // Reduce to single digit
  while (num > 9) {
    num = Array.from(String(num), Number).reduce((sum, digit) => sum + digit, 0);
  }
  
  return num;
};

// Calculate Life Path Number from birthdate (YYYY-MM-DD)
export const calculateLifePathNumber = (birthdate: string): number => {
  // Extract year, month, and day
  const [year, month, day] = birthdate.split('-').map(Number);
  
  // Add all digits together
  const yearSum = Array.from(String(year), Number).reduce((sum, digit) => sum + digit, 0);
  const monthSum = Array.from(String(month), Number).reduce((sum, digit) => sum + digit, 0);
  const daySum = Array.from(String(day), Number).reduce((sum, digit) => sum + digit, 0);
  
  // Reduce to single digit, unless it's a master number
  const sum = yearSum + monthSum + daySum;
  return reduceToSingleDigit(sum);
};

// Calculate Destiny Number (Expression Number) from full name
export const calculateDestinyNumber = (name: string): number => {
  // Remove spaces and convert to uppercase
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  
  // Assign number values to each letter (A=1, B=2, ..., Z=26)
  // Then reduce to 1-9 values using the Pythagorean system
  const letterValues: { [key: string]: number } = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  };
  
  // Calculate sum of all letters
  const sum = Array.from(cleanName).reduce((total, letter) => {
    return total + (letterValues[letter] || 0);
  }, 0);
  
  // Reduce to single digit, unless it's a master number
  return reduceToSingleDigit(sum);
};

// Calculate Personality Number from name (using consonants only)
export const calculatePersonalityNumber = (name: string): number => {
  // Remove spaces and convert to uppercase
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  
  // Assign number values to each letter (A=1, B=2, ..., Z=26)
  // Then reduce to 1-9 values using the Pythagorean system
  const letterValues: { [key: string]: number } = {
    B: 2, C: 3, D: 4, F: 6, G: 7, H: 8, J: 1, K: 2, L: 3,
    M: 4, N: 5, P: 7, Q: 8, R: 9, S: 1, T: 2, V: 4, W: 5,
    X: 6, Z: 8
  };
  
  // Calculate sum of consonants only
  const sum = Array.from(cleanName).reduce((total, letter) => {
    return total + (letterValues[letter] || 0);
  }, 0);
  
  // Reduce to single digit, unless it's a master number
  return reduceToSingleDigit(sum);
};

// Get meaning for numerology number
export const getNumerologyMeaning = (number: number): string => {
  const meanings: { [key: number]: string } = {
    1: "Leadership, independence, and originality. You're a pioneer with strong willpower.",
    2: "Cooperation, balance, and harmony. You're diplomatic and have natural intuition.",
    3: "Creativity, expression, and optimism. You have a joyful approach to life.",
    4: "Stability, practicality, and reliability. You're a hard worker with strong foundations.",
    5: "Freedom, change, and versatility. You're adaptable and crave variety.",
    6: "Responsibility, care, and harmony. You're nurturing and protective of loved ones.",
    7: "Analysis, wisdom, and spirituality. You seek deeper truths and understanding.",
    8: "Ambition, achievement, and authority. You're business-minded with executive ability.",
    9: "Compassion, generosity, and humanitarianism. You see the bigger picture of life.",
    11: "Intuition, inspiration, and spiritual insight. A master number with heightened awareness.",
    22: "Master builder, practical idealism, and large-scale undertakings. A rare and powerful vibration.",
    33: "Master teacher, nurturing with responsibility. The rarest of master numbers, focusing on raising consciousness."
  };
  
  return meanings[number] || "This number requires personal interpretation.";
};
