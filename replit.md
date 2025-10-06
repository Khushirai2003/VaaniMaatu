# VaaniMaatu - Kannada Speech Therapy Application

## Overview

VaaniMaatu is a speech therapy application designed for Kannada speakers to overcome stuttering using Delayed Auditory Feedback (DAF) technology. The application provides culturally-relevant exercises including reading passages, image naming, and conversation practice, all integrated with real-time audio processing to help users improve their fluency.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast HMR (Hot Module Replacement)
- **Wouter** for lightweight client-side routing instead of React Router
- **Tailwind CSS** with custom configuration for styling, using a warm South Indian color palette
- **shadcn/ui** component library (New York style) for consistent UI components

**State Management**
- **TanStack Query (React Query)** for server state management, caching, and data synchronization
- **React Context** for language preferences and global UI state
- Local component state using React hooks for UI-specific interactions

**Audio Processing**
- Custom **Web Audio API** implementation for real-time Delayed Auditory Feedback (DAF)
- Audio processing pipeline: MediaStream → AudioContext → DelayNode → AnalyserNode → GainNode
- Real-time audio visualization using analyser data for user feedback
- Low-latency audio settings (latencyHint: 'interactive', sampleRate: 44100)

**Design System**
- CSS custom properties for theming with support for light/dark modes
- Custom Kannada font integration (Noto Sans Kannada) alongside Inter for English
- Responsive design with mobile-first approach
- Accessible component patterns using Radix UI primitives

### Backend Architecture

**Server Framework**
- **Express.js** server with TypeScript for type safety
- RESTful API design pattern for client-server communication
- Middleware-based request processing pipeline
- Custom logging middleware for API request tracking

**Data Layer**
- **Drizzle ORM** for type-safe database queries and schema management
- **PostgreSQL** dialect configuration with Neon serverless driver support
- In-memory storage implementation (MemStorage) for development/testing
- Interface-based storage abstraction (IStorage) for flexibility

**Database Schema Design**
- **Users**: Profile, progress tracking, achievements, and preferences
- **Exercises**: Categorized by type (reading/naming/conversation) and difficulty level
- **Sessions**: Track user practice sessions with DAF settings and fluency scores
- **Progress**: Daily aggregated metrics for analytics and visualization

**Session Management**
- Session lifecycle: creation → tracking → completion with metrics
- Real-time duration tracking and points calculation
- Fluency scoring system (0-100 scale)
- Progress aggregation by date for trend analysis

### Application Features

**Exercise System**
- **Reading Exercises**: Kannada passages at beginner/intermediate/advanced levels with cultural context
- **Image Naming**: South Indian cultural images with Kannada names and descriptions
- **Conversation Practice**: Structured conversation prompts for real-world scenarios

**Audio Therapy (DAF)**
- Configurable delay settings (typically 150ms)
- Real-time audio visualization with waveform display
- Volume control and enable/disable toggling
- Session recording with duration and settings tracking

**Progress Tracking**
- Points-based gamification system
- Streak tracking for consistency motivation
- Weekly progress charts with daily breakdown
- Achievement system for milestones
- Fluency score averaging and trend analysis

**Localization**
- Bilingual support (Kannada/English) with context-aware switching
- Translation system using React Context
- Kannada-first design with fallback to English
- Cultural sensitivity in content and UI design

## External Dependencies

### Core Infrastructure
- **Neon Database** (@neondatabase/serverless): Serverless PostgreSQL database hosting
- **Drizzle ORM** (drizzle-orm, drizzle-kit): Database ORM and migration tooling
- PostgreSQL as the primary database dialect

### Frontend Libraries
- **React Query** (@tanstack/react-query): Server state management
- **Radix UI** (@radix-ui/*): Accessible, unstyled component primitives for UI building
- **Wouter**: Lightweight routing library
- **React Hook Form** with **Zod** resolvers for form validation
- **date-fns**: Date manipulation and formatting

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant management
- **tailwind-merge**: Conditional class merging
- **shadcn/ui**: Pre-built component patterns

### Development Tools
- **TypeScript**: Type safety across frontend and backend
- **Vite**: Build tool with plugins for Replit integration
- **esbuild**: Production backend bundling
- **tsx**: TypeScript execution for development

### Audio Processing
- **Web Audio API** (browser native): Real-time audio manipulation
- MediaDevices API for microphone access
- AnalyserNode for audio visualization

### Session & Authentication (Configured but not fully implemented)
- **connect-pg-simple**: PostgreSQL session store support (configured for future use)
- Express session middleware preparation