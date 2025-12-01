export interface EnglishReadingPassage {
  id: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  text: string;
  culturalContext: string;
}

export const englishPassages: EnglishReadingPassage[] = [
  {
    id: '1',
    level: 'beginner',
    title: 'The Magic Garden',
    text: `Once upon a time, there was a beautiful garden behind an old house. The garden was full of colorful flowers and tall trees. Every morning, children would come to play in this magical place.

The garden had a small pond with fish swimming in it. Birds would sing sweet songs from the branches above. The children loved to sit under the big oak tree and tell stories to each other.

One day, they discovered a hidden path that led to a secret corner of the garden. There, they found the most beautiful roses they had ever seen. From that day on, the garden became their favorite place to spend time together.`,
    culturalContext: 'A simple story about friendship and discovery, perfect for beginners learning English',
  },
  {
    id: '2',
    level: 'beginner',
    title: 'The North Wind and the Sun',
    text: `The North Wind and the Sun were disputing which was the stronger, when a traveller came along wrapped in a warm cloak. They agreed that the one who first succeeded in making the traveller take his cloak off should be considered stronger than the other.

Then the North Wind blew as hard as he could, but the more he blew the more closely did the traveller fold his cloak around him, and at last the North Wind gave up the attempt. Then the Sun shone out warmly, and immediately the traveller took off his cloak.

And so the North Wind was obliged to confess that the Sun was the stronger of the two.`,
    culturalContext: 'Classic Aesop\'s fable teaching the moral that gentleness and warmth accomplish more than force',
  },
  {
    id: '3',
    level: 'intermediate',
    title: 'My Grandfather',
    text: `You wished to know all about my grandfather. Well, he is nearly ninety three years old; he dresses himself in an ancient black frock coat, usually minus several buttons; yet he still thinks as swiftly as ever. A long, flowing beard clings to his chin, giving those who observe him a pronounced feeling of the utmost respect.

When he speaks, his voice is just a bit cracked and quivers a trifle. Twice each day he plays skilfully and with zest upon our small organ. Except in the winter when the ooze or snow or ice prevents, he slowly takes a short walk in the open air each day.

We have often urged him to walk more and smoke less, but he always answers, "Banana oil!" Grandfather likes to be modern in his language.`,
    culturalContext: 'Descriptive passage about an elderly family member, showcasing character description and family relationships',
  },
  {
    id: '4',
    level: 'intermediate',
    title: 'The Art of Communication',
    text: `Communication is one of the most important skills we can develop. It's not just about speaking clearly, but also about listening carefully and understanding others. Good communication helps us build strong relationships and succeed in our personal and professional lives.

When we communicate effectively, we share our thoughts and feelings in a way that others can understand. This includes using the right words, speaking at the right pace, and paying attention to body language. It's like a dance where both people need to move together.

Practice makes perfect when it comes to communication. The more we practice speaking and listening, the better we become at expressing ourselves clearly and understanding what others are trying to say.`,
    culturalContext: 'Educational content about the importance of communication skills in modern life',
  },
  {
    id: '5',
    level: 'advanced',
    title: 'Technology and Human Connection',
    text: `In our rapidly evolving digital age, technology has transformed the way we communicate and connect with others. While social media and instant messaging have made it easier to stay in touch across distances, they have also raised important questions about the quality of our human connections.

The paradox of our time is that we are more connected than ever before, yet many people report feeling more isolated. Virtual interactions, while convenient, often lack the depth and nuance of face-to-face communication. The subtle cues of body language, tone of voice, and emotional context that enrich our conversations are often lost in digital exchanges.

However, technology also offers unprecedented opportunities for global collaboration and cultural exchange. Video conferencing has enabled international business partnerships, online education has democratized learning, and social platforms have given voice to marginalized communities worldwide.

The challenge lies in finding balance - leveraging technology's benefits while preserving the authentic human connections that give meaning to our lives. As we navigate this digital landscape, we must remember that the most powerful technology is still the human voice, capable of conveying empathy, understanding, and genuine care across any medium.`,
    culturalContext: 'Analysis of modern communication challenges and opportunities in the digital age',
  },
  {
    id: '6',
    level: 'intermediate',
    title: 'The Rainbow',
    text: `When the sunlight strikes raindrops in the air, they act as a prism and form a rainbow. The rainbow is a division of white light into many beautiful colors. These take the shape of a long round arch, with its path high above, and its two ends apparently beyond the horizon. There is, according to legend, a boiling pot of gold at one end. People look, but no one ever finds it. When a man looks for something beyond his reach, his friends say he is looking for the pot of gold at the end of the rainbow.

Throughout the centuries people have explained the rainbow in various ways. Some have accepted it as a miracle without physical explanation. To the Hebrews it was a token that there would be no more universal floods. The Greeks used to imagine that it was a sign from the gods to foretell war or heavy rain. The Norsemen considered the rainbow as a bridge over which the gods passed from earth to their home in the sky.

Others have tried to explain the phenomenon physically. Aristotle thought that the rainbow was caused by reflection of the sun's rays by the rain. Since then physicists have found that it is not reflection, but refraction by the raindrops which causes the rainbows. Many complicated ideas about the rainbow have been formed. The difference in the rainbow depends considerably upon the size of the drops, and the width of the colored band increases as the size of the drops increases.

The actual primary rainbow observed is said to be the effect of superimposition of a number of bows. If the red of the second bow falls upon the green of the first, the result is to give a bow with an abnormally wide yellow band, since red and green light when mixed form yellow. This is a very common type of bow, one showing mainly red and yellow, with little or no green or blue.`,
    culturalContext: 'Scientific explanation of rainbows combining physics with cultural legends and mythology',
  },
  
];

export interface EnglishConversationPrompt {
  id: string;
  category: string;
  title: string;
  description: string;
  prompts: string[];
  culturalContext: string;
}



export const englishConversationPrompts: EnglishConversationPrompt[] = [
  {
    id: '1',
    category: 'family',
    title: 'Family Dinner Conversations',
    description: 'Share about your family dinner experiences',
    prompts: [
      'Tell me about your family dinner routine. What do you usually eat together?',
      'What is your favorite family meal and how is it prepared?',
      'What special dishes does your family make for celebrations?'
    ],
    culturalContext: 'Family dining traditions and food culture in English-speaking countries',
  },
  {
    id: '2',
    category: 'work',
    title: 'Professional Life',
    description: 'Discuss your work experiences and career',
    prompts: [
      'Tell me about your job. What do you do for a living?',
      'What is the work environment like in your office?',
      'What challenges do you face in your professional life?'
    ],
    culturalContext: 'Modern workplace culture and professional development in English-speaking countries',
  },
  {
    id: '3',
    category: 'travel',
    title: 'Travel Experiences',
    description: 'Share your travel stories and experiences',
    prompts: [
      'Tell me about your favorite travel destination. What made it special?',
      'What is the most interesting place you have visited?',
      'What cultural differences did you notice while traveling?'
    ],
    culturalContext: 'Travel experiences and cultural exchange in international contexts',
  },
  {
    id: '4',
    category: 'hobbies',
    title: 'Personal Interests',
    description: 'Discuss your hobbies and personal interests',
    prompts: [
      'What are your favorite hobbies and why do you enjoy them?',
      'How did you get started with your current hobby?',
      'What new skills would you like to learn?'
    ],
    culturalContext: 'Personal development and leisure activities in English-speaking communities',
  },
];

export interface EnglishCulturalImage {
  id: string;
  url: string;
  englishName: string;
  description: string;
  category: string;
}

export const englishCulturalImages: EnglishCulturalImage[] = [
  {
    id: '1',
    url: '/api/dataset-images/A1.jpg',
    englishName: 'Apple',
    description: 'A red apple fruit for English practice',
    category: 'fruits',
  },
  {
    id: '2',
    url: '/api/dataset-images/C1.jpg',
    englishName: 'Cat',
    description: 'A domestic cat for English practice',
    category: 'animals',
  },
  {
    id: '3',
    url: '/api/dataset-images/F1.jpg',
    englishName: 'Fish',
    description: 'A fish in water for English practice',
    category: 'animals',
  },
  {
    id: '4',
    url: '/api/dataset-images/V1 Cycle.jpg',
    englishName: 'Bicycle',
    description: 'A bicycle for riding',
    category: 'vehicles',
  },
];
