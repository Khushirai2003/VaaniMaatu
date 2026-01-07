import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSessionSchema, insertProgressSchema } from "@shared/schema";
import { pdfProcessor } from "./pdf-processor";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static images from the dataset directory
  app.use('/dataset-images', express.static(path.join(__dirname, '..', 'datasetsimagesfornamingtask (1)')));
  
  // Get exercises by type and level
  app.get("/api/exercises", async (req, res) => {
    try {
      const { type, level } = req.query;
      const exercises = await storage.getExercises(
        type as string | undefined, 
        level as string | undefined
      );
      res.json(exercises);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      res.status(500).json({ error: "Failed to fetch exercises" });
    }
  });

  // Get specific exercise
  app.get("/api/exercises/:id", async (req, res) => {
    try {
      const exercise = await storage.getExercise(req.params.id);
      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      res.json(exercise);
    } catch (error) {
      console.error('Error fetching exercise:', error);
      res.status(500).json({ error: "Failed to fetch exercise" });
    }
  });

  // Start a new session
  app.post("/api/sessions", async (req, res) => {
    try {
      const sessionData = insertSessionSchema.parse(req.body);
      const session = await storage.createSession(sessionData);
      res.json(session);
    } catch (error) {
      console.error('Error creating session:', error);
      res.status(400).json({ error: "Invalid session data" });
    }
  });

  // Update session (end session, add results)
  app.patch("/api/sessions/:id", async (req, res) => {
    try {
      const session = await storage.updateSession(req.params.id, req.body);
      
      // Update user progress and stats
      if (req.body.completed) {
        const today = new Date().toISOString().split('T')[0];
        await storage.createOrUpdateProgress({
          userId: session.userId,
          date: today,
          totalMinutes: Math.floor((session.duration || 0) / 60),
          points: session.points || 0,
          exercisesCompleted: 1,
          averageFluencyScore: session.fluencyScore,
        });

        // Update user total stats
        const user = await storage.getUser(session.userId);
        if (user) {
          await storage.updateUser(session.userId, {
            totalPoints: (user.totalPoints || 0) + (session.points || 0),
            totalMinutes: (user.totalMinutes || 0) + Math.floor((session.duration || 0) / 60),
          });
        }
      }
      
      res.json(session);
    } catch (error) {
      console.error('Error updating session:', error);
      res.status(400).json({ error: "Failed to update session" });
    }
  });

  // Get user sessions
  app.get("/api/users/:userId/sessions", async (req, res) => {
    try {
      const sessions = await storage.getUserSessions(req.params.userId);
      res.json(sessions);
    } catch (error) {
      console.error('Error fetching user sessions:', error);
      res.status(500).json({ error: "Failed to fetch user sessions" });
    }
  });

  // Get user progress
  app.get("/api/users/:userId/progress", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 7;
      const progress = await storage.getUserProgress(req.params.userId, days);
      res.json(progress);
    } catch (error) {
      console.error('Error fetching user progress:', error);
      res.status(500).json({ error: "Failed to fetch user progress" });
    }
  });

  // Get user stats
  app.get("/api/users/:userId/stats", async (req, res) => {
    try {
      const stats = await storage.getUserStats(req.params.userId);
      res.json(stats);
    } catch (error) {
      console.error('Error fetching user stats:', error);
      // Return default stats if user doesn't exist
      res.json({
        totalPoints: 0,
        totalMinutes: 0,
        currentStreak: 0,
        achievements: [],
      });
    }
  });

  // Create or get demo user
  app.post("/api/users", async (req, res) => {
    try {
      const { username } = req.body;
      let user = await storage.getUserByUsername(username);
      
      if (!user) {
        user = await storage.createUser({
          username,
          preferredLanguage: 'kannada',
        });
      }
      
      res.json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json({ error: "Failed to create user" });
    }
  });

  // Mock grammar correction endpoint for testing
  app.post('/api/grammar', async (req, res) => {
    try {
      const { text, lang } = req.body || {};
      if (!text || typeof text !== 'string') return res.status(400).json({ error: 'No text provided' });

      // Naive correction: trim and capitalize first letter, ensure trailing period
      let corrected = text.trim();
      if (corrected.length > 0) {
        corrected = corrected[0].toUpperCase() + corrected.slice(1);
        if (!/[.!?]$/.test(corrected)) corrected += '.';
      }

      return res.json({ corrected });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to correct text' });
    }
  });

  // Serve C6.pdf file
  app.get('/api/pdf/C6.pdf', (req, res) => {
    const pdfPath = path.join(__dirname, '..', 'C6.pdf');
    res.sendFile(pdfPath);
  });



  // Test route to list available images
  app.get('/api/test-images', (req, res) => {
    try {
      const fs = require('fs');
      const imagesDir = path.join(__dirname, '..', 'datasetsimagesfornamingtask (1)');
      
      console.log('Images directory:', imagesDir);
      
      if (!fs.existsSync(imagesDir)) {
        return res.status(404).json({ error: 'Images directory not found', path: imagesDir });
      }
      
      const files = fs.readdirSync(imagesDir);
      res.json({ directory: imagesDir, files: files.slice(0, 10) }); // Show first 10 files
    } catch (error) {
      console.error('Error listing images:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: 'Failed to list images', details: errorMessage });
    }
  });

  // Get random local images for naming exercise
  app.get('/api/dataset-images', async (req, res) => {
    try {
      const fs = await import('fs');
      const count = parseInt(req.query.count as string) || 20;
      const imagesDir = path.join(__dirname, '..', 'datasetsimagesfornamingtask (1)');
      
      // Check if directory exists
      if (!fs.existsSync(imagesDir)) {
        console.warn('Images directory does not exist:', imagesDir);
        return res.json([]);
      }
      
      const files = fs.readdirSync(imagesDir).filter(file => 
        file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png')
      );
      
      // If no images found, return empty array
      if (files.length === 0) {
        console.warn('No images found in directory:', imagesDir);
        return res.json([]);
      }
      
      // Remove duplicates and sort for consistent ordering
      const uniqueFiles = Array.from(new Set(files)).sort();
      
      // Take the requested count or all available files
      const selectedFiles = uniqueFiles.slice(0, Math.min(count, uniqueFiles.length));
      
      const images = selectedFiles.map((filename, index) => {
        const objectInfo = getObjectInfoFromFilename(filename);
        return {
          id: `img-${index}-${filename.replace(/[^a-zA-Z0-9]/g, '')}`,
          url: `/dataset-images/${encodeURIComponent(filename)}`,
          kannadaName: objectInfo.kannadaName,
          englishName: objectInfo.englishName,
          category: objectInfo.category,
          description: `${objectInfo.englishName} - ${objectInfo.description}`,
          culturalSignificance: 'Educational content for naming practice'
        };
      });
      
      // Remove any potential duplicates based on URL
      const uniqueImages = images.filter((image, index, self) => 
        index === self.findIndex(img => img.url === image.url)
      );
      
      res.json(uniqueImages);
    } catch (error) {
      console.error('Error getting dataset images:', error);
      // Return empty array instead of error to prevent UI breaking
      res.json([]);
    }
  });
  
  function getObjectInfoFromFilename(filename: string): { englishName: string; kannadaName: string; category: string; description: string } {
    const lower = filename.toLowerCase();
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    
    // Specific mappings for known objects
    const objectMappings: Record<string, { englishName: string; kannadaName: string; category: string; description: string }> = {
      'a1': { englishName: 'Apple', kannadaName: 'ಸೇಬು', category: 'fruits', description: 'A red apple fruit' },
      'a2': { englishName: 'Airplane', kannadaName: 'ವಿಮಾನ', category: 'vehicles', description: 'An airplane for transportation' },
      'a3': { englishName: 'Ant', kannadaName: 'ಇಂಟೆ', category: 'animals', description: 'A small ant insect' },
      'a4': { englishName: 'Axe', kannadaName: 'ಕಡಲಿ', category: 'tools', description: 'A tool for cutting wood' },
      'a5': { englishName: 'Arrow', kannadaName: 'ಅಂಬು', category: 'objects', description: 'An arrow for direction' },
      'c1': { englishName: 'Cat', kannadaName: 'ಬೆಕ್ಕು', category: 'animals', description: 'A domestic cat' },
      'c2': { englishName: 'Car', kannadaName: 'ಕಾರು', category: 'vehicles', description: 'A motor car' },
      'c3': { englishName: 'Cup', kannadaName: 'ಕಪ್', category: 'objects', description: 'A drinking cup' },
      'c4': { englishName: 'Clock', kannadaName: 'ಗಡಿಯಾರ', category: 'objects', description: 'A time-telling clock' },
      'c5': { englishName: 'Chair', kannadaName: 'ಕುರ್ಚಿ', category: 'furniture', description: 'A chair for sitting' },
      'f1': { englishName: 'Fish', kannadaName: 'ಮೀನು', category: 'animals', description: 'A fish in water' },
      'f2': { englishName: 'Flower', kannadaName: 'ಹೂವು', category: 'nature', description: 'A beautiful flower' },
      'f3': { englishName: 'Flag', kannadaName: 'ಧ್ವಜ', category: 'objects', description: 'A national flag' },
      'v1 cycle': { englishName: 'Bicycle', kannadaName: 'ಸೈಕಲ್', category: 'vehicles', description: 'A bicycle for riding' },
      'v2': { englishName: 'Van', kannadaName: 'ವ್ಯಾನ್', category: 'vehicles', description: 'A transport van' },
      'v3': { englishName: 'Violin', kannadaName: 'ವೈಣ', category: 'instruments', description: 'A musical violin' }
    };
    
    // Check for specific mappings first
    const key = lower.replace(/\s+/g, ' ').trim();
    if (objectMappings[key]) {
      return objectMappings[key];
    }
    
    // Handle food items
    if (lower.includes('eat')) {
      const num = nameWithoutExt.match(/\d+/)?.[0] || '1';
      return { englishName: `Food ${num}`, kannadaName: `ಆಹಾರ`, category: 'food', description: 'An edible food item' };
    }
    
    // Handle vegetables
    if (lower.includes('veg')) {
      const num = nameWithoutExt.match(/\d+/)?.[0] || '1';
      return { englishName: `Vegetable ${num}`, kannadaName: `ತರಕಾರಿ`, category: 'vegetables', description: 'A fresh vegetable' };
    }
    
    // Handle numbers
    if (lower.includes('numb')) {
      const num = nameWithoutExt.match(/\d+/)?.[0] || '1';
      return { englishName: `Number ${num}`, kannadaName: `ಸಂಖ್ಯೆ`, category: 'numbers', description: `The number ${num}` };
    }
    
    // Handle shapes
    if (lower.includes('shape')) {
      const num = nameWithoutExt.match(/\d+/)?.[0] || '1';
      return { englishName: `Shape ${num}`, kannadaName: `ಆಕಾರ`, category: 'shapes', description: 'A geometric shape' };
    }
    
    // Handle verbs/actions
    if (lower.includes('verb')) {
      const num = nameWithoutExt.match(/\d+/)?.[0] || '1';
      return { englishName: `Action ${num}`, kannadaName: `ಕ್ರಿಯೆ`, category: 'actions', description: 'An action or verb' };
    }
    
    // Handle taste
    if (lower.includes('taste')) {
      const num = nameWithoutExt.match(/\d+/)?.[0] || '1';
      return { englishName: `Taste ${num}`, kannadaName: `ರುಚಿ`, category: 'senses', description: 'A taste sensation' };
    }
    
    // Handle size comparisons
    if (lower.includes('big') || lower.includes('small')) {
      return { englishName: 'Size Comparison', kannadaName: 'ಗಾತ್ರ ಹೆಗ್ಗಳಿಕೆ', category: 'concepts', description: 'Big and small comparison' };
    }
    
    if (lower.includes('tall') || lower.includes('short')) {
      return { englishName: 'Height Comparison', kannadaName: 'ಎತ್ತರ ಹೆಗ್ಗಳಿಕೆ', category: 'concepts', description: 'Tall and short comparison' };
    }
    
    if (lower.includes('loud') || lower.includes('quiet')) {
      return { englishName: 'Sound Level', kannadaName: 'ಶಬ್ದದ ಮಟ್ಟ', category: 'concepts', description: 'Loud and quiet sounds' };
    }
    
    // Default fallback
    return {
      englishName: nameWithoutExt.replace(/[0-9]/g, '').trim() || 'Object',
      kannadaName: `ವಸ್ತು`,
      category: 'objects',
      description: 'A learning object'
    };
  }

  // Initialize PDF processing
  app.get('/api/init-pdf', async (req, res) => {
    try {
      const images = await pdfProcessor.processPDF();
      res.json({ message: 'PDF processed successfully', imageCount: images.length });
    } catch (error) {
      console.error('Error processing PDF:', error);
      res.status(500).json({ error: 'Failed to process PDF' });
    }
  });

  // Catch-all for unmatched API routes
  app.use('/api/*', (req, res) => {
    console.log(`API 404: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: 'API endpoint not found', path: req.originalUrl });
  });

  const httpServer = createServer(app);
  return httpServer;
}
