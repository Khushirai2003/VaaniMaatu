import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DAFProcessor } from "@/components/audio/daf-processor";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { Play, Book, Image, MessageCircle, Award, Target, Calendar } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

// Demo user for the application
const DEMO_USER_ID = "demo-user";

export default function Home() {
  const { t, language } = useLanguage();
  const queryClient = useQueryClient();
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // Initialize demo user
  const { data: user } = useQuery({
    queryKey: ['/api/users', DEMO_USER_ID],
    queryFn: async () => {
      const response = await apiRequest('POST', '/api/users', { username: 'demo-user' });
      return response.json();
    },
  });

  // Mock demo stats data
  const stats = {
    totalPoints: 1250,
    totalMinutes: 180,
    currentStreak: 5,
    achievements: []
  };

  // Mock sessions data
  const sessions = [
    { id: '1', type: 'reading', points: 45 },
    { id: '2', type: 'naming', points: 30 },
    { id: '3', type: 'reading', points: 60 }
  ];

  // Start DAF session mutation
  const startSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/sessions', {
        userId: DEMO_USER_ID,
        type: 'daf',
        dafSettings: { delayMs: 150, enabled: true },
      });
      return response.json();
    },
    onSuccess: (session) => {
      setCurrentSessionId(session.id);
    },
  });

  // End session mutation
  const endSessionMutation = useMutation({
    mutationFn: async (duration: number) => {
      if (!currentSessionId) return;
      const response = await apiRequest('PATCH', `/api/sessions/${currentSessionId}`, {
        duration: duration * 1000, // Convert to milliseconds
        points: Math.floor(duration / 60) * 10, // 10 points per minute
        completed: true,
        fluencyScore: Math.floor(Math.random() * 30) + 70, // Random score 70-100
      });
      return response.json();
    },
    onSuccess: () => {
      setCurrentSessionId(null);
      // Invalidate stats and sessions to refresh
      queryClient.invalidateQueries({ queryKey: ['/api/users', DEMO_USER_ID, 'stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/users', DEMO_USER_ID, 'sessions'] });
    },
  });

  const handleSessionStart = () => {
    startSessionMutation.mutate();
  };

  const handleSessionEnd = (duration: number) => {
    if (currentSessionId) {
      endSessionMutation.mutate(duration);
    }
  };

  // Receive corrected sentence from DAFProcessor
  const handleCorrectedSentence = (original: string, corrected: string) => {
    // TODO: persist or show the corrected sentence in UI (e.g., toast or modal)
    console.log('Corrected:', { original, corrected });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 pt-20">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block mb-4">
                <Badge className="bg-gradient-to-r from-white/30 to-yellow-200/30 text-white px-6 py-3 rounded-full font-bold shadow-2xl border border-white/20 backdrop-blur-lg">
                  🎯 Free Voice Therapy
                </Badge>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Speak Your Voice<br />
                <span className="bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">Clearly & Confidently</span>
              </h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Overcome stuttering with Delayed Auditory Feedback (DAF) technology. Specially designed for Karnataka culture and traditions.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <Card className="text-center p-6 border-2 border-pink-200 bg-gradient-to-br from-white to-pink-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg animate-pulse">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-1" data-testid="total-sessions">
                    {sessions.length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Sessions</div>
                </Card>
                <Card className="text-center p-6 border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg animate-pulse">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-1" data-testid="total-points">
                    {stats.totalPoints}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Points</div>
                </Card>
                <Card className="text-center p-6 border-2 border-yellow-200 bg-gradient-to-br from-white to-yellow-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg animate-pulse">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-1" data-testid="current-streak">
                    {stats.currentStreak}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Days</div>
                </Card>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/exercises" className="inline-block">
                  <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-pulse-slow" data-testid="start-exercises-button">
                    <Play className="w-6 h-6" />
                    Start Now
                  </Button>
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/20 px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm" data-testid="guide-button">
                      <Book className="w-6 h-6" />
                      Guide
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                          <Book className="w-4 h-4 text-white" />
                        </div>
                        Voice Therapy Guide
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 text-lg">
                        Learn how Delayed Auditory Feedback (DAF) technology helps improve speech fluency and confidence.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-6 space-y-6">
                      <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                        <h3 className="font-semibold text-orange-800 mb-3 text-lg">How DAF Works:</h3>
                        <div className="space-y-3 text-gray-700">
                          <p className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</span>
                            Press "Start DAF & Record" to begin your session
                          </p>
                          <p className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</span>
                            Speak naturally - you'll hear your voice with a slight delay
                          </p>
                          <p className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</span>
                            The delay helps reduce stuttering and improve fluency
                          </p>
                          <p className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">4</span>
                            Track your progress with points and fluency scores
                          </p>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-blue-800 font-medium">💡 Tip: Practice regularly for 10-15 minutes daily for best results!</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose>
                        <Button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700">Got it!</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Right Content - DAF Processor */}
            <DAFProcessor 
              onSessionStart={handleSessionStart}
              onSessionEnd={handleSessionEnd}
              onCorrectedSentence={handleCorrectedSentence}
            />
          </div>
        </div>
      </section>

      {/* Quick Exercise Preview */}
      <section className="py-16 bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Exercise Types</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose from various exercises designed for Karnataka culture to improve your speech clarity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Reading Exercise Card */}
            <Link href="/exercises?type=reading">
              <Card className="p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-blue-200 hover:border-blue-400 bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-blue-100 hover:scale-105" data-testid="reading-exercise-card">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-xl animate-pulse">
                  <Book className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Reading Practice</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Read and practice with traditional Kannada passages
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Badge className="bg-orange-100 text-orange-700 border border-orange-300">3 Levels</Badge>
                  <Badge className="bg-orange-100 text-orange-700 border border-orange-300">Cultural Stories</Badge>
                </div>
              </Card>
            </Link>

            {/* Image Naming Card */}
            <Link href="/exercises?type=naming">
              <Card className="p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-pink-200 hover:border-pink-400 bg-gradient-to-br from-white to-pink-50 hover:from-pink-50 hover:to-pink-100 hover:scale-105" data-testid="naming-exercise-card">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl flex items-center justify-center mb-4 shadow-xl animate-pulse">
                  <Image className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Image Naming</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Describe Karnataka cultural objects and items
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Badge className="bg-orange-100 text-orange-700 border border-orange-300">40+ Images</Badge>
                  <Badge className="bg-orange-100 text-orange-700 border border-orange-300">Local Culture</Badge>
                </div>
              </Card>
            </Link>

            {/* Conversation Practice Card */}
            <Link href="/exercises?type=conversation">
              <Card className="p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-green-200 hover:border-green-400 bg-gradient-to-br from-white to-green-50 hover:from-green-50 hover:to-green-100 hover:scale-105" data-testid="conversation-exercise-card">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-xl animate-pulse">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Conversation Practice</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Practice real-life conversations in Kannada
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Badge className="bg-orange-100 text-orange-700 border border-orange-300">Daily Scenarios</Badge>
                  <Badge className="bg-orange-100 text-orange-700 border border-orange-300">Interactive</Badge>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Floating Language Switcher */}
      <LanguageSwitcher variant="floating" />
    </div>
  );
}