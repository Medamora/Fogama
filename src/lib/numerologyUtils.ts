
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

// Get detailed meaning for numerology number
export const getNumerologyMeaning = (number: number): string => {
  const meanings: { [key: number]: string } = {
    1: "As a Life Path 1, you are a natural-born leader with an incredible drive for independence and originality. Your pioneering spirit pushes you to break new ground and forge your own path in life. You possess unwavering determination and strong willpower that helps you overcome obstacles that would stop others. Your innovative mind constantly seeks new solutions and approaches, making you an excellent entrepreneur or leader in any field. However, you may struggle with being too controlling or impatient with others who don't share your vision. Learning to work with others while maintaining your independence is key to your success. Your greatest strength lies in your ability to initiate projects and inspire others to follow your lead.",
    2: "Life Path 2 individuals are the natural diplomats and peacemakers of the world. Your innate ability to sense the emotions and needs of others makes you an excellent mediator and counselor. You thrive in partnerships and collaborative environments where your cooperative nature can shine. Your intuitive abilities are remarkably strong, often knowing things without logical explanation. You have a gentle, sensitive approach to life that draws people to you for comfort and guidance. However, your desire for harmony can sometimes lead to avoiding necessary conflicts or suppressing your own needs. Learning to assert yourself while maintaining your peaceful nature is crucial for your personal growth. Your gift lies in bringing people together and creating balance in chaotic situations.",
    3: "As a Life Path 3, you are blessed with natural creativity, artistic expression, and an optimistic outlook that lights up any room you enter. Your joyful approach to life is infectious, inspiring others to see the beauty and potential in everything. You have exceptional communication skills, whether through speaking, writing, or artistic expression, and you're naturally drawn to careers in the arts, entertainment, or any field that allows creative expression. Your imagination knows no bounds, and you have the ability to turn even the mundane into something beautiful and meaningful. However, your scattered energy can sometimes prevent you from focusing on one project long enough to see it through completion. Learning discipline while maintaining your creative spark is essential for manifesting your full potential.",
    4: "Life Path 4 represents the master builders of the numerological world. Your practical, methodical approach to life creates solid foundations that last for generations. You have an innate understanding of systems, organization, and the step-by-step processes needed to achieve lasting success. Your reliability makes you the person others turn to when they need something done right. You excel at taking abstract ideas and turning them into concrete reality through careful planning and persistent effort. Your strong work ethic and attention to detail are unmatched. However, your perfectionist tendencies can sometimes lead to rigidity or resistance to change. Learning to be flexible while maintaining your high standards will help you adapt to life's inevitable changes while still building the stable life you desire.",
    5: "As a Life Path 5, you embody freedom, adventure, and the constant quest for new experiences. Your versatile nature allows you to adapt to any situation, making you excellent at problem-solving and thriving in dynamic environments. You have an insatiable curiosity about life and people, driving you to travel, learn, and explore everything the world has to offer. Your magnetic personality draws diverse people into your circle, and your storytelling abilities captivate audiences wherever you go. Change doesn't frighten you; it energizes you. However, your need for constant stimulation can sometimes lead to restlessness or difficulty with commitment. Learning to appreciate stability while satisfying your need for variety is key to finding lasting happiness and meaningful relationships.",
    6: "Life Path 6 individuals are the natural nurturers and healers, driven by a deep sense of responsibility for the well-being of others. Your caring nature extends beyond your immediate family to your community and even humanity as a whole. You have an innate ability to create harmony and beauty in your environment, often serving as the emotional anchor for those around you. Your protective instincts are strong, and you'll go to great lengths to ensure the safety and happiness of your loved ones. You excel in caregiving professions, teaching, counseling, or any role that allows you to serve others. However, your tendency to put others' needs before your own can lead to resentment or burnout. Learning to care for yourself with the same dedication you show others is essential for maintaining your ability to help and heal.",
    7: "As a Life Path 7, you are the seeker of truth and wisdom, blessed with a natural inclination toward deep thinking and spiritual understanding. Your analytical mind constantly questions the mysteries of life, seeking to understand the deeper meaning behind surface appearances. You prefer quality over quantity in relationships, choosing a few deep, meaningful connections over superficial social interactions. Your intuitive abilities are highly developed, often providing insights that seem to come from beyond ordinary understanding. You're naturally drawn to research, investigation, spiritual studies, or any field that allows you to explore life's deeper mysteries. However, your introspective nature can sometimes lead to isolation or overthinking. Learning to balance your need for solitude with meaningful human connection will help you share your wisdom with the world.",
    8: "Life Path 8 represents material mastery and the achievement of substantial success in the physical world. Your natural business acumen and executive abilities set you apart as someone capable of building and managing large-scale enterprises. You understand the value of hard work, strategic planning, and calculated risks in achieving your ambitious goals. Your desire for material security and success drives you to excel in competitive environments. You have the rare ability to see the big picture while managing the practical details necessary for success. However, your focus on material achievement can sometimes overshadow your spiritual and emotional needs. Learning to balance your material ambitions with personal relationships and inner fulfillment is crucial for true satisfaction and lasting success in all areas of life.",
    9: "As a Life Path 9, you are the humanitarian and global thinker, blessed with a broad perspective that encompasses all of humanity. Your compassionate nature and generous spirit drive you to work for causes that benefit the greater good. You have a natural understanding of universal principles and the interconnectedness of all life. Your artistic and creative abilities often serve as vehicles for expressing your humanitarian ideals and inspiring others to create positive change. You're naturally drawn to careers in service, the arts, teaching, or any field that allows you to make a meaningful difference in the world. However, your idealistic nature can sometimes lead to disappointment when others don't share your vision. Learning to accept human imperfections while maintaining your high ideals will help you create the positive change you envision.",
    11: "Master Number 11 carries the highest spiritual vibration, marking you as an individual with extraordinary intuitive and psychic abilities. You serve as a spiritual messenger, bringing illumination and inspiration to others through your heightened awareness and sensitivity. Your intuitive insights often come in the form of sudden flashes of understanding or prophetic dreams that guide both yourself and others. You have the potential to be a great teacher, healer, or spiritual leader, helping others awaken to their own spiritual potential. Your nervous system is highly sensitive, making you receptive to subtle energies and vibrations that others miss. However, this sensitivity can also make you prone to anxiety and emotional overwhelm. Learning to ground your spiritual insights in practical application while protecting your sensitive nature is essential for fulfilling your role as a spiritual beacon for others.",
    22: "Master Number 22, known as the Master Builder, represents the highest form of practical achievement combined with spiritual awareness. You have the rare ability to take grand visions and spiritual insights and manifest them into concrete reality that benefits humanity on a large scale. Your organizational skills are exceptional, allowing you to coordinate complex projects and bring together diverse resources to achieve seemingly impossible goals. You understand both the material and spiritual aspects of creation, making you capable of building lasting institutions, movements, or innovations that serve the greater good. Your potential for achievement is virtually unlimited when you align your practical skills with your spiritual purpose. However, the pressure of your potential can sometimes feel overwhelming. Learning to take your grand visions one step at a time while maintaining faith in your abilities is crucial for realizing your extraordinary potential.",
    33: "Master Number 33, the Master Teacher, represents the highest expression of nurturing and healing energy combined with spiritual wisdom. You are called to serve humanity through teaching, healing, and raising the consciousness of those around you. Your compassionate nature is extraordinary, often putting the needs of others and the greater good before your own personal desires. You have the ability to see the divine potential in every person and situation, inspiring others to reach their highest possibilities. Your teaching abilities extend beyond traditional education to include healing, counseling, and spiritual guidance. You naturally attract people who are seeking healing and transformation. However, the weight of always being 'on' for others can be exhausting. Learning to balance your service to others with your own need for rest and renewal is essential for maintaining your ability to be the beacon of light and wisdom that the world needs."
  };
  
  return meanings[number] || "This is a rare number that requires personal interpretation based on your unique life circumstances and spiritual journey. Consider consulting with an experienced numerologist for deeper insights.";
};
