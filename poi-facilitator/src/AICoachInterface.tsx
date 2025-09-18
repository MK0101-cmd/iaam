import React, { useState, useEffect } from "react";
import {
  MessageSquare, Send, Lightbulb, Heart, Star, Sparkles,
  Volume2, VolumeX, Maximize2, Minimize2, RefreshCw
} from "lucide-react";
import { Button } from "./design-system/components";

/*
  AI Coach Interface - Sophisticated conversational AI coach
  Similar to the POY AI shown in the image with inspirational quotes,
  conversational interaction, and personalized guidance
*/

interface Message {
  id: string;
  type: "user" | "ai" | "quote" | "insight";
  content: string;
  timestamp: string;
  author?: string;
}

export default function AICoachInterface({ 
  isExpanded = false, 
  onToggleExpand,
  participantName = "Sarah"
}: {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  participantName?: string;
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(inspirationalQuotes[0]);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // Rotate quotes every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        type: "ai",
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  if (!isExpanded) {
    // Compact view
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-blue-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-blue-800">POY AI Coach</div>
              <div className="text-xs text-blue-600">Your personal guide</div>
            </div>
          </div>
          {onToggleExpand && (
            <button 
              onClick={onToggleExpand}
              className="p-1.5 rounded-lg hover:bg-blue-200 text-blue-600"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Current Quote */}
        <div className="bg-white/80 rounded-xl p-3 mb-3">
          <div className="flex items-start gap-2">
            <div className="text-2xl">💫</div>
            <div>
              <div className="text-sm font-medium text-slate-800 mb-1">
                "{currentQuote.text}"
              </div>
              <div className="text-xs text-slate-600">— {currentQuote.author}</div>
            </div>
          </div>
        </div>

        {/* Quick interaction */}
        <div className="space-y-2">
          <div className="text-xs text-blue-700">
            💡 {participantName}, I noticed you often choose transition-themed cards. 
            How are you feeling about the changes in your life right now?
          </div>
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs">
              Talk with POY
            </button>
            <button className="px-3 py-2 rounded-lg bg-white border border-blue-200 text-blue-600 text-xs">
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Expanded view
  return (
    <div className="fixed inset-4 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold">POY AI Coach</div>
            <div className="text-sm text-blue-100">Your personal growth companion</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-2 rounded-lg ${voiceEnabled ? "bg-white/20" : "bg-white/10"} hover:bg-white/30`}
          >
            {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          {onToggleExpand && (
            <button 
              onClick={onToggleExpand}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Quote Banner */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-200 p-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">💫</div>
          <div className="flex-1">
            <div className="font-medium text-slate-800 mb-1">
              "{currentQuote.text}"
            </div>
            <div className="text-sm text-slate-600">— {currentQuote.author}</div>
          </div>
          <button 
            onClick={() => setCurrentQuote(inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)])}
            className="p-2 rounded-lg hover:bg-yellow-100 text-yellow-700"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-slate-500">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Talk with POY..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="p-3 rounded-xl bg-blue-600 text-white disabled:bg-slate-300 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <div className="text-xs text-slate-500 mt-2 text-center">
          POY may make mistakes, please don't rely on its information.
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  if (message.type === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-xs bg-blue-600 text-white rounded-2xl px-4 py-2">
          <div className="text-sm">{message.content}</div>
          <div className="text-xs text-blue-200 mt-1">{message.timestamp}</div>
        </div>
      </div>
    );
  }

  if (message.type === "quote") {
    return (
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💫</div>
          <div>
            <div className="font-medium text-slate-800 mb-1">"{message.content}"</div>
            {message.author && <div className="text-sm text-slate-600">— {message.author}</div>}
          </div>
        </div>
      </div>
    );
  }

  if (message.type === "insight") {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-purple-600 mt-0.5" />
          <div>
            <div className="font-medium text-purple-800 mb-1">Personal Insight</div>
            <div className="text-sm text-slate-700">{message.content}</div>
            <div className="text-xs text-slate-500 mt-2">{message.timestamp}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
        <Sparkles className="h-4 w-4 text-white" />
      </div>
      <div className="flex-1">
        <div className="bg-slate-100 rounded-2xl px-4 py-3">
          <div className="text-sm text-slate-800">{message.content}</div>
        </div>
        <div className="text-xs text-slate-500 mt-1 ml-2">{message.timestamp}</div>
      </div>
    </div>
  );
}

// Helper function to generate AI responses
function generateAIResponse(userInput: string): string {
  const input = userInput.toLowerCase();
  
  if (input.includes("transition") || input.includes("change")) {
    return "Transitions can feel overwhelming, but they're also opportunities for growth. What aspect of this change feels most challenging to you right now? Remember, bridges aren't built in a day, but each step forward matters.";
  }
  
  if (input.includes("leadership") || input.includes("manage")) {
    return "Leadership is about serving others and creating space for them to grow. I notice you often reflect on delegation and team dynamics. What would it look like if you trusted your team completely for one week?";
  }
  
  if (input.includes("fear") || input.includes("afraid") || input.includes("scared")) {
    return "Fear is often wisdom in disguise - it's telling you that something matters to you. What if instead of avoiding the fear, you got curious about what it's trying to protect? Sometimes our biggest fears point to our most important growth edges.";
  }
  
  if (input.includes("goal") || input.includes("objective")) {
    return "Goals are like lighthouses - they give us direction, but the journey itself teaches us who we're becoming. What would success feel like, not just look like, for you?";
  }
  
  return "I hear you. It sounds like you're processing something important. What would it feel like to approach this situation with curiosity instead of judgment? Sometimes the questions we ask ourselves are more powerful than the answers we seek.";
}

// Demo data
const initialMessages: Message[] = [
  {
    id: "1",
    type: "ai",
    content: "Hello Sarah! I've been reflecting on your recent journal entries. You've shown remarkable growth in your leadership journey. How are you feeling about the changes you're experiencing?",
    timestamp: "10:30"
  },
  {
    id: "2",
    type: "quote",
    content: "If you believe you can or if you believe you can't, in both cases you are right.",
    author: "Henry Ford",
    timestamp: "10:31"
  },
  {
    id: "3",
    type: "insight",
    content: "I notice you consistently choose bridge and path cards in sessions. This suggests you're in a significant transition phase and seeking direction. Your willingness to embrace uncertainty is a strength.",
    timestamp: "10:32"
  }
];

const inspirationalQuotes = [
  {
    text: "If you believe you can or if you believe you can't, in both cases you are right.",
    author: "Henry Ford"
  },
  {
    text: "Only those who will risk going too far can possibly find out how far they can go.",
    author: "T.S. Eliot"
  },
  {
    text: "Making a decision is only the beginning of things. When someone makes a decision, he is really diving into a strong current that will carry him to places he had never dreamed of.",
    author: "Paulo Coelho"
  },
  {
    text: "The cave you fear to enter holds the treasure you seek.",
    author: "Joseph Campbell"
  },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde"
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  }
];
