import React, { useEffect, useMemo, useState } from "react";
import {
  PanelsTopLeft, MessagesSquare, Notebook, CalendarDays, BarChart3, LibraryBig, Settings,
  Users, Bot, Timer as TimerIcon, Play, Pause, ShieldCheck, Search, Check, X, Edit3, 
  ChevronRight, ArrowUpRight, ShoppingCart, Plus, Filter, Star, Heart, BookOpen, 
  Lightbulb, Target, Award, TrendingUp, Zap, Sparkles
} from "lucide-react";

import { Button, Card, Badge, NavItem, Avatar } from "./design-system/components";

// Updated POY Facilitator Console with unified design system
// Features: Modern UI, consistent styling, enhanced UX, preserved functionality

/* ——— Enhanced Phase Construction Component ——— */
function PhaseConstruction({ step }: { step: number }) {
  const phases = [
    {
      name: "Pause",
      description: "Welcome and emotional check-in",
      color: "from-sage-400 to-sage-600",
      icon: "🧘‍♀️",
      elements: [
        { type: "word", title: "One-word check-in", description: "Quick emotional temperature check", icon: "💭" },
        { type: "prompt", title: "How are you feeling?", description: "Open question for sharing", icon: "❓" },
        { type: "visual", title: "Welcome Card", description: "Visual welcome and setting intention", icon: "🎨" },
        { type: "exercise", title: "Two-word check-in", description: "Deeper emotional awareness", icon: "🔄" }
      ]
    },
    {
      name: "Expand", 
      description: "Card selection and reflection",
      color: "from-ocean-400 to-ocean-600",
      icon: "🌊",
      elements: [
        { type: "deck", title: "POY Coaching Game", description: "65 carefully selected photo cards", icon: "🎴" },
        { type: "visual", title: "Card Selection Guide", description: "Visual guide for choosing meaningful cards", icon: "🗺️" },
        { type: "prompt", title: "What do you notice?", description: "Observation-based reflection", icon: "👁️" },
        { type: "exercise", title: "Card Dialogue", description: "Partners ask questions based on cards", icon: "💬" }
      ]
    },
    {
      name: "Focus",
      description: "Group sharing and theme identification",
      color: "from-sunset-400 to-sunset-600", 
      icon: "🎯",
      elements: [
        { type: "prompt", title: "Share your sentence", description: "One sentence connecting card to transition", icon: "📝" },
        { type: "visual", title: "Theme Mapping Board", description: "Visual board for identifying shared themes", icon: "🗃️" },
        { type: "exercise", title: "Theme identification", description: "Listen for patterns and connections", icon: "🔍" },
        { type: "template", title: "Group reflection", description: "Structured sharing format", icon: "📋" }
      ]
    },
    {
      name: "Doing",
      description: "Action commitment and next steps",
      color: "from-primary-400 to-primary-600",
      icon: "🚀",
      elements: [
        { type: "prompt", title: "What's one small step?", description: "Action-oriented forward movement", icon: "👣" },
        { type: "visual", title: "Action Planning Canvas", description: "Visual canvas for mapping next steps", icon: "🗺️" },
        { type: "exercise", title: "Action planning", description: "Concrete next steps", icon: "📝" },
        { type: "template", title: "Commitment sharing", description: "Public accountability structure", icon: "🤝" }
      ]
    }
  ];

  const currentPhase = phases[step - 1];

  const getElementTypeColor = (type: string) => {
    const colors = {
      word: "bg-sage-100 text-sage-800 border-sage-200",
      prompt: "bg-ocean-100 text-ocean-800 border-ocean-200",
      exercise: "bg-sunset-100 text-sunset-800 border-sunset-200",
      deck: "bg-primary-100 text-primary-800 border-primary-200",
      template: "bg-secondary-100 text-secondary-800 border-secondary-200",
      visual: "bg-purple-100 text-purple-800 border-purple-200"
    };
    return colors[type as keyof typeof colors] || "bg-neutral-100 text-neutral-800 border-neutral-200";
  };

  return (
    <Card variant="warm" className="animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-10 h-10 rounded-2xl bg-gradient-to-r ${currentPhase.color} flex items-center justify-center text-white text-lg shadow-warm-md`}>
            {currentPhase.icon}
          </div>
          <div>
            <h3 className="text-lg font-display font-semibold text-neutral-900">{currentPhase.name}</h3>
            <p className="text-sm text-neutral-600">{currentPhase.description}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-neutral-700">Phase Elements</h4>
          <Badge variant="primary" size="sm">{currentPhase.elements.length} items</Badge>
        </div>
        
        {currentPhase.elements.map((element, index) => (
          <div key={index} className="group">
            <Card 
              variant="interactive" 
              padding="sm" 
              className="border border-neutral-200 hover:border-primary-300 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 flex items-center justify-center text-lg shadow-sm group-hover:shadow-md transition-shadow">
                    {element.icon}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-medium text-neutral-900 truncate">{element.title}</h5>
                    <Badge 
                      variant="neutral" 
                      size="sm" 
                      className={getElementTypeColor(element.type)}
                    >
                      {element.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-600 line-clamp-2">{element.description}</p>
                </div>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="xs" variant="ghost" className="p-1.5">
                    <Edit3 className="w-3 h-3" />
                  </Button>
                  <Button size="xs" variant="outline" className="p-1.5">
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-neutral-200">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Add Element
          </Button>
          <Button variant="primary" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
            Next Phase
          </Button>
        </div>
      </div>
    </Card>
  );
}

/* ——— Enhanced Navigation Item Component ——— */
function EnhancedNavItem({ 
  icon, 
  label, 
  description, 
  active = false, 
  badge, 
  href,
  onClick 
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  active?: boolean;
  badge?: string | number;
  href?: string;
  onClick?: () => void;
}) {
  const handleClick = () => {
    if (href) {
      window.location.hash = href;
    }
    onClick?.();
  };

  return (
    <div 
      className={`
        nav-item-poy group
        ${active ? 'nav-item-poy-active' : 'nav-item-poy-inactive'}
      `}
      onClick={handleClick}
    >
      <div className="flex-shrink-0 transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-medium truncate">{label}</span>
          {badge && (
            <Badge variant={active ? "primary" : "neutral"} size="sm" className="ml-2">
              {badge}
            </Badge>
          )}
        </div>
        <p className="text-xs text-current opacity-70 mt-0.5 truncate">{description}</p>
      </div>
    </div>
  );
}

/* ——— Enhanced AI Co-pilot Panel ——— */
function EnhancedAICopilotPanel() {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const nudges = [
    { 
      id: "n1", 
      title: "Invite open questions", 
      reason: "Open-Q ratio dropped to 18%", 
      suggestion: "How might this card be calling you to take a first step?", 
      difficulty: 1,
      type: "engagement",
      icon: "❓"
    },
    { 
      id: "n2", 
      title: "Reflect & validate", 
      reason: "Tension spike detected for Leah", 
      suggestion: "I'm hearing both courage and uncertainty in what you shared.", 
      difficulty: 2,
      type: "emotional",
      icon: "💝"
    },
    { 
      id: "n3", 
      title: "Encourage sharing", 
      reason: "3 participants haven't spoken in 8 minutes", 
      suggestion: "Let's hear from those who haven't shared yet.", 
      difficulty: 1,
      type: "participation",
      icon: "🎤"
    }
  ];

  const getDifficultyColor = (difficulty: number) => {
    const colors = {
      1: "bg-semantic-success-100 text-semantic-success-800 border-semantic-success-200",
      2: "bg-semantic-warning-100 text-semantic-warning-800 border-semantic-warning-200",
      3: "bg-semantic-error-100 text-semantic-error-800 border-semantic-error-200"
    };
    return colors[difficulty as keyof typeof colors];
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      engagement: "🎯",
      emotional: "💝", 
      participation: "🎤",
      flow: "🌊"
    };
    return icons[type as keyof typeof icons] || "💡";
  };

  return (
    <Card variant="elevated" className="glass-poy">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900">AI Co-pilot</h3>
            <p className="text-xs text-neutral-600">Live session insights</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="xs" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="opacity-60 hover:opacity-100"
        >
          {isExpanded ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-3 animate-slide-up">
          {nudges.map((nudge, index) => (
            <Card 
              key={nudge.id} 
              variant="interactive" 
              padding="sm"
              className="border border-neutral-200 hover:border-primary-300 transition-all duration-200"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 flex items-center justify-center text-sm">
                    {getTypeIcon(nudge.type)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm text-neutral-900">{nudge.title}</h4>
                    <Badge 
                      size="sm" 
                      className={getDifficultyColor(nudge.difficulty)}
                    >
                      Level {nudge.difficulty}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-neutral-600 mb-2">{nudge.reason}</p>
                  
                  <div className="bg-neutral-50 rounded-lg p-2 mb-2">
                    <p className="text-xs font-medium text-neutral-800 italic">
                      "{nudge.suggestion}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="xs" variant="primary">
                      Use Suggestion
                    </Button>
                    <Button size="xs" variant="ghost">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          
          <div className="pt-3 border-t border-neutral-200">
            <div className="flex items-center justify-between text-xs text-neutral-600">
              <span>Session insights updating...</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-semantic-success-500 rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

/* ——— Main Enhanced Facilitator Console Component ——— */
export default function FacilitatorConsoleMockupUpdated() {
  const [step, setStep] = useState(1);
  const [selectedView, setSelectedView] = useState<'journey' | 'live' | 'marketplace'>('journey');

  // Mock session data
  const sessionStats = {
    activeParticipants: 8,
    completionRate: 75,
    engagementScore: 4.2,
    timeRemaining: "23 min"
  };

  return (
    <div className="h-screen w-full bg-background-primary text-neutral-900 flex overflow-hidden font-body">
      {/* Enhanced Left Navigation */}
      <aside className="w-64 bg-background-secondary border-r border-neutral-200 flex flex-col overflow-hidden">
        {/* Brand Header */}
        <div className="p-4 border-b border-neutral-200">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => { location.hash = "/studio"; }}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-warm-md group-hover:shadow-warm-lg transition-shadow">
              <PanelsTopLeft className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-gradient-primary">Studio</h1>
              <p className="text-xs text-neutral-600">Points of You AI</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
          <EnhancedNavItem 
            icon={<Notebook className="w-4 h-4" />} 
            label="Journeys" 
            description="Your structured programs and templates"
            active={selectedView === 'journey'}
            onClick={() => setSelectedView('journey')}
          />
          <EnhancedNavItem 
            icon={<MessagesSquare className="w-4 h-4" />} 
            label="On-Air" 
            description="Live and scheduled sessions"
            badge="3"
            href="/session"
          />
          <EnhancedNavItem 
            icon={<LibraryBig className="w-4 h-4" />} 
            label="Library" 
            description="Decks, prompts, exercises"
            href="/library"
          />
          <EnhancedNavItem 
            icon={<Users className="w-4 h-4" />} 
            label="Clients" 
            description="People & cohorts"
            badge="24"
            href="/clients"
          />
          <EnhancedNavItem 
            icon={<CalendarDays className="w-4 h-4" />} 
            label="Calendar" 
            description="Availability & invites"
            href="/calendar"
          />
          <EnhancedNavItem 
            icon={<BarChart3 className="w-4 h-4" />} 
            label="Reports" 
            description="Outcomes & trends"
            href="/reports"
          />
          <EnhancedNavItem 
            icon={<ShoppingCart className="w-4 h-4" />} 
            label="Marketplace" 
            description="Templates, decks & training"
            active={selectedView === 'marketplace'}
            badge="New"
            onClick={() => setSelectedView('marketplace')}
          />
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-neutral-200">
          <div className="flex items-center gap-3">
            <Avatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
              name="Marcus Johnson" 
              size="md"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-neutral-900 truncate">Marcus Johnson</p>
              <p className="text-xs text-neutral-600">Certified Facilitator</p>
            </div>
            <Button variant="ghost" size="xs">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Enhanced Header */}
        <header className="bg-background-elevated border-b border-neutral-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display font-semibold text-neutral-900">
                Leadership Transition Workshop
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                Building bridges between current and future leadership roles
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Session Stats */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary-600" />
                  <span className="font-medium">{sessionStats.activeParticipants}</span>
                  <span className="text-neutral-600">participants</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-semantic-success-600" />
                  <span className="font-medium">{sessionStats.engagementScore}</span>
                  <span className="text-neutral-600">engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <TimerIcon className="w-4 h-4 text-neutral-600" />
                  <span className="font-medium">{sessionStats.timeRemaining}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" leftIcon={<Pause className="w-4 h-4" />}>
                  Pause
                </Button>
                <Button variant="primary" size="sm" leftIcon={<Play className="w-4 h-4" />}>
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Grid */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full grid grid-cols-12 gap-6 p-6">
            {/* Main Journey Builder */}
            <div className="col-span-8 space-y-6 overflow-y-auto scrollbar-thin">
              {/* Phase Navigation */}
              <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-lg text-neutral-900">
                    Journey Phases
                  </h3>
                  <Badge variant="primary">Phase {step} of 4</Badge>
                </div>
                
                <div className="flex items-center gap-4">
                  {[1, 2, 3, 4].map((phaseNum) => (
                    <button
                      key={phaseNum}
                      onClick={() => setStep(phaseNum)}
                      className={`
                        flex-1 p-3 rounded-xl border-2 transition-all duration-200
                        ${step === phaseNum 
                          ? 'border-primary-500 bg-primary-100 shadow-warm-md' 
                          : 'border-neutral-200 bg-white hover:border-primary-300 hover:shadow-sm'
                        }
                      `}
                    >
                      <div className="text-center">
                        <div className={`
                          w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold
                          ${step === phaseNum 
                            ? 'bg-primary-500 text-white' 
                            : 'bg-neutral-200 text-neutral-600'
                          }
                        `}>
                          {phaseNum}
                        </div>
                        <p className={`
                          text-sm font-medium
                          ${step === phaseNum ? 'text-primary-800' : 'text-neutral-700'}
                        `}>
                          {['Pause', 'Expand', 'Focus', 'Doing'][phaseNum - 1]}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Phase Construction */}
              <PhaseConstruction step={step} />

              {/* Quick Actions */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral-900">Quick Actions</h3>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-sm">Templates</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                    <Lightbulb className="w-5 h-5" />
                    <span className="text-sm">AI Suggest</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                    <Target className="w-5 h-5" />
                    <span className="text-sm">Preview</span>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-4 space-y-6 overflow-y-auto scrollbar-thin">
              {/* AI Co-pilot */}
              <EnhancedAICopilotPanel />

              {/* Live Session Stats */}
              <Card variant="elevated">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-semantic-success-500 to-semantic-success-600 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Live Session</h3>
                    <p className="text-xs text-neutral-600">Real-time insights</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Completion Rate</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-semantic-success-500 to-semantic-success-600 transition-all duration-500"
                          style={{ width: `${sessionStats.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{sessionStats.completionRate}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Active Participants</span>
                    <Badge variant="success">{sessionStats.activeParticipants}/8</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Engagement Score</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-3 h-3 ${
                            star <= Math.floor(sessionStats.engagementScore) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-neutral-300'
                          }`} 
                        />
                      ))}
                      <span className="text-sm font-medium ml-1">{sessionStats.engagementScore}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card>
                <h3 className="font-semibold text-neutral-900 mb-4">Recent Activity</h3>
                
                <div className="space-y-3">
                  {[
                    { user: "Sarah Chen", action: "completed reflection", time: "2 min ago", avatar: "SC" },
                    { user: "David Kim", action: "selected new card", time: "5 min ago", avatar: "DK" },
                    { user: "Maria Lopez", action: "joined breakout room", time: "8 min ago", avatar: "ML" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar name={activity.user} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-neutral-900">
                          <span className="font-medium">{activity.user}</span>
                          {' '}
                          <span className="text-neutral-600">{activity.action}</span>
                        </p>
                        <p className="text-xs text-neutral-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

