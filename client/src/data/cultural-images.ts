export interface CulturalImage {
  id: string;
  url: string;
  kannadaName: string;
  englishName: string;
  category: string;
  description: string;
  culturalSignificance: string;
}

export const culturalImages: CulturalImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop',
    kannadaName: 'ಮಂದಿರ',
    englishName: 'Temple',
    category: 'architecture',
    description: 'ದೇವಾಲಯ - Traditional South Indian temple architecture',
    culturalSignificance: 'Represents spiritual heritage and architectural mastery of Karnataka',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&h=600&fit=crop',
    kannadaName: 'ಇಡ್ಲಿ',
    englishName: 'Idli',
    category: 'food',
    description: 'ಸಾಂಬಾರ್ - Traditional South Indian breakfast',
    culturalSignificance: 'Staple breakfast food representing South Indian culinary traditions',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&h=600&fit=crop',
    kannadaName: 'ಅರಮನೆ',
    englishName: 'Palace',
    category: 'architecture',
    description: 'ಮೈಸೂರು - Mysore Palace illuminated',
    culturalSignificance: 'Symbol of royal heritage and architectural grandeur of Karnataka',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop',
    kannadaName: 'ಕಾಫಿ ತೋಟ',
    englishName: 'Coffee Plantation',
    category: 'agriculture',
    description: 'ಕರ್ನಾಟಕ - Coffee estate in Western Ghats',
    culturalSignificance: 'Represents Karnataka\'s contribution to Indian coffee culture',
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=600&fit=crop',
    kannadaName: 'ರೇಷ್ಮೆ ಸೀರೆ',
    englishName: 'Silk Saree',
    category: 'clothing',
    description: 'ಮೈಸೂರು - Traditional Mysore silk saree',
    culturalSignificance: 'Represents the rich textile heritage of Karnataka',
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    kannadaName: 'ನೃತ್ಯ',
    englishName: 'Dance',
    category: 'performing_arts',
    description: 'ಸಾಂಸ್ಕೃತಿಕ - Traditional Karnataka dance performance',
    culturalSignificance: 'Showcase of Karnataka\'s rich performing arts tradition',
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    kannadaName: 'ಸಮುದ್ರತೀರ',
    englishName: 'Beach',
    category: 'nature',
    description: 'ಮಂಗಳೂರು - Mangalore beach at sunset',
    culturalSignificance: 'Represents the coastal beauty and maritime culture of Karnataka',
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    kannadaName: 'ಕಮಲ',
    englishName: 'Lotus',
    category: 'nature',
    description: 'ಪದ್ಮ - Sacred lotus flower',
    culturalSignificance: 'Symbol of purity and spiritual significance in Indian culture',
  },
];
