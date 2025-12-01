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
export async function loadLocalImages(): Promise<CulturalImage[]> {
  const images: CulturalImage[] = [
    // Animals (10 images)
    { id: '1', url: '/datasetsimagesfornamingtask%20(1)/A1.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 1', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '2', url: '/datasetsimagesfornamingtask%20(1)/A2.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 2', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '3', url: '/datasetsimagesfornamingtask%20(1)/A3.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 3', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '4', url: '/datasetsimagesfornamingtask%20(1)/A4.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 4', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '5', url: '/datasetsimagesfornamingtask%20(1)/A5.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 5', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '6', url: '/datasetsimagesfornamingtask%20(1)/A6.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 6', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '7', url: '/datasetsimagesfornamingtask%20(1)/A7.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 7', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '8', url: '/datasetsimagesfornamingtask%20(1)/A8.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 8', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '9', url: '/datasetsimagesfornamingtask%20(1)/A9.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 9', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    { id: '10', url: '/datasetsimagesfornamingtask%20(1)/A10.jpg', kannadaName: 'ಪ್ರಾಣಿ', englishName: 'Animal 10', category: 'animals', description: 'Animal image', culturalSignificance: 'Educational' },
    
    // Fruits (10 images)
    { id: '11', url: '/datasetsimagesfornamingtask%20(1)/F1.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 1', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '12', url: '/datasetsimagesfornamingtask%20(1)/F2.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 2', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '13', url: '/datasetsimagesfornamingtask%20(1)/F3.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 3', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '14', url: '/datasetsimagesfornamingtask%20(1)/F4.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 4', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '15', url: '/datasetsimagesfornamingtask%20(1)/F5.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 5', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '16', url: '/datasetsimagesfornamingtask%20(1)/F6.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 6', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '17', url: '/datasetsimagesfornamingtask%20(1)/F7.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 7', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '18', url: '/datasetsimagesfornamingtask%20(1)/F8.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 8', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '19', url: '/datasetsimagesfornamingtask%20(1)/F9.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 9', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    { id: '20', url: '/datasetsimagesfornamingtask%20(1)/F10.jpg', kannadaName: 'ಹಣ್ಣು', englishName: 'Fruit 10', category: 'fruits', description: 'Fruit image', culturalSignificance: 'Educational' },
    
    // Vegetables (10 images)
    { id: '21', url: '/datasetsimagesfornamingtask%20(1)/Veg%201.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 1', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '22', url: '/datasetsimagesfornamingtask%20(1)/Veg%202.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 2', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '23', url: '/datasetsimagesfornamingtask%20(1)/Veg%203.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 3', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '24', url: '/datasetsimagesfornamingtask%20(1)/Veg%204.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 4', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '25', url: '/datasetsimagesfornamingtask%20(1)/Veg%205.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 5', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '26', url: '/datasetsimagesfornamingtask%20(1)/Veg%206.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 6', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '27', url: '/datasetsimagesfornamingtask%20(1)/Veg%207.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 7', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '28', url: '/datasetsimagesfornamingtask%20(1)/Veg%208.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 8', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '29', url: '/datasetsimagesfornamingtask%20(1)/Veg%209.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 9', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    { id: '30', url: '/datasetsimagesfornamingtask%20(1)/Veg%2010.jpg', kannadaName: 'ತರಕಾರಿ', englishName: 'Vegetable 10', category: 'vegetables', description: 'Vegetable image', culturalSignificance: 'Educational' },
    
    // Vehicles (5 images)
    { id: '31', url: '/datasetsimagesfornamingtask%20(1)/V1%20Cycle.jpg', kannadaName: 'ವಾಹನ', englishName: 'Bicycle', category: 'vehicles', description: 'Vehicle image', culturalSignificance: 'Educational' },
    { id: '32', url: '/datasetsimagesfornamingtask%20(1)/V2.jpg', kannadaName: 'ವಾಹನ', englishName: 'Vehicle 2', category: 'vehicles', description: 'Vehicle image', culturalSignificance: 'Educational' },
    { id: '33', url: '/datasetsimagesfornamingtask%20(1)/V3.jpg', kannadaName: 'ವಾಹನ', englishName: 'Vehicle 3', category: 'vehicles', description: 'Vehicle image', culturalSignificance: 'Educational' },
    { id: '34', url: '/datasetsimagesfornamingtask%20(1)/V4.jpg', kannadaName: 'ವಾಹನ', englishName: 'Vehicle 4', category: 'vehicles', description: 'Vehicle image', culturalSignificance: 'Educational' },
    { id: '35', url: '/datasetsimagesfornamingtask%20(1)/V5.jpg', kannadaName: 'ವಾಹನ', englishName: 'Vehicle 5', category: 'vehicles', description: 'Vehicle image', culturalSignificance: 'Educational' },
    
    // Actions/Verbs (5 images)
    { id: '36', url: '/datasetsimagesfornamingtask%20(1)/Verb%201.jpg', kannadaName: 'ಕ್ರಿಯೆ', englishName: 'Action 1', category: 'actions', description: 'Action image', culturalSignificance: 'Educational' },
    { id: '37', url: '/datasetsimagesfornamingtask%20(1)/Verb%202.jpg', kannadaName: 'ಕ್ರಿಯೆ', englishName: 'Action 2', category: 'actions', description: 'Action image', culturalSignificance: 'Educational' },
    { id: '38', url: '/datasetsimagesfornamingtask%20(1)/Verb%203.jpg', kannadaName: 'ಕ್ರಿಯೆ', englishName: 'Action 3', category: 'actions', description: 'Action image', culturalSignificance: 'Educational' },
    { id: '39', url: '/datasetsimagesfornamingtask%20(1)/Verb%204.jpg', kannadaName: 'ಕ್ರಿಯೆ', englishName: 'Action 4', category: 'actions', description: 'Action image', culturalSignificance: 'Educational' },
    { id: '40', url: '/datasetsimagesfornamingtask%20(1)/Verb%205.jpg', kannadaName: 'ಕ್ರಿಯೆ', englishName: 'Action 5', category: 'actions', description: 'Action image', culturalSignificance: 'Educational' },
    
    // Numbers (5 images)
    { id: '41', url: '/datasetsimagesfornamingtask%20(1)/Numb1.jpg', kannadaName: 'ಸಂಖ್ಯೆ', englishName: 'Number 1', category: 'numbers', description: 'Number image', culturalSignificance: 'Educational' },
    { id: '42', url: '/datasetsimagesfornamingtask%20(1)/Numb2.jpg', kannadaName: 'ಸಂಖ್ಯೆ', englishName: 'Number 2', category: 'numbers', description: 'Number image', culturalSignificance: 'Educational' },
    { id: '43', url: '/datasetsimagesfornamingtask%20(1)/Numb3.jpg', kannadaName: 'ಸಂಖ್ಯೆ', englishName: 'Number 3', category: 'numbers', description: 'Number image', culturalSignificance: 'Educational' },
    { id: '44', url: '/datasetsimagesfornamingtask%20(1)/Numb4.jpg', kannadaName: 'ಸಂಖ್ಯೆ', englishName: 'Number 4', category: 'numbers', description: 'Number image', culturalSignificance: 'Educational' },
    { id: '45', url: '/datasetsimagesfornamingtask%20(1)/Numb5.jpg', kannadaName: 'ಸಂಖ್ಯೆ', englishName: 'Number 5', category: 'numbers', description: 'Number image', culturalSignificance: 'Educational' },
    
    // Shapes (4 images)
    { id: '46', url: '/datasetsimagesfornamingtask%20(1)/Shape%201.jpg', kannadaName: 'ಆಕಾರ', englishName: 'Shape 1', category: 'shapes', description: 'Shape image', culturalSignificance: 'Educational' },
    { id: '47', url: '/datasetsimagesfornamingtask%20(1)/Shape%202.jpg', kannadaName: 'ಆಕಾರ', englishName: 'Shape 2', category: 'shapes', description: 'Shape image', culturalSignificance: 'Educational' },
    { id: '48', url: '/datasetsimagesfornamingtask%20(1)/Shape%203.jpg', kannadaName: 'ಆಕಾರ', englishName: 'Shape 3', category: 'shapes', description: 'Shape image', culturalSignificance: 'Educational' },
    { id: '49', url: '/datasetsimagesfornamingtask%20(1)/Shape%204.jpg', kannadaName: 'ಆಕಾರ', englishName: 'Shape 4', category: 'shapes', description: 'Shape image', culturalSignificance: 'Educational' },
    
    // Concepts (1 image)
    { id: '50', url: '/datasetsimagesfornamingtask%20(1)/Big%20and%20Small.jpg', kannadaName: 'ಪರಿಕಲ್ಪನೆ', englishName: 'Big and Small', category: 'concepts', description: 'Concept image', culturalSignificance: 'Educational' }
  ];
  
  culturalImages = images;
  return images;
}

// Initialize with empty array, will be populated when component loads
export { culturalImages as default };
