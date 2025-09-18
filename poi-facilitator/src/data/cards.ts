// Points of You Card Data with Images
// This file contains all the card definitions with their corresponding images

export interface Card {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'visual' | 'concept' | 'action' | 'reflection';
  themes: string[];
  gradient: string; // Fallback gradient for when image is loading
  keywords: string[];
  inspirationStory?: string;
}

// Map of available card images
export const cardImages = {
  back: '/cards/back.png',
  balance: '/cards/Balance.png',
  calling: '/cards/Calling.png',
  choice: '/cards/Choice.png',
  devotion: '/cards/Devotion.png',
  everything_is_possible: '/cards/Everything_is_possible.png',
  intimacy: '/cards/Intimacy.png',
  just_be: '/cards/Just_be.png',
  leadership: '/cards/Leadership.png',
  learning: '/cards/Learning.png',
  points_of_view: '/cards/Opints_of_view.png',
  pause: '/cards/Pause.png',
  should_be: '/cards/Should_be.png',
  solutions: '/cards/Solutions.png',
  success: '/cards/Success.png',
} as const;

// Complete card definitions using available images
export const allCards: Card[] = [
  {
    id: 'balance',
    title: 'Balance',
    description: 'Finding equilibrium between different aspects of life',
    image: cardImages.balance,
    category: 'reflection',
    themes: ['harmony', 'stability', 'equilibrium', 'life-work balance'],
    gradient: 'from-blue-500 to-green-500',
    keywords: ['balance', 'harmony', 'stability', 'center'],
    inspirationStory: 'Like a tightrope walker, balance is not about standing still, but about constant small adjustments that keep us moving forward.'
  },
  {
    id: 'calling',
    title: 'Calling',
    description: 'Discovering your true purpose and inner voice',
    image: cardImages.calling,
    category: 'reflection',
    themes: ['purpose', 'vocation', 'inner voice', 'destiny'],
    gradient: 'from-purple-500 to-pink-500',
    keywords: ['calling', 'purpose', 'destiny', 'vocation'],
    inspirationStory: 'Your calling is not just what you do, but who you become in the process of answering it.'
  },
  {
    id: 'choice',
    title: 'Choice',
    description: 'The power of decision and taking responsibility',
    image: cardImages.choice,
    category: 'action',
    themes: ['decision', 'responsibility', 'freedom', 'crossroads'],
    gradient: 'from-orange-500 to-red-500',
    keywords: ['choice', 'decision', 'crossroads', 'freedom'],
    inspirationStory: 'Every choice is a doorway. Some lead to familiar rooms, others to adventures you never imagined.'
  },
  {
    id: 'devotion',
    title: 'Devotion',
    description: 'Deep commitment and dedication to what matters',
    image: cardImages.devotion,
    category: 'reflection',
    themes: ['commitment', 'dedication', 'loyalty', 'love'],
    gradient: 'from-red-500 to-pink-600',
    keywords: ['devotion', 'commitment', 'dedication', 'loyalty'],
    inspirationStory: 'Devotion is not about perfection, but about showing up consistently with love and intention.'
  },
  {
    id: 'everything_is_possible',
    title: 'Everything is Possible',
    description: 'Unlimited potential and boundless opportunities',
    image: cardImages.everything_is_possible,
    category: 'concept',
    themes: ['potential', 'possibility', 'optimism', 'limitless'],
    gradient: 'from-yellow-400 to-orange-500',
    keywords: ['possibility', 'potential', 'limitless', 'opportunity'],
    inspirationStory: 'The moment you believe everything is possible, you open the door to miracles that were always waiting for you.'
  },
  {
    id: 'intimacy',
    title: 'Intimacy',
    description: 'Deep connection and authentic relationships',
    image: cardImages.intimacy,
    category: 'reflection',
    themes: ['connection', 'vulnerability', 'authenticity', 'relationships'],
    gradient: 'from-pink-500 to-rose-500',
    keywords: ['intimacy', 'connection', 'vulnerability', 'closeness'],
    inspirationStory: 'True intimacy begins when we have the courage to be completely ourselves with another person.'
  },
  {
    id: 'just_be',
    title: 'Just Be',
    description: 'The art of presence and mindful existence',
    image: cardImages.just_be,
    category: 'reflection',
    themes: ['presence', 'mindfulness', 'acceptance', 'being'],
    gradient: 'from-green-400 to-blue-500',
    keywords: ['being', 'presence', 'mindfulness', 'now'],
    inspirationStory: 'In a world obsessed with doing, the radical act is simply to be. In being, we find everything we were searching for.'
  },
  {
    id: 'leadership',
    title: 'Leadership',
    description: 'Guiding others and taking initiative',
    image: cardImages.leadership,
    category: 'action',
    themes: ['guidance', 'initiative', 'influence', 'responsibility'],
    gradient: 'from-indigo-500 to-purple-600',
    keywords: ['leadership', 'guide', 'influence', 'responsibility'],
    inspirationStory: 'Leadership is not about being in charge. It is about taking care of those in your charge.'
  },
  {
    id: 'learning',
    title: 'Learning',
    description: 'Growth through curiosity and experience',
    image: cardImages.learning,
    category: 'concept',
    themes: ['growth', 'curiosity', 'knowledge', 'development'],
    gradient: 'from-blue-500 to-indigo-600',
    keywords: ['learning', 'growth', 'curiosity', 'knowledge'],
    inspirationStory: 'Every master was once a disaster. Learning is the bridge between where you are and where you want to be.'
  },
  {
    id: 'points_of_view',
    title: 'Points of View',
    description: 'Multiple perspectives and open-mindedness',
    image: cardImages.points_of_view,
    category: 'concept',
    themes: ['perspective', 'understanding', 'empathy', 'diversity'],
    gradient: 'from-teal-500 to-cyan-600',
    keywords: ['perspective', 'viewpoint', 'understanding', 'empathy'],
    inspirationStory: 'The world changes not when we see new landscapes, but when we see with new eyes.'
  },
  {
    id: 'pause',
    title: 'Pause',
    description: 'Taking time to reflect and breathe',
    image: cardImages.pause,
    category: 'reflection',
    themes: ['reflection', 'rest', 'contemplation', 'stillness'],
    gradient: 'from-slate-500 to-gray-600',
    keywords: ['pause', 'rest', 'reflection', 'stillness'],
    inspirationStory: 'In the space of a pause, wisdom speaks. Sometimes the most powerful action is the conscious choice to be still.'
  },
  {
    id: 'should_be',
    title: 'Should Be',
    description: 'Expectations and ideals we hold',
    image: cardImages.should_be,
    category: 'reflection',
    themes: ['expectations', 'ideals', 'standards', 'judgment'],
    gradient: 'from-amber-500 to-yellow-600',
    keywords: ['should', 'expectations', 'ideals', 'standards'],
    inspirationStory: 'The gap between what is and what should be is where both suffering and transformation live.'
  },
  {
    id: 'solutions',
    title: 'Solutions',
    description: 'Finding answers and creative problem-solving',
    image: cardImages.solutions,
    category: 'action',
    themes: ['problem-solving', 'creativity', 'answers', 'innovation'],
    gradient: 'from-emerald-500 to-green-600',
    keywords: ['solutions', 'answers', 'problem-solving', 'innovation'],
    inspirationStory: 'Every problem carries within it the seeds of its own solution. The key is learning to see with solution-focused eyes.'
  },
  {
    id: 'success',
    title: 'Success',
    description: 'Achievement and reaching your goals',
    image: cardImages.success,
    category: 'concept',
    themes: ['achievement', 'goals', 'accomplishment', 'victory'],
    gradient: 'from-yellow-500 to-orange-600',
    keywords: ['success', 'achievement', 'victory', 'accomplishment'],
    inspirationStory: 'Success is not a destination but a journey of becoming who you were meant to be while serving others.'
  }
];

// Helper functions for card operations
export const getCardById = (id: string): Card | undefined => {
  return allCards.find(card => card.id === id);
};

export const getCardsByCategory = (category: Card['category']): Card[] => {
  return allCards.filter(card => card.category === category);
};

export const getCardsByTheme = (theme: string): Card[] => {
  return allCards.filter(card => card.themes.includes(theme));
};

export const searchCards = (query: string): Card[] => {
  const lowercaseQuery = query.toLowerCase();
  return allCards.filter(card => 
    card.title.toLowerCase().includes(lowercaseQuery) ||
    card.description.toLowerCase().includes(lowercaseQuery) ||
    card.themes.some(theme => theme.toLowerCase().includes(lowercaseQuery)) ||
    card.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
};

export const getRandomCards = (count: number): Card[] => {
  const shuffled = [...allCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, allCards.length));
};

// Card categories for filtering
export const cardCategories = {
  visual: 'Visual Cards',
  concept: 'Concept Cards', 
  action: 'Action Cards',
  reflection: 'Reflection Cards'
} as const;

// Legacy support - mapping old gradient-based cards to new image-based cards
export const legacyCardMapping = {
  'mountain-peak': 'leadership',
  'bridge': 'choice',
  'sunrise': 'everything_is_possible',
  'tree-roots': 'balance',
  'ocean-wave': 'just_be'
} as const;
