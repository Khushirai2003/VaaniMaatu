export interface ReadingPassage {
  id: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  text: string;
  culturalContext: string;
}

export const kannadaPassages: ReadingPassage[] = [
  {
    id: '1',
    level: 'beginner',
    title: 'ಸರಳ ಕಥೆ - ಬ್ರಾಹ್ಮಣನ ಮೂಢನಂಬಿಕೆ',
    text: `ಒಂದು ಊರಿನಲ್ಲಿ ಒಬ್ಬ ಬ್ರಾಹ್ಮಣನಿದ್ದ. ಇವನು ತುಂಬಾ ವಿದ್ಯಾವಂತ, ಗೌರವಸ್ತ. ಆದರೆ ಮೂಢನಂಬಿಕೆಗಳೇ ಇವನಿಗೆ ದೇವರು. ಯಾವುದೇ ವಿಚಾರದಲ್ಲೂ ಮೂಢನಂಬಿಕೆಗಳಿಗೆ ಕಟ್ಟುಬೀಳುತ್ತಿದ್ದ.

ಇದರಿಂದ ಜೀವನದಲ್ಲಿ ಇಲ್ಲದ ತೊಂದರೆಗಳಿಗೆ ಒಳಗಾಗಿದ್ದ. ಇವನು ತಿಂದು ತೇಗಿ ತುಂಬಾ ದಡೂತಿ ಆಗಿದ್ದ. ಎಲ್ಲರು ಇವನನ್ನು ಟೊಣಪ, ಗಣಪ ಎಂದೇ ಕರೆಯುತ್ತಿದ್ದರು.

ಪುಸ್ಕಲವಾದ ಊಟ ಅಂದರೆ ಇವನಿಗೆ ತುಂಬಾ ಇಷ್ಟ. ಯಾರೇ ಊಟಕ್ಕೆ ಕರೆಯಲಿ, ಯಾವುದೇ ಸಮಾರಂಭವಾಗಲಿ ಹಾಜರಾಗುತ್ತಿದ್ದ.`,
    culturalContext: 'Traditional Kannada folklore teaching moral values about superstitions',
  },
  {
    id: '2',
    level: 'intermediate',
    title: 'ಕರ್ನಾಟಕದ ಸಂಸ್ಕೃತಿ',
    text: `ಕರ್ನಾಟಕವು ದಕ್ಷಿಣ ಭಾರತದ ಒಂದು ಪ್ರಮುಖ ರಾಜ್ಯ. ಇಲ್ಲಿನ ಸಂಸ್ಕೃತಿ, ಸಾಹಿತ್ಯ, ಕಲೆ ಎಲ್ಲವೂ ಅತ್ಯಂತ ಶ್ರೀಮಂತವಾದುದು. ಮೈಸೂರು ಅರಮನೆ, ಹಂಪಿಯ ವಿರುಪಾಕ್ಷ ಮಂದಿರ, ಬಾದಾಮಿ ಗುಹೆಗಳು ಇತ್ಯಾದಿ ಐತಿಹಾಸಿಕ ಸ್ಥಳಗಳು ಪ್ರಸಿದ್ಧವಾಗಿವೆ.

ಕರ್ನಾಟಕ ಸಂಗೀತ, ಯಕ್ಷಗಾನ, ಭರತನಾಟ್ಯಂ ಮುಂತಾದ ಕಲಾ ಪ್ರಕಾರಗಳು ಇಲ್ಲಿ ಪ್ರವರ್ಧಮಾನದಲ್ಲಿವೆ. ದಸರಾ, ಉಗಾದಿ, ಕರಗ ಮುಂತಾದ ಹಬ್ಬಗಳು ಬಹು ಆಟೋಸಾಹದಿಂದ ಆಚರಿಸಲಾಗುತ್ತದೆ.`,
    culturalContext: 'Description of Karnataka\'s rich cultural heritage and traditions',
  },
  {
    id: '3',
    level: 'advanced',
    title: 'ಆಧುನಿಕ ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಕನ್ನಡ',
    text: `ಇಂದಿನ ಯುಗದಲ್ಲಿ ತಂತ್ರಜ್ಞಾನದ ಪ್ರಗತಿಯೊಂದಿಗೆ ಕನ್ನಡ ಭಾಷೆಯೂ ಹೊಸ ಆಯಾಮಗಳನ್ನು ತಲುಪುತ್ತಿದೆ. ಕಂಪ್ಯೂಟರ್, ಇಂಟರ್ನೆಟ್, ಮೊಬೈಲ್ ಫೋನ್ ಮುಂತಾದ ಉಪಕರಣಗಳಲ್ಲಿ ಕನ್ನಡ ಬಳಕೆ ಹೆಚ್ಚಾಗುತ್ತಿದೆ.

ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ, ಯಂತ್ರ ಕಲಿಕೆ, ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಮುಂತಾದ ಅಂಶಗಳಲ್ಲಿ ಕನ್ನಡದ ಬಳಕೆಯು ಭಾಷೆಯ ಭವಿಷ್ಯತ್ತಿಗೆ ಹೊಸ ದಾರಿಯನ್ನು ತೋರಿಸುತ್ತಿದೆ. ಈ ರೀತಿಯ ನಾವೀನ್ಯತೆಗಳು ಕನ್ನಡಿಗರ ಗುರುತನ್ನು ಜಾಗತಿಕ ವೇದಿಕೆಯಲ್ಲಿ ಮೆರೆಸುತ್ತಿದೆ.`,
    culturalContext: 'Discussion about modern technology\'s impact on Kannada language and culture',
  },
];

export interface ConversationPrompt {
  id: string;
  category: string;
  title: string;
  description: string;
  prompts: string[];
  culturalContext: string;
}

export const conversationPrompts: ConversationPrompt[] = [
  {
    id: '1',
    category: 'family',
    title: 'ಕುಟುಂಬ ಊಟದ ಬಗ್ಗೆ',
    description: 'ನಿಮ್ಮ ಕುಟುಂಬದ ಊಟದ ವಿವರವನ್ನು ತಿಳಿಸಿ',
    prompts: [
      'ನಿಮ್ಮ ಕುಟುಂಬದೊಂದಿಗೆ ಊಟ ಮಾಡುವ ಬಗ್ಗೆ ಹೇಳಿ. ಸಾಮಾನ್ಯವಾಗಿ ನೀವು ಏನು ತಿನ್ನುತ್ತೀರಿ?',
      'ನಿಮ್ಮ ಅತ್ಯಂತ ಇಷ್ಟದ ಖಾದ್ಯ ಯಾವುದು? ಅದನ್ನು ಹೇಗೆ ತಯಾರಿಸುತ್ತಾರೆ?',
      'ವಿಶೇಷ ದಿನಗಳಲ್ಲಿ ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಯಾವ ವಿಶೇಷ ಅಡುಗೆ ಮಾಡುತ್ತೀರಿ?'
    ],
    culturalContext: 'Traditional family dining customs in Karnataka',
  },
  {
    id: '2',
    category: 'work',
    title: 'ನಿಮ್ಮ ಕೆಲಸದ ಬಗ್ಗೆ',
    description: 'ದೈನಂದಿನ ಕೆಲಸದ ಅನುಭವವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ',
    prompts: [
      'ನಿಮ್ಮ ಕೆಲಸದ ಬಗ್ಗೆ ಹೇಳಿ. ನೀವು ಏನು ಮಾಡುತ್ತೀರಿ?',
      'ನಿಮ್ಮ ಕಛೇರಿಯ ವಾತಾವರಣ ಹೇಗಿದೆ?',
      'ನಿಮ್ಮ ಕೆಲಸದಲ್ಲಿ ಯಾವ ಸವಾಲುಗಳನ್ನು ಎದುರಿಸುತ್ತೀರಿ?'
    ],
    culturalContext: 'Professional life and work culture in modern Karnataka',
  },
  {
    id: '3',
    category: 'festival',
    title: 'ಉಗಾದಿ ಹಬ್ಬ',
    description: 'ಉಗಾದಿ ಆಚರಣೆಯ ವಿವರವನ್ನು ತಿಳಿಸಿ',
    prompts: [
      'ಉಗಾದಿ ಹಬ್ಬವನ್ನು ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಹೇಗೆ ಆಚರಿಸುತ್ತೀರಿ?',
      'ಉಗಾದಿಯ ವಿಶೇಷ ಪದಾರ್ಥಗಳ ಬಗ್ಗೆ ಹೇಳಿ',
      'ಹೊಸ ವರ್ಷದ ಶುಭಾಶಯಗಳು ಮತ್ತು ಸಂಪ್ರದಾಯಗಳ ಬಗ್ಗೆ ವಿವರಿಸಿ'
    ],
    culturalContext: 'Traditional Kannada New Year celebrations and customs',
  },
  {
    id: '4',
    category: 'city',
    title: 'ಮಂಗಳೂರಿನ ಬಗ್ಗೆ',
    description: 'ಮಂಗಳೂರು ನಗರದ ವಿವರವನ್ನು ಹೇಳಿ',
    prompts: [
      'ಮಂಗಳೂರಿನ ಪ್ರಸಿದ್ಧ ಸ್ಥಳಗಳ ಬಗ್ಗೆ ಹೇಳಿ',
      'ಮಂಗಳೂರಿನ ವಿಶೇಷ ಆಹಾರಗಳು ಯಾವವು?',
      'ಮಂಗಳೂರಿನ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಭಾಷೆ ಬಗ್ಗೆ ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ'
    ],
    culturalContext: 'Coastal Karnataka culture and Mangalore city specifics',
  },
];
