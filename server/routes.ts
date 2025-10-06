import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSessionSchema, insertProgressSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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
      res.status(400).json({ error: "Failed to update session" });
    }
  });

  // Get user sessions
  app.get("/api/users/:userId/sessions", async (req, res) => {
    try {
      const sessions = await storage.getUserSessions(req.params.userId);
      res.json(sessions);
    } catch (error) {
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
      res.status(500).json({ error: "Failed to fetch user progress" });
    }
  });

  // Get user stats
  app.get("/api/users/:userId/stats", async (req, res) => {
    try {
      const stats = await storage.getUserStats(req.params.userId);
      res.json(stats);
    } catch (error) {
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
      res.status(400).json({ error: "Failed to create user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
