import { type User, type InsertUser, type Exercise, type InsertExercise, type Session, type InsertSession, type Progress, type InsertProgress } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;

  // Exercise methods
  getExercises(type?: string, level?: string): Promise<Exercise[]>;
  getExercise(id: string): Promise<Exercise | undefined>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;

  // Session methods
  getUserSessions(userId: string): Promise<Session[]>;
  createSession(session: InsertSession): Promise<Session>;
  updateSession(id: string, updates: Partial<Session>): Promise<Session>;

  // Progress methods
  getUserProgress(userId: string, days?: number): Promise<Progress[]>;
  createOrUpdateProgress(progress: InsertProgress): Promise<Progress>;
  getUserStats(userId: string): Promise<{
    totalPoints: number;
    totalMinutes: number;
    currentStreak: number;
    achievements: any[];
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private exercises: Map<string, Exercise> = new Map();
  private sessions: Map<string, Session> = new Map();
  private progress: Map<string, Progress> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed exercises
    const readingExercises = [
      {
        id: randomUUID(),
        type: 'reading',
        level: 'beginner',
        title: 'ಸರಳ ಕಥೆ - ಬ್ರಾಹ್ಮಣನ ಮೂಢನಂಬಿಕೆ',
        content: {
          text: `ಒಂದು ಊರಿನಲ್ಲಿ ಒಬ್ಬ ಬ್ರಾಹ್ಮಣನಿದ್ದ. ಇವನು ತುಂಬಾ ವಿದ್ಯಾವಂತ, ಗೌರವಸ್ತ. ಆದರೆ ಮೂಢನಂಬಿಕೆಗಳೇ ಇವನಿಗೆ ದೇವರು. ಯಾವುದೇ ವಿಚಾರದಲ್ಲೂ ಮೂಢನಂಬಿಕೆಗಳಿಗೆ ಕಟ್ಟುಬೀಳುತ್ತಿದ್ದ.

ಇದರಿಂದ ಜೀವನದಲ್ಲಿ ಇಲ್ಲದ ತೊಂದರೆಗಳಿಗೆ ಒಳಗಾಗಿದ್ದ. ಇವನು ತಿಂದು ತೇಗಿ ತುಂಬಾ ದಡೂತಿ ಆಗಿದ್ದ. ಎಲ್ಲರು ಇವನನ್ನು ಟೊಣಪ, ಗಣಪ ಎಂದೇ ಕರೆಯುತ್ತಿದ್ದರು.

ಪುಸ್ಕಲವಾದ ಊಟ ಅಂದರೆ ಇವನಿಗೆ ತುಂಬಾ ಇಷ್ಟ. ಯಾರೇ ಊಟಕ್ಕೆ ಕರೆಯಲಿ, ಯಾವುದೇ ಸಮಾರಂಭವಾಗಲಿ ಹಾಜರಾಗುತ್ತಿದ್ದ.`
        },
        culturalContext: 'Traditional Kannada folklore teaching moral values',
        points: 50,
      },
    ];

    const namingExercises = [
      {
        id: randomUUID(),
        type: 'naming',
        level: 'beginner',
        title: 'ದಕ್ಷಿಣ ಭಾರತೀಯ ಸಂಸ್ಕೃತಿ - ಮಂದಿರಗಳು',
        content: {
          images: [
            {
              url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop',
              kannadaName: 'ಮಂದಿರ',
              englishName: 'Temple',
              description: 'ದೇವಾಲಯ - Traditional South Indian temple architecture',
            }
          ]
        },
        culturalContext: 'South Indian temple architecture and cultural significance',
        points: 30,
      }
    ];

    readingExercises.forEach(ex => this.exercises.set(ex.id, ex as Exercise));
    namingExercises.forEach(ex => this.exercises.set(ex.id, ex as Exercise));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser,
      email: insertUser.email || null,
      preferredLanguage: insertUser.preferredLanguage || null,
      id,
      totalPoints: 0,
      totalMinutes: 0,
      currentStreak: 0,
      achievements: [],
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error('User not found');
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getExercises(type?: string, level?: string): Promise<Exercise[]> {
    let exercises = Array.from(this.exercises.values());
    
    if (type) {
      exercises = exercises.filter(ex => ex.type === type);
    }
    
    if (level) {
      exercises = exercises.filter(ex => ex.level === level);
    }
    
    return exercises;
  }

  async getExercise(id: string): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const id = randomUUID();
    const exercise: Exercise = { 
      ...insertExercise, 
      id,
      points: insertExercise.points || null,
      culturalContext: insertExercise.culturalContext || null,
    };
    this.exercises.set(id, exercise);
    return exercise;
  }

  async getUserSessions(userId: string): Promise<Session[]> {
    return Array.from(this.sessions.values())
      .filter(session => session.userId === userId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = randomUUID();
    const session: Session = { 
      ...insertSession,
      id, 
      exerciseId: insertSession.exerciseId || null,
      duration: insertSession.duration || null,
      points: insertSession.points || null,
      dafSettings: insertSession.dafSettings || null,
      fluencyScore: insertSession.fluencyScore || null,
      completed: insertSession.completed || null,
      createdAt: new Date(),
    };
    this.sessions.set(id, session);
    return session;
  }

  async updateSession(id: string, updates: Partial<Session>): Promise<Session> {
    const session = this.sessions.get(id);
    if (!session) throw new Error('Session not found');
    
    const updatedSession = { ...session, ...updates };
    this.sessions.set(id, updatedSession);
    return updatedSession;
  }

  async getUserProgress(userId: string, days: number = 7): Promise<Progress[]> {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));
    
    return Array.from(this.progress.values())
      .filter(p => p.userId === userId && 
        new Date(p.date) >= startDate && 
        new Date(p.date) <= endDate)
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  async createOrUpdateProgress(insertProgress: InsertProgress): Promise<Progress> {
    const existing = Array.from(this.progress.values())
      .find(p => p.userId === insertProgress.userId && p.date === insertProgress.date);
    
    if (existing) {
      const updated = { 
        ...existing, 
        totalMinutes: (existing.totalMinutes || 0) + (insertProgress.totalMinutes || 0),
        points: (existing.points || 0) + (insertProgress.points || 0),
        exercisesCompleted: (existing.exercisesCompleted || 0) + (insertProgress.exercisesCompleted || 0),
      };
      this.progress.set(existing.id, updated);
      return updated;
    } else {
      const id = randomUUID();
      const progress: Progress = { 
        ...insertProgress, 
        id,
        totalMinutes: insertProgress.totalMinutes || null,
        points: insertProgress.points || null,
        exercisesCompleted: insertProgress.exercisesCompleted || null,
        averageFluencyScore: insertProgress.averageFluencyScore || null,
      };
      this.progress.set(id, progress);
      return progress;
    }
  }

  async getUserStats(userId: string): Promise<{
    totalPoints: number;
    totalMinutes: number;
    currentStreak: number;
    achievements: any[];
  }> {
    const user = this.users.get(userId);
    if (!user) throw new Error('User not found');
    
    return {
      totalPoints: user.totalPoints || 0,
      totalMinutes: user.totalMinutes || 0,
      currentStreak: user.currentStreak || 0,
      achievements: (user.achievements as any[]) || [],
    };
  }
}

export const storage = new MemStorage();
