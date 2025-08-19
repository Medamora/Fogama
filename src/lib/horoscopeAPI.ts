// Real Horoscope API Integration and Enhanced Generation System
// Provides accurate, detailed horoscope readings with fallback generation

interface HoroscopeResponse {
  daily?: string;
  monthly?: string;
  yearly?: string;
  error?: string;
}

interface DetailedHoroscope {
  general: string;
  love: string;
  career: string;
  health: string;
  lucky_numbers: number[];
  lucky_color: string;
  mood: string;
  compatibility: string;
}

// Enhanced horoscope templates by sign and period
const ENHANCED_HOROSCOPES = {
  aries: {
    daily: [
      "Today your natural leadership qualities shine brightly. Mars, your ruling planet, energizes your ambitions and propels you toward new opportunities. Take initiative in both personal and professional matters - your courage will be rewarded. However, remember to balance your assertiveness with patience when dealing with others who may not share your rapid pace.",
      "Your pioneering spirit is especially strong today. You may find yourself drawn to start something new or take on a challenge that others would shy away from. Trust your instincts, but also consider seeking advice from trusted friends before making major decisions. Your enthusiasm is infectious - use it to inspire others.",
      "The fire element within you burns particularly bright today, filling you with energy and determination. This is an excellent time for physical activities, competitions, or pushing forward with projects that require courage and initiative. Be mindful not to rush into situations without proper planning.",
      "Today brings opportunities to demonstrate your natural ability to lead and inspire others. Your confidence is magnetic, drawing people toward your vision and ideas. However, take care not to become impatient with those who need more time to process decisions. Your quick thinking is an asset, but so is your ability to bring others along on your journey."
    ],
    monthly: [
      "This month marks a significant period of personal growth and new beginnings. As the first sign of the zodiac, you're naturally equipped to handle the fresh energies coming your way. Your ruling planet Mars activates your ambition sector, bringing opportunities for advancement in career or personal projects. The key is to channel your natural impatience into productive action while maintaining consideration for others' timelines and perspectives.",
      "Mars influences create dynamic energy patterns throughout this month, making it ideal for launching new ventures or taking bold steps toward your goals. Your natural leadership abilities are highlighted, and others will look to you for direction and inspiration. However, be mindful of your tendency toward impulsiveness - successful outcomes require balancing quick action with strategic thinking.",
      "This month emphasizes your cardinal fire energy, making you a catalyst for change in your environment. Professional opportunities may arise that allow you to showcase your innovative ideas and leadership skills. Personal relationships benefit from your straightforward, honest approach, though you may need to practice patience with partners or family members who prefer a more measured pace."
    ],
    yearly: [
      "This year represents a major turning point in your personal evolution as an Aries. Your natural pioneering spirit will be tested and refined through various challenges and opportunities that push you to grow beyond your comfort zone. The themes of leadership, independence, and courageous action will dominate your experiences, helping you develop a more mature and effective approach to achieving your goals.",
      "The cosmic energies this year support your innate desire to be first and to lead others toward new possibilities. You'll find yourself in situations that require quick thinking, bold action, and the kind of courage that only comes naturally to fire signs like yourself. However, the lessons this year will also teach you the value of collaboration and the power that comes from inspiring others rather than simply charging ahead alone."
    ]
  },
  taurus: {
    daily: [
      "Venus, your ruling planet, brings harmony and beauty into your day. Focus on creating stability and enjoying life's simple pleasures. Your practical nature helps you make sound decisions, especially regarding financial matters or long-term investments. Take time to appreciate the beauty around you and nurture your relationships with patience and kindness.",
      "Your earth element grounds you in practical wisdom today. This is an excellent time for making progress on projects that require patience and persistence. Trust your ability to build something lasting and meaningful. Your natural sensuality and appreciation for quality may draw you toward art, music, or gourmet experiences.",
      "Today emphasizes your gift for creating security and comfort for yourself and your loved ones. Your steady, reliable nature is exactly what's needed in current situations. Don't let others rush you into decisions - your careful consideration will lead to better outcomes than hasty choices.",
      "The influence of Venus enhances your natural charm and magnetism today. Others are drawn to your calm, stable presence and your ability to make them feel secure. This is a favorable time for negotiations, artistic endeavors, or any activity that requires patience and attention to detail."
    ],
    monthly: [
      "This month highlights your natural ability to build lasting foundations in all areas of life. Venus, your ruling planet, supports your efforts to create beauty, security, and stability. Financial matters are particularly favored - your practical approach to money management and investment will yield positive results. Focus on projects that require patience and persistence rather than quick fixes.",
      "Your earth sign qualities are especially strong this month, making it an ideal time for practical achievements and steady progress toward your goals. Your appreciation for beauty and quality guides you toward investments and purchases that will stand the test of time. In relationships, your loyal and dependable nature strengthens bonds with those you care about most.",
      "The planetary influences this month support your desire for security and your ability to manifest tangible results through consistent effort. Your natural resistance to change serves you well when others are being swept up in temporary trends or hasty decisions. Trust your instincts about what will last and what won't."
    ],
    yearly: [
      "This year brings significant opportunities to build the kind of lasting security and stability that truly matters to you as a Taurus. Your natural ability to take your time, consider all options, and choose quality over quantity will be your greatest asset. The cosmic energies support your efforts to create something beautiful and enduring, whether in your career, relationships, or personal environment.",
      "Venus influences throughout the year emphasize your connection to beauty, harmony, and material well-being. You'll find yourself drawn to opportunities that allow you to express your aesthetic sense and your practical wisdom. This is a year for making investments - both financial and emotional - that will yield benefits for years to come."
    ]
  },
  // Add more signs with similar detailed content...
  gemini: {
    daily: [
      "Mercury, your ruling planet, accelerates your mental processes and communication abilities today. Your natural curiosity leads you to interesting discoveries and meaningful connections. This is an excellent day for learning, teaching, writing, or any activity that engages your quick wit and versatility. Embrace your ability to see multiple perspectives.",
      "Your air element brings mental clarity and social opportunities. Conversations flow easily, and you may find yourself serving as a bridge between different people or ideas. Your adaptability is your strength today - be ready to shift gears as new information or opportunities arise.",
      "Today highlights your gift for communication and your ability to understand complex ideas quickly. Your mercurial nature helps you navigate changing circumstances with grace and intelligence. Consider how you can use your natural networking abilities to benefit both yourself and others."
    ],
    monthly: [
      "Mercury influences create a month of mental stimulation, learning opportunities, and enhanced communication. Your natural versatility allows you to juggle multiple projects successfully. This is an ideal time for writing, studying, teaching, or launching communication-based ventures. Your ability to see connections others miss gives you a significant advantage.",
      "This month emphasizes your mutable air qualities, making you especially adaptable to changing circumstances. Your curiosity leads you to explore new subjects, meet interesting people, and discover innovative solutions to ongoing challenges. Trust your ability to synthesize information from various sources into coherent insights."
    ],
    yearly: [
      "This year activates your natural intellectual gifts and communication abilities in profound ways. Mercury's influences throughout the year support learning, teaching, writing, and all forms of mental exploration. Your versatility and adaptability will be key assets as you navigate a year filled with diverse opportunities and interesting challenges.",
      "The cosmic patterns favor your Gemini nature - your ability to think quickly, communicate effectively, and adapt to changing circumstances. This is a year for expanding your knowledge, building networks, and using your natural gift for bringing people and ideas together."
    ]
  }
  // Continue with other signs...
};

// Fallback horoscope generation with more sophisticated content
export class HoroscopeGenerator {
  private static instance: HoroscopeGenerator;
  private lastFetch: { [key: string]: number } = {};
  private cache: { [key: string]: any } = {};

  static getInstance(): HoroscopeGenerator {
    if (!HoroscopeGenerator.instance) {
      HoroscopeGenerator.instance = new HoroscopeGenerator();
    }
    return HoroscopeGenerator.instance;
  }

  // Generate detailed horoscope with multiple aspects
  generateDetailedHoroscope(sign: string, period: 'daily' | 'monthly' | 'yearly'): DetailedHoroscope {
    const signLower = sign.toLowerCase();
    const horoscopes = ENHANCED_HOROSCOPES[signLower as keyof typeof ENHANCED_HOROSCOPES];
    
    if (!horoscopes) {
      return this.generateFallbackHoroscope(sign, period);
    }

    const templates = horoscopes[period];
    const general = templates[Math.floor(Math.random() * templates.length)];

    return {
      general,
      love: this.generateLoveHoroscope(signLower, period),
      career: this.generateCareerHoroscope(signLower, period),
      health: this.generateHealthHoroscope(signLower, period),
      lucky_numbers: this.generateLuckyNumbers(),
      lucky_color: this.getLuckyColor(signLower),
      mood: this.getMoodPrediction(signLower),
      compatibility: this.getCompatibilitySign(signLower)
    };
  }

  // Try to fetch from real API with fallback
  async fetchHoroscope(sign: string, period: 'daily' | 'monthly' | 'yearly'): Promise<string> {
    const cacheKey = `${sign}-${period}`;
    const now = Date.now();
    
    // Check cache (valid for 1 hour for daily, 1 day for monthly, 1 week for yearly)
    const cacheExpiry = period === 'daily' ? 3600000 : period === 'monthly' ? 86400000 : 604800000;
    
    if (this.cache[cacheKey] && (now - this.lastFetch[cacheKey]) < cacheExpiry) {
      return this.cache[cacheKey];
    }

    try {
      // Try multiple API endpoints
      const result = await this.tryMultipleAPIs(sign, period);
      
      if (result) {
        this.cache[cacheKey] = result;
        this.lastFetch[cacheKey] = now;
        return result;
      }
    } catch (error) {
      console.warn('Horoscope API failed, using enhanced generation:', error);
    }

    // Fallback to enhanced generation
    const detailed = this.generateDetailedHoroscope(sign, period);
    this.cache[cacheKey] = detailed.general;
    this.lastFetch[cacheKey] = now;
    
    return detailed.general;
  }

  // Try multiple horoscope APIs
  private async tryMultipleAPIs(sign: string, period: string): Promise<string | null> {
    const apis = [
      // Primary API attempt (Aztro - free but limited)
      async () => {
        if (period !== 'daily') return null; // Aztro only supports daily
        
        const response = await fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`, {
          method: 'POST'
        });
        
        if (response.ok) {
          const data = await response.json();
          return data.description;
        }
        return null;
      },
      
      // Secondary API (Horoscope API - if available)
      async () => {
        try {
          const response = await fetch(`https://api.horoscope-ai.com/v1/get-horoscope/${period}?sign=${sign}`);
          if (response.ok) {
            const data = await response.json();
            return data.horoscope;
          }
        } catch {
          return null;
        }
        return null;
      }
    ];

    // Try each API
    for (const apiCall of apis) {
      try {
        const result = await apiCall();
        if (result) return result;
      } catch (error) {
        console.warn('API call failed:', error);
        continue;
      }
    }

    return null;
  }

  // Generate specialized horoscope content
  private generateLoveHoroscope(sign: string, period: string): string {
    const loveTemplates: { [key: string]: string[] } = {
      aries: [
        "Your passionate nature attracts romantic opportunities. Be bold in expressing your feelings, but remember that love requires patience and compromise.",
        "Mars energy intensifies your romantic desires. Single Aries may meet someone who matches their energy, while partnered Aries should focus on balancing independence with intimacy."
      ],
      taurus: [
        "Venus blesses your love life with stability and deeper connections. Focus on building lasting bonds through shared experiences and consistent affection.",
        "Your sensual nature is heightened, making this an ideal time for romantic gestures and intimate conversations with your partner."
      ]
      // Add more signs...
    };

    const templates = loveTemplates[sign] || ["Love energies are flowing positively in your direction."];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private generateCareerHoroscope(sign: string, period: string): string {
    const careerTemplates: { [key: string]: string[] } = {
      aries: [
        "Your leadership qualities are in the spotlight. Take initiative on projects and don't be afraid to pitch your innovative ideas to superiors.",
        "Career momentum builds as your natural pioneering spirit opens new professional pathways."
      ],
      taurus: [
        "Steady progress and practical decisions lead to career stability. Your reliable nature earns recognition from colleagues and supervisors.",
        "Financial opportunities related to your career may arise. Trust your practical instincts when making professional decisions."
      ]
      // Add more signs...
    };

    const templates = careerTemplates[sign] || ["Professional opportunities align with your natural talents."];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private generateHealthHoroscope(sign: string, period: string): string {
    const healthTemplates: { [key: string]: string[] } = {
      aries: [
        "Your high energy levels serve you well, but remember to balance activity with rest. Physical exercise helps channel your Mars-ruled vitality positively.",
        "Headaches or stress-related tension may arise from your fast-paced lifestyle. Practice mindfulness and ensure adequate sleep."
      ],
      taurus: [
        "Focus on maintaining steady, sustainable health routines. Your earth sign nature benefits from regular exercise and nutritious, satisfying meals.",
        "Throat, neck, or voice issues may need attention. Your Venus-ruled sign benefits from gentle, enjoyable forms of self-care."
      ]
      // Add more signs...
    };

    const templates = healthTemplates[sign] || ["Listen to your body's natural rhythms and needs."];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private generateLuckyNumbers(): number[] {
    const numbers: number[] = [];
    while (numbers.length < 5) {
      const num = Math.floor(Math.random() * 49) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers.sort((a, b) => a - b);
  }

  private getLuckyColor(sign: string): string {
    const colors: { [key: string]: string[] } = {
      aries: ['Red', 'Orange', 'Crimson'],
      taurus: ['Green', 'Pink', 'Earth tones'],
      gemini: ['Yellow', 'Silver', 'Light Blue'],
      cancer: ['Silver', 'Sea Blue', 'White'],
      leo: ['Gold', 'Orange', 'Royal Purple'],
      virgo: ['Navy Blue', 'Grey', 'Brown'],
      libra: ['Pink', 'Light Blue', 'Lavender'],
      scorpio: ['Deep Red', 'Black', 'Maroon'],
      sagittarius: ['Purple', 'Turquoise', 'Orange'],
      capricorn: ['Black', 'Dark Green', 'Brown'],
      aquarius: ['Electric Blue', 'Silver', 'Aqua'],
      pisces: ['Sea Green', 'Purple', 'Aqua']
    };

    const signColors = colors[sign] || ['Blue'];
    return signColors[Math.floor(Math.random() * signColors.length)];
  }

  private getMoodPrediction(sign: string): string {
    const moods = ['Energetic', 'Contemplative', 'Optimistic', 'Focused', 'Creative', 'Balanced', 'Inspired', 'Determined'];
    return moods[Math.floor(Math.random() * moods.length)];
  }

  private getCompatibilitySign(sign: string): string {
    const compatibility: { [key: string]: string[] } = {
      aries: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
      taurus: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
      gemini: ['Libra', 'Aquarius', 'Aries', 'Leo'],
      cancer: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
      leo: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
      virgo: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
      libra: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
      scorpio: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
      sagittarius: ['Aries', 'Leo', 'Libra', 'Aquarius'],
      capricorn: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
      aquarius: ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
      pisces: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn']
    };

    const compatibleSigns = compatibility[sign] || ['All signs'];
    return compatibleSigns[Math.floor(Math.random() * compatibleSigns.length)];
  }

  private generateFallbackHoroscope(sign: string, period: string): DetailedHoroscope {
    return {
      general: `The cosmic energies align favorably for ${sign} during this ${period} period. Trust your instincts and remain open to new opportunities.`,
      love: "Romantic energies flow positively. Focus on communication and understanding.",
      career: "Professional opportunities may arise. Stay focused on your goals.",
      health: "Pay attention to your body's needs and maintain balance.",
      lucky_numbers: this.generateLuckyNumbers(),
      lucky_color: this.getLuckyColor(sign.toLowerCase()),
      mood: this.getMoodPrediction(sign.toLowerCase()),
      compatibility: this.getCompatibilitySign(sign.toLowerCase())
    };
  }
}

// Export singleton instance and helper functions
export const horoscopeGenerator = HoroscopeGenerator.getInstance();

export const getHoroscope = async (sign: string, period: 'daily' | 'monthly' | 'yearly'): Promise<string> => {
  return await horoscopeGenerator.fetchHoroscope(sign, period);
};

export const getDetailedHoroscope = (sign: string, period: 'daily' | 'monthly' | 'yearly'): DetailedHoroscope => {
  return horoscopeGenerator.generateDetailedHoroscope(sign, period);
};

// Compatibility function
export const getZodiacCompatibility = (sign1: string, sign2: string): { score: number; description: string } => {
  const compatibilityScores: { [key: string]: number } = {
    'aries-leo': 95, 'aries-sagittarius': 90, 'aries-gemini': 85, 'aries-aquarius': 80,
    'taurus-virgo': 95, 'taurus-capricorn': 90, 'taurus-cancer': 85, 'taurus-pisces': 80,
    'gemini-libra': 95, 'gemini-aquarius': 90, 'gemini-aries': 85, 'gemini-leo': 80,
    'cancer-scorpio': 95, 'cancer-pisces': 90, 'cancer-taurus': 85, 'cancer-virgo': 80,
    'leo-aries': 95, 'leo-sagittarius': 90, 'leo-gemini': 85, 'leo-libra': 80,
    'virgo-taurus': 95, 'virgo-capricorn': 90, 'virgo-cancer': 85, 'virgo-scorpio': 80,
    'libra-gemini': 95, 'libra-aquarius': 90, 'libra-leo': 85, 'libra-sagittarius': 80,
    'scorpio-cancer': 95, 'scorpio-pisces': 90, 'scorpio-virgo': 85, 'scorpio-capricorn': 80,
    'sagittarius-aries': 95, 'sagittarius-leo': 90, 'sagittarius-libra': 85, 'sagittarius-aquarius': 80,
    'capricorn-taurus': 95, 'capricorn-virgo': 90, 'capricorn-scorpio': 85, 'capricorn-pisces': 80,
    'aquarius-gemini': 95, 'aquarius-libra': 90, 'aquarius-aries': 85, 'aquarius-sagittarius': 80,
    'pisces-cancer': 95, 'pisces-scorpio': 90, 'pisces-taurus': 85, 'pisces-capricorn': 80
  };

  const key1 = `${sign1.toLowerCase()}-${sign2.toLowerCase()}`;
  const key2 = `${sign2.toLowerCase()}-${sign1.toLowerCase()}`;
  
  const score = compatibilityScores[key1] || compatibilityScores[key2] || 50;
  
  let description = '';
  if (score >= 90) description = 'Exceptional compatibility - a match made in the stars!';
  else if (score >= 80) description = 'Excellent compatibility - you complement each other beautifully.';
  else if (score >= 70) description = 'Good compatibility - with effort, this can be wonderful.';
  else if (score >= 60) description = 'Moderate compatibility - communication is key.';
  else description = 'Challenging compatibility - requires patience and understanding.';

  return { score, description };
};