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

ಪುಸ್ಕಲವಾದ ಊಟ ಅಂದರೆ ಇವನಿಗೆ ತುಂಬಾ ಇಷ್ಟ. ಯಾರೇ ಊಟಕ್ಕೆ ಕರೆಯಲಿ, ಯಾವುದೇ ಸಮಾರಂಭವಾಗಲಿ ಹಾಜರಾಗುತ್ತಿದ್ದ.

ಒಂದು ದಿನ ಬ್ರಾಹ್ಮಣನಿಗೆ ಒಂದು ಕನಸು ಬಂತು. ಕನಸಿನಲ್ಲಿ ಒಬ್ಬ ಋಷಿ ಕಾಣಿಸಿಕೊಂಡು, "ನೀನು ಮೂಢನಂಬಿಕೆಗಳನ್ನು ಬಿಟ್ಟು ಸತ್ಯದ ಹಾದಿಯಲ್ಲಿ ನಡೆ" ಎಂದು ಹೇಳಿದ. ಆದರೆ ಬ್ರಾಹ್ಮಣನು ಇದನ್ನು ಕೂಡ ಒಂದು ಮೂಢನಂಬಿಕೆ ಎಂದೇ ಭಾವಿಸಿದ.

ಮರುದಿನ ಬೆಳಿಗ್ಗೆ ಅವನ ಮನೆಯ ಮುಂದೆ ಒಂದು ಕಪ್ಪು ಬೆಕ್ಕು ದಾಟಿ ಹೋಯಿತು. ಇದನ್ನು ಕಂಡ ಬ್ರಾಹ್ಮಣನು "ಅಯ್ಯೋ, ಇಂದು ಅಶುಭ ದಿನ" ಎಂದು ಮನೆಯಿಂದ ಹೊರಬರಲಿಲ್ಲ. ಆದರೆ ಅದೇ ದಿನ ಅವನ ಮಗನಿಗೆ ಒಳ್ಳೆಯ ಕೆಲಸ ಸಿಕ್ಕಿತು.

ಈ ಘಟನೆಯಿಂದ ಬ್ರಾಹ್ಮಣನಿಗೆ ಅರಿವಾಯಿತು. ಮೂಢನಂಬಿಕೆಗಳು ನಮ್ಮ ಮನಸ್ಸಿನ ಭ್ರಮೆಗಳು ಮಾತ್ರ. ಅಂದಿನಿಂದ ಅವನು ವಿವೇಕದಿಂದ ಜೀವನ ನಡೆಸಲು ಪ್ರಾರಂಭಿಸಿದ.`
        },
        culturalContext: 'Traditional Kannada folklore teaching moral values',
        points: 50,
      },
      {
        id: randomUUID(),
        type: 'reading',
        level: 'beginner',
        title: 'ಸರಳ ಕಥೆ - ಬುದ್ಧಿವಂತ ರೈತ',
        content: {
          text: `ಒಂದು ಹಳ್ಳಿಯಲ್ಲಿ ರಾಮು ಎಂಬ ರೈತ ವಾಸಿಸುತ್ತಿದ್ದ. ಅವನು ತುಂಬಾ ಬುದ್ಧಿವಂತ ಮತ್ತು ಪರಿಶ್ರಮಿ. ಅವನ ಹೊಲದಲ್ಲಿ ಯಾವಾಗಲೂ ಉತ್ತಮ ಬೆಳೆ ಬೆಳೆಯುತ್ತಿತ್ತು.

ಒಂದು ವರ್ಷ ಮಳೆ ಬರಲಿಲ್ಲ. ಎಲ್ಲಾ ರೈತರ ಬೆಳೆ ಒಣಗಿ ಹೋಯಿತು. ಆದರೆ ರಾಮು ಮಾತ್ರ ಚಿಂತೆ ಮಾಡಲಿಲ್ಲ. ಅವನು ತನ್ನ ಹೊಲದ ಬಳಿ ಬಾವಿ ಅಗೆಸಿದ್ದ.

ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ ಅವನು ಬಾವಿಯಿಂದ ನೀರು ತೆಗೆದು ಬೆಳೆಗೆ ಹಾಕುತ್ತಿದ್ದ. ಅವನ ಬೆಳೆ ಚೆನ್ನಾಗಿ ಬೆಳೆಯಿತು. ಇತರ ರೈತರು ಅವನ ಬುದ್ಧಿವಂತಿಕೆಯನ್ನು ಮೆಚ್ಚಿದರು.

ಅಂದಿನಿಂದ ಎಲ್ಲಾ ರೈತರು ತಮ್ಮ ಹೊಲದ ಬಳಿ ಬಾವಿ ಅಗೆಸಿಕೊಂಡರು. ಹಳ್ಳಿಯಲ್ಲಿ ಯಾರಿಗೂ ನೀರಿನ ಕೊರತೆ ಇರಲಿಲ್ಲ. ರಾಮುವಿನ ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಇಡೀ ಹಳ್ಳಿ ಉಪಕೃತವಾಯಿತು.`
        },
        culturalContext: 'Story about wisdom and planning ahead',
        points: 50,
      },
      {
        id: randomUUID(),
        type: 'reading',
        level: 'intermediate',
        title: 'ಕರ್ನಾಟಕದ ಸಂಸ್ಕೃತಿ',
        content: {
          text: `ಕರ್ನಾಟಕ ರಾಜ್ಯವು ತನ್ನ ಶ್ರೀಮಂತ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಪರಂಪರೆಗೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ. ಇಲ್ಲಿನ ಕಲೆ, ಸಾಹಿತ್ಯ, ಸಂಗೀತ ಮತ್ತು ನೃತ್ಯ ಪ್ರಪಂಚದಾದ್ಯಂತ ಮೆಚ್ಚುಗೆ ಪಡೆದಿದೆ.

ಕರ್ನಾಟಕ ಸಂಗೀತವು ಭಾರತೀಯ ಶಾಸ್ತ್ರೀಯ ಸಂಗೀತದ ಒಂದು ಪ್ರಮುಖ ಶಾಖೆಯಾಗಿದೆ. ಪುರಂದರ ದಾಸರನ್ನು ಕರ್ನಾಟಕ ಸಂಗೀತದ ಪಿತಾಮಹ ಎಂದು ಕರೆಯುತ್ತಾರೆ. ಅವರ ಕೃತಿಗಳು ಇಂದಿಗೂ ಸಂಗೀತ ಪ್ರೇಮಿಗಳಿಗೆ ಸ್ಫೂರ್ತಿ ನೀಡುತ್ತಿವೆ.

ಯಕ್ಷಗಾನವು ಕರ್ನಾಟಕದ ಸಾಂಪ್ರದಾಯಿಕ ಕಲಾ ಪ್ರಕಾರವಾಗಿದೆ. ಇದರಲ್ಲಿ ನೃತ್ಯ, ಸಂಗೀತ, ನಾಟಕ ಮತ್ತು ಸಾಹಿತ್ಯ ಎಲ್ಲವೂ ಸೇರಿವೆ. ವರ್ಣರಂಜಿತ ವೇಷಭೂಷಣ ಮತ್ತು ಮುಖವರ್ಣ ಯಕ್ಷಗಾನದ ವಿಶೇಷತೆಗಳಾಗಿವೆ.

ಮೈಸೂರು ದಸರಾ ಕರ್ನಾಟಕದ ಪ್ರಮುಖ ಹಬ್ಬವಾಗಿದೆ. ಇದು ಹತ್ತು ದಿನಗಳ ಕಾಲ ಆಚರಿಸಲಾಗುತ್ತದೆ. ಮೈಸೂರು ಅರಮನೆಯ ಸುಂದರ ಬೆಳಕಿನ ಅಲಂಕಾರ ಮತ್ತು ಜಂಬೂ ಸವಾರಿ ಪ್ರಪಂಚದಾದ್ಯಂತದ ಪ್ರವಾಸಿಗರನ್ನು ಆಕರ್ಷಿಸುತ್ತದೆ.`
        },
        culturalContext: 'Karnataka culture and traditions',
        points: 75,
      },
    ];

    const namingExercises = [
      {
        id: randomUUID(),
        type: 'naming',
        level: 'beginner',
        title: 'ಸ್ಥಾನೀಯ ವಸ್ತುಗಳು - ಹೆಸರಿಸುವ ಅಭ್ಯಾಸ',
        content: {
          images: [
            {
              url: '/api/dataset-images/A1.jpg',
              kannadaName: 'ಸೇಬು',
              englishName: 'Apple',
              description: 'ಸೇಬು - ಒಂದು ಕೆಂಪು ಹಣ್ಣು - A red apple fruit for naming practice',
            }
          ]
        },
        culturalContext: 'Local objects and items for naming exercise practice',
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
