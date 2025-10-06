import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email"),
  preferredLanguage: text("preferred_language").default('kannada'),
  totalPoints: integer("total_points").default(0),
  totalMinutes: integer("total_minutes").default(0),
  currentStreak: integer("current_streak").default(0),
  achievements: jsonb("achievements").default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const exercises = pgTable("exercises", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // 'reading', 'naming', 'conversation'
  level: text("level").notNull(), // 'beginner', 'intermediate', 'advanced'
  title: text("title").notNull(),
  content: jsonb("content").notNull(), // passage text, image info, or conversation prompts
  culturalContext: text("cultural_context"),
  points: integer("points").default(50),
});

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  exerciseId: varchar("exercise_id"),
  type: text("type").notNull(), // 'daf', 'reading', 'naming', 'conversation'
  duration: integer("duration").default(0), // in seconds
  points: integer("points").default(0),
  dafSettings: jsonb("daf_settings"), // delay, enabled settings
  fluencyScore: integer("fluency_score"), // 0-100
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const progress = pgTable("progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  date: text("date").notNull(), // YYYY-MM-DD format
  totalMinutes: integer("total_minutes").default(0),
  points: integer("points").default(0),
  exercisesCompleted: integer("exercises_completed").default(0),
  averageFluencyScore: integer("average_fluency_score"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertExerciseSchema = createInsertSchema(exercises).omit({
  id: true,
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  createdAt: true,
});

export const insertProgressSchema = createInsertSchema(progress).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;
export type Exercise = typeof exercises.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type Progress = typeof progress.$inferSelect;
