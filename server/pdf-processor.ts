import pdf from 'pdf-poppler';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface PDFImage {
  id: string;
  url: string;
  pageNumber: number;
  kannadaName: string;
  englishName: string;
  category: string;
  description: string;
  culturalSignificance: string;
}

class PDFProcessor {
  private pdfPath: string;
  private outputDir: string;
  private images: PDFImage[] = [];

  constructor() {
    this.pdfPath = path.join(__dirname, '..', 'C6.pdf');
    this.outputDir = path.join(__dirname, '..', 'pdf-images');
    
    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async processPDF(): Promise<PDFImage[]> {
    try {
      // Convert PDF to images
      const options = {
        format: 'jpeg' as const,
        out_dir: this.outputDir,
        out_prefix: 'page',
        page: null // Convert all pages
      };

      const pages = await pdf.convert(this.pdfPath, options);
      
      // Generate image metadata
      this.images = pages.map((page: any, index: number) => ({
        id: `pdf-page-${index + 1}`,
        url: `/api/pdf-images/page-${index + 1}.jpg`,
        pageNumber: index + 1,
        kannadaName: `ಪುಟ ${index + 1}`,
        englishName: `Page ${index + 1}`,
        category: 'document',
        description: `C6 ದಾಖಲೆಯ ಪುಟ ${index + 1} - Page ${index + 1} from C6 document`,
        culturalSignificance: 'Educational content for naming practice'
      }));

      return this.images;
    } catch (error) {
      console.error('Error processing PDF:', error);
      return [];
    }
  }

  getRandomImages(count: number = 8): PDFImage[] {
    if (this.images.length === 0) {
      return [];
    }
    
    const shuffled = [...this.images].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, this.images.length));
  }

  getAllImages(): PDFImage[] {
    return this.images;
  }

  getImagePath(filename: string): string {
    return path.join(this.outputDir, filename);
  }
}

export const pdfProcessor = new PDFProcessor();