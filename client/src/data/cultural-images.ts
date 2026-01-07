export interface CulturalImage {
  id: string;
  url: string;
  kannadaName: string;
  englishName: string;
  category: string;
  description: string;
  culturalSignificance: string;
  pageNumber?: number;
}

// This will be populated dynamically from local dataset
export let culturalImages: CulturalImage[] = [];

// Selected 50 images from the dataset for optimal patient engagement
const selectedDatasetImages = [
  // Animals (10 images)
  'A1.jpg', 'A2.jpg', 'A3.jpg', 'A4.jpg', 'A5.jpg', 'A6.jpg', 'A7.jpg', 'A8.jpg', 'A9.jpg', 'A10.jpg',
  // Fruits (10 images)
  'F1.jpg', 'F2.jpg', 'F3.jpg', 'F4.jpg', 'F5.jpg', 'F6.jpg', 'F7.jpg', 'F8.jpg', 'F9.jpg', 'F10.jpg',
  // Vegetables (10 images)
  'Veg 1.jpg', 'Veg 2.jpg', 'Veg 3.jpg', 'Veg 4.jpg', 'Veg 5.jpg', 'Veg 6.jpg', 'Veg 7.jpg', 'Veg 8.jpg', 'Veg 9.jpg', 'Veg 10.jpg',
  // Vehicles (5 images)
  'V1 Cycle.jpg', 'V2.jpg', 'V3.jpg', 'V4.jpg', 'V5.jpg',
  // Actions/Verbs (5 images)
  'Verb 1.jpg', 'Verb 2.jpg', 'Verb 3.jpg', 'Verb 4.jpg', 'Verb 5.jpg',
  // Numbers (5 images)
  'Numb1.jpg', 'Numb2.jpg', 'Numb3.jpg', 'Numb4.jpg', 'Numb5.jpg',
  // Shapes (4 images)
  'Shape 1.jpg', 'Shape 2.jpg', 'Shape 3.jpg', 'Shape 4.jpg',
  // Concepts (1 image)
  'Big and Small.jpg'
];

// Function to load selected 50 local dataset images
// This function now uses the API endpoint to dynamically load images
export async function loadLocalImages(): Promise<CulturalImage[]> {
  try {
    // Try to fetch images from the API endpoint first
    const response = await fetch('/api/dataset-images?count=50');
    if (response.ok) {
      const apiImages = await response.json();
      if (Array.isArray(apiImages) && apiImages.length > 0) {
        culturalImages = apiImages;
        return apiImages;
      }
    }
  } catch (error) {
    console.warn('Failed to load images from API, using fallback:', error);
  }
  
  // Fallback: Use hardcoded paths with correct server route
  const images: CulturalImage[] = [
    // Animals (10 images)
    { id: '1', url: '/dataset-images/A1.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 1', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '2', url: '/dataset-images/A2.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 2', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '3', url: '/dataset-images/A3.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 3', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '4', url: '/dataset-images/A4.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 4', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '5', url: '/dataset-images/A5.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 5', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '6', url: '/dataset-images/A6.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 6', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '7', url: '/dataset-images/A7.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 7', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '8', url: '/dataset-images/A8.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 8', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '9', url: '/dataset-images/A9.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 9', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '10', url: '/dataset-images/A10.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 10', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    
    // Fruits (10 images)
    { id: '11', url: '/dataset-images/F1.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 1', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '12', url: '/dataset-images/F2.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 2', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '13', url: '/dataset-images/F3.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 3', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '14', url: '/dataset-images/F4.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 4', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '15', url: '/dataset-images/F5.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 5', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '16', url: '/dataset-images/F6.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 6', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '17', url: '/dataset-images/F7.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 7', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '18', url: '/dataset-images/F8.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 8', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '19', url: '/dataset-images/F9.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 9', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '20', url: '/dataset-images/F10.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 10', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    
    // Vegetables (10 images)
    { id: '21', url: '/dataset-images/Veg 1.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 1', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '22', url: '/dataset-images/Veg 2.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 2', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '23', url: '/dataset-images/Veg 3.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 3', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '24', url: '/dataset-images/Veg 4.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 4', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '25', url: '/dataset-images/Veg 5.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 5', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '26', url: '/dataset-images/Veg 6.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 6', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '27', url: '/dataset-images/Veg 7.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 7', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '28', url: '/dataset-images/Veg 8.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 8', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '29', url: '/dataset-images/Veg 9.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 9', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '30', url: '/dataset-images/Veg 10.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 10', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    
    // Vehicles (5 images)
    { id: '31', url: '/dataset-images/V1 Cycle.jpg', kannadaName: 'ವಾಹನ', englishName: 'Bicycle', category: 'vehicles', description: 'Vehicle image', culturalSignificance: 'Educational' },
    { id: '32', url: '/dataset-images/V2.jpg', kannadaName: 'ವಾಹನ', englishName: 'Vehicle 2', category: 'vehicles', description: 'Vehicle image', culturalSignificance: 'Educational' },
    { id: '33', url: '/dataset-images/V3.jpg', kannadaName: 'ವಾಹನ', englishName: 'Vehicle 3', category: 'vehicles', description: 'Vehicle image', culturalSignificance: 'Educational' },
    { id: '34', url: '/dataset-images/V4.jpg', kannadaName: 'ವಾಹನ', englishName: 'Vehicle 4', category: 'vehicles', description: 'Vehicle image', culturalSignificance: 'Educational' },
    { id: '35', url: '/dataset-images/V5.jpg', kannadaName: 'ವಾಹನ', englishName: 'Vehicle 5', category: 'vehicles', description: 'Vehicle image', culturalSignificance: 'Educational' },
    
    // Actions/Verbs (5 images)
    { id: '36', url: '/dataset-images/Verb 1.jpg', kannadaName: 'ಕ್ರಿಯೆ', englishName: 'Action 1', category: 'actions', description: 'Action image', culturalSignificance: 'Educational' },
    { id: '37', url: '/dataset-images/Verb 2.jpg', kannadaName: 'ಕ್ರಿಯೆ', englishName: 'Action 2', category: 'actions', description: 'Action image', culturalSignificance: 'Educational' },
    { id: '38', url: '/dataset-images/Verb 3.jpg', kannadaName: 'ಕ್ರಿಯೆ', englishName: 'Action 3', category: 'actions', description: 'Action image', culturalSignificance: 'Educational' },
    { id: '39', url: '/dataset-images/Verb 4.jpg', kannadaName: 'ಕ್ರಿಯೆ', englishName: 'Action 4', category: 'actions', description: 'Action image', culturalSignificance: 'Educational' },
    { id: '40', url: '/dataset-images/Verb 5.jpg', kannadaName: 'ಕ್ರಿಯೆ', englishName: 'Action 5', category: 'actions', description: 'Action image', culturalSignificance: 'Educational' },
    
    // Numbers (5 images)
    { id: '41', url: '/dataset-images/Numb1.jpg', kannadaName: 'ಸಂಖ್ಯೆ', englishName: 'Number 1', category: 'numbers', description: 'Number image', culturalSignificance: 'Educational' },
    { id: '42', url: '/dataset-images/Numb2.jpg', kannadaName: 'ಸಂಖ್ಯೆ', englishName: 'Number 2', category: 'numbers', description: 'Number image', culturalSignificance: 'Educational' },
    { id: '43', url: '/dataset-images/Numb3.jpg', kannadaName: 'ಸಂಖ್ಯೆ', englishName: 'Number 3', category: 'numbers', description: 'Number image', culturalSignificance: 'Educational' },
    { id: '44', url: '/dataset-images/Numb4.jpg', kannadaName: 'ಸಂಖ್ಯೆ', englishName: 'Number 4', category: 'numbers', description: 'Number image', culturalSignificance: 'Educational' },
    { id: '45', url: '/dataset-images/Numb5.jpg', kannadaName: 'ಸಂಖ್ಯೆ', englishName: 'Number 5', category: 'numbers', description: 'Number image', culturalSignificance: 'Educational' },
    
    // Shapes (4 images)
    { id: '46', url: '/dataset-images/Shape 1.jpg', kannadaName: 'ಆಕಾರ', englishName: 'Shape 1', category: 'shapes', description: 'Shape image', culturalSignificance: 'Educational' },
    { id: '47', url: '/dataset-images/Shape 2.jpg', kannadaName: 'ಆಕಾರ', englishName: 'Shape 2', category: 'shapes', description: 'Shape image', culturalSignificance: 'Educational' },
    { id: '48', url: '/dataset-images/Shape 3.jpg', kannadaName: 'ಆಕಾರ', englishName: 'Shape 3', category: 'shapes', description: 'Shape image', culturalSignificance: 'Educational' },
    { id: '49', url: '/dataset-images/Shape 4.jpg', kannadaName: 'ಆಕಾರ', englishName: 'Shape 4', category: 'shapes', description: 'Shape image', culturalSignificance: 'Educational' },
    
    // Concepts (1 image)
    { id: '50', url: '/dataset-images/Big and Small.jpg', kannadaName: 'ಪರಿಕಲ್ಪನೆ', englishName: 'Big and Small', category: 'concepts', description: 'Concept image', culturalSignificance: 'Educational' }
  ];
  
  culturalImages = images;
  return images;
}

// Initialize with empty array, will be populated when component loads
export { culturalImages as default };
