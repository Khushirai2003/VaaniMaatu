import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DAFProcessor } from "@/components/audio/daf-processor";
import { useLanguage } from "@/hooks/use-language";
import { conversationPrompts, type ConversationPrompt } from "@/data/kannada-content";
import { englishConversationPrompts, type EnglishConversationPrompt } from "@/data/english-content";
import { MessageCircle, Play, Square, RotateCcw, Home, Briefcase, Calendar, MapPin } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const DEMO_USER_ID = "demo-user";

interface ConversationMessage {
  id: string;
  type: 'system' | 'user';
  content: string;
  timestamp: Date;
}

export function ConversationPractice() {
  const { t, language } = useLanguage();
  const [selectedPrompt, setSelectedPrompt] = useState<ConversationPrompt | EnglishConversationPrompt | null>(null);
  const prompts = language === 'kannada' ? conversationPrompts : englishConversationPrompts;
  const [isConversing, setIsConversing] = useState(false);
  const [sessionStart, setSessionStart] = useState<number | null>(null);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [sessionDuration, setSessionDuration] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory]);

  // Timer for session duration
  useEffect(() => {
    if (isConversing) {
      timerRef.current = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isConversing]);

  // Start conversation session
  const startSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/sessions', {
        userId: DEMO_USER_ID,
        type: 'conversation',
        exerciseId: selectedPrompt?.id,
        dafSettings: { delayMs: 150, enabled: true },
      });
      return response.json();
    },
    onSuccess: () => {
      setIsConversing(true);
      setSessionStart(Date.now());
      setSessionDuration(0);
    },
  });

  // End conversation session
  const endSessionMutation = useMutation({
    mutationFn: async (data: { sessionId: string; duration: number; fluencyScore?: number }) => {
      const response = await apiRequest('PATCH', `/api/sessions/${data.sessionId}`, {
        duration: data.duration,
        points: Math.floor(data.duration / 1000 / 60) * 25, // 25 points per minute
        completed: true,
        fluencyScore: data.fluencyScore || 75, // Use provided score or default
      });
      return response.json();
    },
    onSuccess: () => {
      setIsConversing(false);
      setSessionStart(null);
      setSessionDuration(0);
    },
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'family': return Home;
      case 'work': return Briefcase;
      case 'festival': return Calendar;
      case 'city': return MapPin;
      default: return MessageCircle;
    }
  };

  const handleSelectPrompt = (prompt: ConversationPrompt | EnglishConversationPrompt) => {
    setSelectedPrompt(prompt);
    setCurrentPromptIndex(0);
    setConversationHistory([
      {
        id: '1',
        type: 'system',
        content: prompt.prompts[0],
        timestamp: new Date(),
      }
    ]);
  };

  const handleStartConversation = () => {
    if (selectedPrompt) {
      startSessionMutation.mutate();
    }
  };

  const handleEndConversation = () => {
    if (sessionStart && startSessionMutation.data?.id) {
      const actualDuration = Date.now() - sessionStart;
      endSessionMutation.mutate({ sessionId: startSessionMutation.data.id, duration: actualDuration });
    }
  };

  const handleNextPrompt = () => {
    if (selectedPrompt && currentPromptIndex < selectedPrompt.prompts.length - 1) {
      const nextIndex = currentPromptIndex + 1;
      setCurrentPromptIndex(nextIndex);
      
      const newMessage: ConversationMessage = {
        id: Date.now().toString(),
        type: 'system',
        content: selectedPrompt.prompts[nextIndex],
        timestamp: new Date(),
      };
      
      setConversationHistory(prev => [...prev, newMessage]);
    }
  };

  const handleSessionStart = () => {
    // Already handled in startSessionMutation
  };

  const handleSessionEnd = (duration: number) => {
    // DAF processor ended, but keep conversation active
  };

  const resetConversation = () => {
    setSelectedPrompt(null);
    setIsConversing(false);
    setSessionStart(null);
    setCurrentPromptIndex(0);
    setConversationHistory([]);
    setSessionDuration(0);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Exercise Header */}
      <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-4 ${language === 'kannada' ? 'kannada-text' : ''}`}>{t('exercise.conversation')}</h2>
          <p className={`text-muted-foreground text-lg max-w-2xl mx-auto ${language === 'kannada' ? 'kannada-text' : ''}`}>
            {t('conversation.subtitle')}
          </p>
      </div>

      {!selectedPrompt ? (
        // Conversation Prompt Selection
        <div className="grid md:grid-cols-2 gap-6">
          {prompts.map((prompt) => {
            const IconComponent = getCategoryIcon(prompt.category);
            return (
              <Card 
                key={prompt.id} 
                className="p-6 card-hover cursor-pointer" 
                onClick={() => handleSelectPrompt(prompt)}
                data-testid={`conversation-prompt-${prompt.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                      <h4 className={`font-semibold mb-2 ${language === 'kannada' ? 'kannada-text' : ''}`}>{language === 'kannada' ? prompt.title : (prompt as any).englishTitle || prompt.title}</h4>
                      <p className={`text-sm text-muted-foreground mb-3 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                        {language === 'kannada' ? prompt.description : (prompt as any).englishDescription || prompt.description}
                      </p>
                      <Badge className="badge-primary text-xs">
                        {prompt.prompts.length} {t('conversation.questions')}
                      </Badge>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Conversation Display */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                  <h3 className={`text-xl font-bold ${language === 'kannada' ? 'kannada-text' : ''}`}>{language === 'kannada' ? selectedPrompt.title : (selectedPrompt as any).englishTitle || selectedPrompt.title}</h3>
                  <p className={`text-sm text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`}>{language === 'kannada' ? selectedPrompt.description : (selectedPrompt as any).englishDescription || selectedPrompt.description}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={resetConversation}
                data-testid="reset-conversation-button"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                  {t('action.reset')}
              </Button>
            </div>

            {/* Conversation History */}
            <div className="bg-muted rounded-xl p-4 mb-4 h-80 overflow-y-auto">
              <div className="space-y-4">
                {conversationHistory.map((message) => (
                  <div key={message.id} className={`flex items-start gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
                    {message.type === 'system' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`rounded-xl p-3 max-w-sm ${
                      message.type === 'system' 
                        ? 'bg-card border border-border' 
                        : 'bg-primary/10 border border-primary/20 ml-auto'
                    }`}>
                      <p className={`text-sm ${language === 'kannada' ? 'kannada-text' : ''}`}>{message.content}</p>
                      <div className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString('kn-IN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">MS</span>
                      </div>
                    )}
                  </div>
                ))}
                {isConversing && (
                  <div className="flex items-center justify-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border-2 border-primary/20">
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span className={`${language === 'kannada' ? 'kannada-text' : ''}`}>{t('session.recording') || 'Speaking...'}</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-3">
              {!isConversing ? (
                <Button 
                  onClick={handleStartConversation}
                  className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
                  data-testid="start-conversation-button"
                >
                  <Play className="w-5 h-5" />
                  {t('conversation.startConversation')}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleNextPrompt}
                    disabled={currentPromptIndex >= selectedPrompt.prompts.length - 1}
                    className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2"
                    data-testid="next-prompt-button"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t('conversation.nextQuestion')}
                  </Button>
                  <Button
                    onClick={handleEndConversation}
                    variant="outline"
                    className="px-6 py-3 flex items-center justify-center gap-2"
                    data-testid="end-conversation-button"
                  >
                    <Square className="w-4 h-4" />
                    {t('conversation.endConversation')}
                  </Button>
                </>
              )}
            </div>

            {/* Session Info */}
            {isConversing && (
              <div className="mt-4 flex items-center justify-between text-sm border-t border-border pt-4">
                <div className={`flex items-center gap-2 text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`}>
                  <MessageCircle className="w-4 h-4" />
                  <span data-testid="conversation-duration">{formatDuration(sessionDuration)}</span>
                </div>
                <div className={`text-primary font-medium ${language === 'kannada' ? 'kannada-text' : ''}`}>
                  {t('conversation.questions')} {currentPromptIndex + 1} / {selectedPrompt.prompts.length}
                </div>
              </div>
            )}
          </Card>

          {/* DAF Processor and Tips */}
          <div className="space-y-6">
            <DAFProcessor 
              onSessionStart={handleSessionStart}
              onSessionEnd={handleSessionEnd}
            />

            {/* Conversation Tips */}
            <Card className="p-6">
              <h3 className={`text-lg font-semibold mb-4 ${language === 'kannada' ? 'kannada-text' : ''}`}>{t('conversation.title')}</h3>
              
              <div className={`space-y-3 text-sm ${language === 'kannada' ? 'kannada-text' : ''}`}>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{t('tips.conversation')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{t('tips.daf') || t('tips.reading')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{t('conversation.speakNaturally')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{t('naming.suggestion3')}</span>
                </div>
              </div>

              {/* Cultural Context */}
              {selectedPrompt && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className={`font-medium mb-2 text-sm ${language === 'kannada' ? 'kannada-text' : ''}`}>{t('cultural.context')}</h4>
                  <p className="text-xs text-muted-foreground italic">
                    {language === 'kannada' ? selectedPrompt.culturalContext : (selectedPrompt as any).englishCulturalContext || selectedPrompt.culturalContext}
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
