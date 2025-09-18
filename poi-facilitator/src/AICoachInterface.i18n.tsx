import React, { useState, useEffect } from "react";
import {
  MessageSquare, Send, Lightbulb, Heart, Star, Sparkles,
  Volume2, VolumeX, Maximize2, Minimize2, RefreshCw
} from "lucide-react";
import { Button } from "./design-system/components";
import { useTranslation } from './hooks/useTranslation';

/*
  AI Coach Interface - Multilingual conversational AI coach
  Enhanced with i18n support for global accessibility
*/

interface Message {
  id: string;
  type: "user" | "ai" | "quote" | "insight";
  content: string;
  timestamp: string;
  author?: string;
}

// Multilingual inspirational quotes
const getInspirationalQuotes = (t: any) => [
  {
    text: t('aiCoach.quotes.growth'),
    author: "Maya Angelou"
  },
  {
    text: t('aiCoach.quotes.change'),
    author: "Gandhi"
  },
  {
    text: t('aiCoach.quotes.journey'),
    author: "Lao Tzu"
  },
  {
    text: t('aiCoach.quotes.potential'),
    author: "William James"
  },
  {
    text: t('aiCoach.quotes.perspective'),
    author: "Wayne Dyer"
  },
  {
    text: t('aiCoach.quotes.courage'),
    author: "Nelson Mandela"
  },
  {
    text: t('aiCoach.quotes.wisdom'),
    author: "Rumi"
  },
  {
    text: t('aiCoach.quotes.mindfulness'),
    author: "Thich Nhat Hanh"
  }
];

export default function AICoachInterface({ 
  isExpanded = false, 
  onToggleExpand,
  participantName = "Sarah"
}: {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  participantName?: string;
}) {
  const { t, isRTL, getDirectionClasses, formatRelativeTime } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<any>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const inspirationalQuotes = getInspirationalQuotes(t);

  // Initialize current quote
  useEffect(() => {
    if (inspirationalQuotes.length > 0 && !currentQuote) {
      setCurrentQuote(inspirationalQuotes[0]);
    }
  }, [inspirationalQuotes, currentQuote]);

  // Initialize with welcome message
  useEffect(() => {
    const initialMessage: Message = {
      id: "welcome",
      type: "ai",
      content: t('aiCoach.welcome', { name: participantName }),
      timestamp: new Date().toISOString()
    };
    setMessages([initialMessage]);
  }, [t, participantName]);

  // Rotate quotes every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (inspirationalQuotes.length > 0) {
        setCurrentQuote(inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [inspirationalQuotes]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      type: "user",
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, t);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        type: "ai",
        content: aiResponse,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const generateAIResponse = (input: string, t: any): string => {
    const lowerInput = input.toLowerCase();
    
    // Contextual responses based on keywords
    if (lowerInput.includes(t('aiCoach.keywords.transition').toLowerCase()) || 
        lowerInput.includes(t('aiCoach.keywords.change').toLowerCase())) {
      return t('aiCoach.responses.transition');
    }
    
    if (lowerInput.includes(t('aiCoach.keywords.leadership').toLowerCase()) || 
        lowerInput.includes(t('aiCoach.keywords.leading').toLowerCase())) {
      return t('aiCoach.responses.leadership');
    }
    
    if (lowerInput.includes(t('aiCoach.keywords.fear').toLowerCase()) || 
        lowerInput.includes(t('aiCoach.keywords.anxiety').toLowerCase())) {
      return t('aiCoach.responses.fear');
    }
    
    if (lowerInput.includes(t('aiCoach.keywords.goals').toLowerCase()) || 
        lowerInput.includes(t('aiCoach.keywords.objectives').toLowerCase())) {
      return t('aiCoach.responses.goals');
    }

    // Default responses
    const defaultResponses = [
      t('aiCoach.responses.reflection'),
      t('aiCoach.responses.exploration'),
      t('aiCoach.responses.insight'),
      t('aiCoach.responses.encouragement')
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isExpanded) {
    return (
      <div className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50`}>
        <div className="bg-white rounded-full p-3 shadow-lg border border-neutral-200 hover:shadow-xl transition-all duration-300 animate-gentle-bounce">
          <button
            onClick={onToggleExpand}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
            aria-label={t('aiCoach.title')}
          >
            <MessageSquare className="w-6 h-6" />
            <span className="font-medium text-sm">{t('aiCoach.title')}</span>
          </button>
        </div>

        {/* Floating quote */}
        {currentQuote && (
          <div className={`absolute bottom-full mb-4 ${isRTL ? 'left-0' : 'right-0'} w-80 bg-white rounded-lg p-4 shadow-lg border border-neutral-200 animate-fade-in`}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-neutral-700 italic mb-2">"{currentQuote.text}"</p>
                <p className="text-xs text-neutral-500">— {currentQuote.author}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-neutral-200 z-50 flex flex-col animate-slide-up`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900">{t('aiCoach.title')}</h3>
            <p className="text-xs text-neutral-500">{t('aiCoach.subtitle')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-2 rounded-lg transition-colors ${
              voiceEnabled 
                ? 'bg-primary-100 text-primary-600' 
                : 'hover:bg-neutral-100 text-neutral-600'
            }`}
            aria-label={voiceEnabled ? t('aiCoach.voice.disable') : t('aiCoach.voice.enable')}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          
          <button
            onClick={onToggleExpand}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-600"
            aria-label={t('common.close')}
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin" dir={isRTL ? 'rtl' : 'ltr'}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 
              (isRTL ? 'justify-start' : 'justify-end') : 
              (isRTL ? 'justify-end' : 'justify-start')
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.type === 'user'
                  ? 'bg-primary-500 text-white chat-bubble-user'
                  : message.type === 'quote'
                  ? 'bg-yellow-50 border border-yellow-200 text-yellow-800'
                  : message.type === 'insight'
                  ? 'bg-purple-50 border border-purple-200 text-purple-800'
                  : 'bg-neutral-100 text-neutral-800 chat-bubble-ai'
              }`}
            >
              {message.type === 'quote' && (
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4" />
                  <span className="text-xs font-medium">{t('aiCoach.quotes.title')}</span>
                </div>
              )}
              
              {message.type === 'insight' && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-medium">{t('aiCoach.insights')}</span>
                </div>
              )}
              
              <p className="text-sm leading-relaxed">{message.content}</p>
              
              <div className={`text-xs opacity-70 mt-2 ${getDirectionClasses()}`}>
                {formatRelativeTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
            <div className="bg-neutral-100 rounded-2xl px-4 py-2 chat-bubble-ai">
              <div className="flex items-center gap-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-xs text-neutral-500 ml-2">{t('aiCoach.thinking')}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Current Quote Display */}
      {currentQuote && (
        <div className="px-4 py-3 bg-gradient-to-r from-primary-50 to-secondary-50 border-t border-neutral-200">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-primary-600" />
            <span className="text-xs font-medium text-primary-700">{t('aiCoach.quotes.title')}</span>
          </div>
          <p className="text-sm text-neutral-700 italic">"{currentQuote.text}"</p>
          <p className="text-xs text-neutral-500 mt-1">— {currentQuote.author}</p>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-neutral-200">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('aiCoach.placeholder')}
              className={`w-full px-4 py-3 border border-neutral-200 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${getDirectionClasses()}`}
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('aiCoach.send')}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

