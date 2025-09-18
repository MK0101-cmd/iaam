import React, { useEffect, useMemo, useState } from "react";
import {
  PanelsTopLeft, MessagesSquare, Notebook, CalendarDays, BarChart3, LibraryBig, Settings,
  Users, Bot, Timer as TimerIcon, Play, Pause, ShieldCheck, Search, Check, X, Edit3, ChevronRight, ArrowUpRight, ShoppingCart
} from "lucide-react";
import { Button } from "./design-system/components";

// POY Facilitator Console – integrated mockup with Zoom/Meet UI hooks
// Tailwind-first UI. No backend; all data mocked. Compatible with Vite + Tailwind v4 or v3.

/* ——— Phase Construction Component ——— */
function PhaseConstruction({ step }: { step: number }) {
  const phases = [
    {
      name: "Pause",
      description: "Welcome and emotional check-in",
      elements: [
        { type: "word", title: "One-word check-in", description: "Quick emotional temperature check" },
        { type: "prompt", title: "How are you feeling?", description: "Open question for sharing" },
        { type: "visual", title: "Welcome Card", description: "Visual welcome and setting intention" },
        { type: "exercise", title: "Two-word check-in", description: "Deeper emotional awareness" }
      ]
    },
    {
      name: "Expand", 
      description: "Card selection and reflection",
      elements: [
        { type: "deck", title: "POY Coaching Game", description: "65 carefully selected photo cards" },
        { type: "visual", title: "Card Selection Guide", description: "Visual guide for choosing meaningful cards" },
        { type: "prompt", title: "What do you notice?", description: "Observation-based reflection" },
        { type: "exercise", title: "Card Dialogue", description: "Partners ask questions based on cards" }
      ]
    },
    {
      name: "Focus",
      description: "Group sharing and theme identification", 
      elements: [
        { type: "prompt", title: "Share your sentence", description: "One sentence connecting card to transition" },
        { type: "visual", title: "Theme Mapping Board", description: "Visual board for identifying shared themes" },
        { type: "exercise", title: "Theme identification", description: "Listen for patterns and connections" },
        { type: "template", title: "Group reflection", description: "Structured sharing format" }
      ]
    },
    {
      name: "Doing",
      description: "Action commitment and next steps",
      elements: [
        { type: "prompt", title: "What's one small step?", description: "Action-oriented forward movement" },
        { type: "visual", title: "Action Planning Canvas", description: "Visual canvas for mapping next steps" },
        { type: "exercise", title: "Action planning", description: "Concrete next steps" },
        { type: "template", title: "Commitment sharing", description: "Public accountability structure" }
      ]
    }
  ];

  const currentPhase = phases[step - 1];

  return (
    <div className="bg-white/80 border border-black/5 rounded-2xl p-4">
      <div className="mb-4">
        <div className="text-sm font-semibold text-emerald-700">{currentPhase.name}</div>
        <div className="text-xs text-slate-600">{currentPhase.description}</div>
      </div>
      
      <div className="space-y-3">
        <div className="text-xs font-medium text-slate-700 mb-2">Library Elements Used:</div>
        {currentPhase.elements.map((element, index) => (
          <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center">
              {element.type === "word" && <span className="text-xs font-bold">W</span>}
              {element.type === "prompt" && <span className="text-xs font-bold">P</span>}
              {element.type === "exercise" && <span className="text-xs font-bold">E</span>}
              {element.type === "deck" && <span className="text-xs font-bold">D</span>}
              {element.type === "template" && <span className="text-xs font-bold">T</span>}
              {element.type === "visual" && <span className="text-xs font-bold">V</span>}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{element.title}</div>
              <div className="text-xs text-slate-600">{element.description}</div>
            </div>
            <div className="flex items-center gap-2">
            <div className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
              {element.type}
              </div>
              <div className="flex flex-col gap-1">
                <button 
                  className="px-1.5 py-0.5 text-xs rounded bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={index === 0}
                  title="Move up"
                >
                  ↑
                </button>
                <button 
                  className="px-1.5 py-0.5 text-xs rounded bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={index === currentPhase.elements.length - 1}
                  title="Move down"
                >
                  ↓
                </button>
              </div>
              <Button variant="soft" size="xs">
                Modify
              </Button>
              <Button variant="soft-danger" size="xs">
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-200">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600">Total elements: {currentPhase.elements.length}</span>
          <div className="flex gap-2">
            <Button variant="primary" size="sm">
              New Element
            </Button>
          <Button variant="sage" size="sm">
              Load Element
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FacilitatorConsoleMockup() {
  const [step, setStep] = useState(1);
  const [breakoutOpen, setBreakoutOpen] = useState(false);
  const [running, setRunning] = useState(true);
  const [search, setSearch] = useState("");

  // Meeting state (Zoom/Meet)
  const [meetingProvider, setMeetingProvider] = useState<Provider | null>(null);
  const [meetingState, setMeetingState] = useState<MeetingState>("none");
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(false);

  const filteredPrompts = useMemo(
    () => promptLibrary.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.join(" ").toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  // Simulated meeting handlers
  function handleMeetingMenu() { setShowMeetingModal(true); }
  function handleCreateMeeting(p: Provider, when: "now" | "later") {
    setMeetingProvider(p);
    setMeetingState(when === "now" ? "live" : "scheduled");
    setShowMeetingModal(false);
    setCaptionsOn(false);
  }
  function handleStart() { if (meetingProvider) setMeetingState("live"); }
  function handleJoin() { /* noop: would open provider link */ }
  function handleEnd() { setMeetingState("ended"); setCaptionsOn(false); }

  // --- Dev smoke tests (non-intrusive) ---
  useEffect(() => {
    const DEV_TEST = false; // set true to log assertions in console
    if (!DEV_TEST) return;
    console.assert(document.querySelectorAll("nav .group").length >= 6, "Nav items should render");
    console.assert(!!document.querySelector("[data-test='meeting-pill']"), "Meeting pill should render");
  }, []);

  return (
    <div className="h-screen w-full bg-[#f6efe6] text-slate-900 grid grid-cols-12 overflow-hidden">
      {/* Left Nav */}
      <aside className="col-span-2 min-w-[220px] bg-[#efe6d8] border-r border-black/5 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
        <div className="px-4 py-4 flex items-center gap-2 text-slate-700 cursor-pointer" onClick={() => { location.hash = "/studio"; }}>
          <PanelsTopLeft className="h-5 w-5" />
          <span className="font-semibold tracking-wide">Studio</span>
        </div>
        <nav className="px-2 py-2 space-y-1 text-sm">
          <NavItem icon={<Notebook className="h-4 w-4" />} label="Journeys" active>
            Your structured programs and templates
          </NavItem>
          <NavItem icon={<MessagesSquare className="h-4 w-4" />} label="On-Air" onClick={() => { location.hash = "/session"; }}>
            Live and scheduled sessions
          </NavItem>
          <NavItem icon={<LibraryBig className="h-4 w-4" />} label="Library" onClick={() => { location.hash = "/library"; }}>
            Decks, prompts, exercises
          </NavItem>
          <NavItem icon={<Users className="h-4 w-4" />} label="Clients" onClick={() => { location.hash = "/clients"; }}>
            People & cohorts
          </NavItem>
          <NavItem icon={<CalendarDays className="h-4 w-4" />} label="Calendar" onClick={() => { location.hash = "/calendar"; }}>
            Availability & invites
          </NavItem>
          <NavItem icon={<BarChart3 className="h-4 w-4" />} label="Reports" onClick={() => { location.hash = "/reports"; }}>
            Outcomes & trends
          </NavItem>
          <NavItem icon={<ShoppingCart className="h-4 w-4" />} label="Marketplace" onClick={() => { location.hash = "/marketplace"; }}>
            Templates, decks & training
          </NavItem>
        </nav>
        <div className="mt-auto p-3 border-t border-black/5 space-y-3">
          <button 
            onClick={() => { location.hash = "#participant/dashboard"; }}
            className="w-full px-3 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center justify-center gap-2 shadow-sm"
          >
            👤 Switch to Participant View
          </button>
          <div className="flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2"><Settings className="h-4 w-4" /> Settings</div>
            <div className="rounded-full bg-emerald-600 text-white text-[10px] px-2 py-1">Beta</div>
          </div>
        </div>
      </aside>

      {/* Center Stage */}
      <main className="col-span-7 flex flex-col overflow-hidden">
        {/* Header - Hidden when blank */}

        {/* Stage body */}
        <div className="flex-1 flex flex-col min-h-0">
          <section className="flex-1 p-4 overflow-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
            {/* Active Journey Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Active Journey</h2>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-slate-600">Step {step} of 4</div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      Load Journey
                    </Button>
                    <Button variant="sage" size="sm">
                      Activate Journey
                    </Button>
                    <Button variant="soft-danger" size="sm">
                      Deactivate Journey
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 border border-black/5 rounded-2xl p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-emerald-700">Crossing Inner Bridges</h3>
                  <p className="text-sm text-slate-600">A journey for transitions</p>
                </div>

            {/* Presenter tools */}
                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
              <ToolBadge label="Reveal" />
              <ToolBadge label="Timer" />
              <ToolBadge label="Poll" />
              <ToolBadge label="Whiteboard" />
              <ToolBadge label="Switch deck" />
              <ToolBadge label="Mark off-record" />
            </div>

            {/* Agenda strip */}
                <div className="mb-6 grid grid-cols-4 gap-2 text-xs">
              {["Pause", "Expand", "Focus", "Doing"].map((s, i) => (
                <div key={s} className={`rounded-xl px-2 py-2 border ${i + 1 === step ? "bg-emerald-50 border-emerald-300" : "bg-white/70 border-black/5"}`}>
                  <div className="font-medium text-center">{i + 1}. {s}</div>
                  <div className="text-slate-500 text-center">{i + 1 === step ? "In progress" : i + 1 < step ? "Done" : "Queued"}</div>
                </div>
              ))}
            </div>

              </div>
            </div>

            {/* Journey Builder Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Journey Builder</h2>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm">
                    New
                  </Button>
                  <Button variant="secondary" size="sm">
                    Load
                  </Button>
                  <Button variant="soft-success" size="sm">
                    Save
                  </Button>
                  <Button variant="sage" size="sm">
                    Save to Library
                  </Button>
                  <Button variant="soft-warning" size="sm">
                    Reset
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Journey Details */}
                <div className="bg-white/80 border border-black/5 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold mb-4">Journey Details</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Journey Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Journey Name</label>
                      <input 
                        type="text" 
                        defaultValue="New Leadership Development Journey"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300"
                        placeholder="Enter journey name..."
                      />
                    </div>

                    {/* Timeframe */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Timeframe</label>
                      <select className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300">
                        <option value="single">Single Session (2-4 hours)</option>
                        <option value="half-day">Half Day (4-6 hours)</option>
                        <option value="full-day">Full Day (6-8 hours)</option>
                        <option value="multi-day">Multi-Day (2-5 days)</option>
                        <option value="weekly">Weekly Series (4-8 weeks)</option>
                        <option value="monthly">Monthly Series (3-12 months)</option>
                      </select>
                    </div>
                  </div>

                  {/* Goals */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Journey Goals</label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          defaultValue="Help participants navigate life transitions"
                          className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300"
                          placeholder="Enter a goal..."
                        />
                        <Button variant="ghost-danger" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          defaultValue="Build emotional awareness and resilience"
                          className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300"
                          placeholder="Enter a goal..."
                        />
                        <Button variant="ghost-danger" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          defaultValue="Create meaningful connections through shared experiences"
                          className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300"
                          placeholder="Enter a goal..."
                        />
                        <Button variant="ghost-danger" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="outline-success" size="sm" leftIcon={<span className="text-lg">+</span>}>
                        Add Goal
                      </Button>
                    </div>
                  </div>

                  {/* Journey Description */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                    <textarea 
                      rows={3}
                      defaultValue="A transformative journey designed to help individuals navigate life transitions through guided reflection, card-based exercises, and group sharing. This journey combines the power of visual storytelling with structured facilitation to create meaningful breakthroughs."
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300"
                      placeholder="Describe your journey..."
                    />
                  </div>
                </div>

                {/* Phases Overview */}
                <div className="bg-white/80 border border-black/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">Phases</h4>
                    <Button variant="sage" size="sm">
                      + Add Phase
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { 
                        name: "Pause", 
                        description: "Welcome and emotional check-in", 
                        color: "blue", 
                        elements: [
                          { type: "word", title: "One-word check-in" },
                          { type: "prompt", title: "How are you feeling?" },
                          { type: "visual", title: "Welcome Card" },
                          { type: "exercise", title: "Two-word check-in" }
                        ]
                      },
                      { 
                        name: "Expand", 
                        description: "Card selection and reflection", 
                        color: "green", 
                        elements: [
                          { type: "deck", title: "POY Coaching Game" },
                          { type: "visual", title: "Card Selection Guide" },
                          { type: "prompt", title: "What do you notice?" },
                          { type: "exercise", title: "Card Dialogue" }
                        ]
                      },
                      { 
                        name: "Focus", 
                        description: "Group sharing and theme identification", 
                        color: "purple", 
                        elements: [
                          { type: "prompt", title: "Share your sentence" },
                          { type: "visual", title: "Theme Mapping Board" },
                          { type: "exercise", title: "Theme identification" },
                          { type: "template", title: "Group reflection" }
                        ]
                      },
                      { 
                        name: "Doing", 
                        description: "Action commitment and next steps", 
                        color: "orange", 
                        elements: [
                          { type: "prompt", title: "What's one small step?" },
                          { type: "visual", title: "Action Planning Canvas" },
                          { type: "exercise", title: "Action planning" },
                          { type: "template", title: "Commitment sharing" }
                        ]
                      }
                    ].map((phase, index) => (
                      <div key={phase.name} className={`rounded-xl border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
                        index + 1 === step 
                          ? `border-${phase.color}-300 bg-${phase.color}-50` 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-3 h-3 rounded-full bg-${phase.color}-500`}></div>
                          <span className="text-xs text-slate-500">{phase.elements.length} elements</span>
                        </div>
                        <h5 className="font-semibold text-sm mb-1">{phase.name}</h5>
                        <p className="text-xs text-slate-600 mb-3">{phase.description}</p>
                        
                        {/* Elements List */}
                        <div className="space-y-1 mb-3">
                          {phase.elements.slice(0, 3).map((element, elemIndex) => (
                            <div key={elemIndex} className="flex items-center gap-2 text-xs">
                              <div className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center">
                                {element.type === "word" && <span className="text-xs font-bold">W</span>}
                                {element.type === "prompt" && <span className="text-xs font-bold">P</span>}
                                {element.type === "exercise" && <span className="text-xs font-bold">E</span>}
                                {element.type === "deck" && <span className="text-xs font-bold">D</span>}
                                {element.type === "template" && <span className="text-xs font-bold">T</span>}
                                {element.type === "visual" && <span className="text-xs font-bold">V</span>}
                              </div>
                              <span className="text-slate-600 truncate">{element.title}</span>
                            </div>
                          ))}
                          {phase.elements.length > 3 && (
                            <div className="text-xs text-slate-400">
                              +{phase.elements.length - 3} more
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-3">
                          <button className={`w-full px-2 py-1 text-xs rounded-lg ${
                            phase.name === "Pause" 
                              ? "bg-emerald-100 hover:bg-emerald-200 text-emerald-700" 
                              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                          }`}>
                            {phase.name === "Pause" ? "Save" : "Edit"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
            </div>

            {/* Phase Construction */}
                <div className="bg-white/80 border border-black/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold">Phase Elements</h4>
                <div className="text-sm text-slate-600">Step {step} of 4</div>
              </div>
              <PhaseConstruction step={step} />
            </div>

              </div>
            </div>

            {/* Scheduled Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Scheduled</h2>
                <Button variant="sage" size="sm">
                  + New Journey
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Sample scheduled journeys */}
                <div className="bg-white/80 border border-black/5 rounded-2xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">Team Transition Workshop</h4>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Tomorrow</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">Helping teams navigate organizational changes</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">2:00 PM - 4:00 PM</span>
                    <Button variant="ghost-success" size="xs">Edit</Button>
                  </div>
                </div>

                <div className="bg-white/80 border border-black/5 rounded-2xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">Personal Growth Circle</h4>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Next Week</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">Monthly reflection and goal setting</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">10:00 AM - 12:00 PM</span>
                    <Button variant="ghost-success" size="xs">Edit</Button>
                  </div>
                </div>

                <div className="bg-white/80 border border-black/5 rounded-2xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">Leadership Development</h4>
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Next Month</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">Building leadership skills through reflection</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">9:00 AM - 11:00 AM</span>
                    <Button variant="ghost-success" size="xs">Edit</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* History Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">History</h2>
                <Button variant="secondary" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Sample past journeys */}
                <div className="bg-white/80 border border-black/5 rounded-2xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">Career Transition Workshop</h4>
                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-full">Completed</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">Helping individuals navigate career changes</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Dec 15, 2024</span>
                    <Button variant="ghost-success" size="xs">Reuse</Button>
                  </div>
                </div>

                <div className="bg-white/80 border border-black/5 rounded-2xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">Team Building Session</h4>
                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-full">Completed</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">Strengthening team connections and communication</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Dec 10, 2024</span>
                    <Button variant="ghost-success" size="xs">Reuse</Button>
                  </div>
                </div>

                <div className="bg-white/80 border border-black/5 rounded-2xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">Personal Reflection Circle</h4>
                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-full">Completed</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">Monthly reflection and goal setting session</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Dec 5, 2024</span>
                    <Button variant="ghost-success" size="xs">Reuse</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Right Rail – Meeting, Library, Safety */}
      <aside className="col-span-3 border-l border-black/5 bg-white/60 backdrop-blur-md h-full flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">

        {/* Live Meeting (if any) */}
        {(meetingState === "live" || meetingState === "scheduled" || meetingState === "ended") && meetingProvider && (
          <section className="px-4 py-3 border-t border-black/5">
            <h3 className="text-xs font-semibold tracking-wide text-slate-600 mb-2">Meeting</h3>
            <LiveMeetingCard
              provider={meetingProvider}
              state={meetingState}
              captionsOn={captionsOn}
              onToggleCaptions={() => setCaptionsOn(s => !s)}
              onImport={() => {/* would trigger import */}}
            />
          </section>
        )}

        {/* Journey Builder Co-Pilot */}
        <section className="px-4 py-3 border-t border-black/5">
          <h3 className="text-xs font-semibold tracking-wide text-slate-600 mb-2">Journey Builder Co-Pilot</h3>
          <div className="space-y-3">

            {/* Current Phase Focus */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
              <div className="text-xs font-medium text-emerald-800 mb-1">Phase {step}: {["Pause", "Expand", "Focus", "Doing"][step - 1]}</div>
              <div className="text-xs text-emerald-700">
                {step === 1 && "Welcome & emotional check-in. Use word cards and open questions to create safety."}
                {step === 2 && "Card selection & reflection. Guide participants to choose meaningful cards and reflect deeply."}
                {step === 3 && "Group sharing & theme identification. Help participants connect and find patterns."}
                {step === 4 && "Action commitment & next steps. Support concrete forward movement and accountability."}
              </div>
            </div>

            {/* Phase-specific suggestions */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-slate-700">Suggested Elements:</div>
              {step === 1 && (
                <div className="space-y-1">
                  <div className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700">• One-word check-in</div>
                  <div className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700">• "How are you feeling?" prompt</div>
                  <div className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700">• Two-word emotional check</div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-1">
                  <div className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700">• POY Coaching Game deck</div>
                  <div className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700">• "What do you notice?" prompt</div>
                  <div className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700">• Card dialogue exercise</div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-1">
                  <div className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700">• "Share your sentence" prompt</div>
                  <div className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700">• Theme identification exercise</div>
                  <div className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700">• Group reflection template</div>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-1">
                  <div className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700">• "What's one small step?" prompt</div>
                  <div className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700">• Action planning exercise</div>
                  <div className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700">• Commitment sharing template</div>
                </div>
              )}
            </div>

            {/* Marketplace Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Marketplace</h3>
                <div className="text-xs text-slate-500">40 items available</div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Featured Items */}
                <div className="bg-white rounded-lg border border-black/5 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <ShoppingCart className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">POY Facilitator Certification</div>
                      <div className="text-xs text-slate-600 mb-2">Points of You Academy</div>
                      <div className="text-xs text-slate-700 line-clamp-2">Complete 3-day certification program to become a certified POY facilitator.</div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-xs">4.9</span>
                          <span className="text-xs text-slate-500">(156)</span>
                        </div>
                        <div className="text-sm font-semibold text-emerald-600">$899</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-black/5 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                      <span className="text-lg">🃏</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Coaching Game Deck</div>
                      <div className="text-xs text-slate-600 mb-2">Efrat Shokef</div>
                      <div className="text-xs text-slate-700 line-clamp-2">Official Points of You Coaching Game with 65 carefully selected photo cards.</div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-xs">4.9</span>
                          <span className="text-xs text-slate-500">(1,834)</span>
                        </div>
                        <div className="text-sm font-semibold text-emerald-600">$45</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-black/5 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                      <span className="text-lg">📋</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Agile Retrospective Template</div>
                      <div className="text-xs text-slate-600 mb-2">Scrum Masters Guild</div>
                      <div className="text-xs text-slate-700 line-clamp-2">Complete retrospective template with POY cards for team retrospectives.</div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-xs">4.8</span>
                          <span className="text-xs text-slate-500">(127)</span>
                        </div>
                        <div className="text-sm font-semibold text-emerald-600">$15</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-black/5 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                      <span className="text-lg">🏃</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Icebreaker Collection</div>
                      <div className="text-xs text-slate-600 mb-2">POY Community</div>
                      <div className="text-xs text-slate-700 line-clamp-2">20 engaging icebreaker exercises using POY methodology.</div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-xs">4.6</span>
                          <span className="text-xs text-slate-500">(89)</span>
                        </div>
                        <div className="text-sm font-semibold text-emerald-600">Free</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={() => { location.hash = "/marketplace"; }}
                  className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  View All Marketplace Items
                </button>
              </div>
            </div>

            {/* Explore more options */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-slate-700">Quick Access:</div>
              <div className="flex gap-2">
                <button 
                  onClick={() => { location.hash = "/library"; }}
                  className="flex-1 px-2 py-1.5 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  📚 Library
                </button>
                <button 
                  onClick={() => { location.hash = "/marketplace"; }}
                  className="flex-1 px-2 py-1.5 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  🛒 Marketplace
                </button>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="mt-4 border-t border-black/10 pt-3">
              <div className="text-xs font-medium text-slate-700 mb-2">Ask Co-Pilot</div>
              <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-3 w-3 text-emerald-600" />
                  </div>
                  <div className="text-xs text-slate-600 bg-slate-50 rounded-lg p-2">
                    I'm here to help you build an effective journey. What would you like to focus on?
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-blue-600">U</span>
                  </div>
                  <div className="text-xs text-slate-600 bg-blue-50 rounded-lg p-2">
                    How do I structure the phases for a transition journey?
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-3 w-3 text-emerald-600" />
                  </div>
                  <div className="text-xs text-slate-600 bg-slate-50 rounded-lg p-2">
                    Great question! For transitions, I recommend: Pause (emotional check-in), Expand (card selection & reflection), Focus (group sharing & themes), and Doing (action planning). Each phase builds on the previous one.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-blue-600">U</span>
                  </div>
                  <div className="text-xs text-slate-600 bg-blue-50 rounded-lg p-2">
                    What elements work best for Phase 2?
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-3 w-3 text-emerald-600" />
                  </div>
                  <div className="text-xs text-slate-600 bg-slate-50 rounded-lg p-2">
                    For Phase 2 (Expand), I recommend the POY Coaching Game deck, a visual card selection guide, observation prompts, and card dialogue exercises. These help participants reflect deeply on their chosen cards.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-blue-600">U</span>
                  </div>
                  <div className="text-xs text-slate-600 bg-blue-50 rounded-lg p-2">
                    How long should each phase be?
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-3 w-3 text-emerald-600" />
          </div>
                  <div className="text-xs text-slate-600 bg-slate-50 rounded-lg p-2">
                    For a 2-4 hour session: Pause (15-20 min), Expand (45-60 min), Focus (30-40 min), Doing (20-30 min). Adjust based on group size and complexity. Always leave buffer time!
          </div>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ask about journey building..."
                  className="flex-1 px-2 py-1.5 text-xs rounded-lg border border-black/10 bg-white/80 focus:outline-none focus:ring-1 focus:ring-emerald-300"
                />
                <Button variant="success" size="xs">
                  Send
                </Button>
          </div>
            </div>
          </div>
        </section>

      </aside>

      {/* Breakout Modal (simple) */}
      {breakoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[680px] rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold">Create Breakouts</div>
              <Button variant="ghost" size="xs" onClick={() => setBreakoutOpen(false)}><X className="h-4 w-4" /></Button>
            </div>
            <p className="text-sm text-slate-600">Pair by <span className="font-medium">similar cards</span>, room size <span className="font-medium">2</span>, countdown <span className="font-medium">06:00</span>.</p>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-black/10 p-3">
                  <div className="text-xs font-medium mb-2">Room {i + 1}</div>
                  <div className="flex flex-wrap gap-1">
                    {sampleParticipants.slice(i * 2, i * 2 + 2).map(p => (
                      <span key={p} className="text-[10px] px-2 py-1 rounded-full bg-slate-100">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-slate-500">Broadcast prompt: <span className="italic">“Share one insight from your card.”</span></div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => setBreakoutOpen(false)}>Cancel</Button>
                <Button variant="success" size="sm" onClick={() => setBreakoutOpen(false)}>Open Rooms</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule/Start Meeting Modal */}
      {showMeetingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="rounded-2xl bg-white p-6 w-[520px] shadow-2xl">
            <ScheduleMeetingModal onCreate={handleCreateMeeting} onClose={() => setShowMeetingModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ——— Components ——— */
function NavItem({ icon, label, active = false, children, onClick }: { icon: React.ReactNode; label: string; active?: boolean; children?: React.ReactNode; onClick?: () => void }) {
  return (
    <div className={`group rounded-xl px-3 py-2 cursor-pointer ${active ? "bg-white/80 border border-black/5" : "hover:bg-white/50"}`} onClick={onClick}>
      <div className="flex items-center gap-2">
        <div className={`shrink-0 ${active ? "text-emerald-700" : "text-slate-600 group-hover:text-slate-700"}`}>{icon}</div>
        <div className="flex-1">
          <div className="text-sm font-medium">{label}</div>
          <div className="text-[11px] text-slate-500">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ToolBadge({ label }: { label: string }) {
  return <span className="px-2.5 py-1 rounded-full border border-black/10 bg-white/70 text-slate-700">{label}</span>;
}

function CardTile({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-white/80 border border-black/5 overflow-hidden shadow-sm">
      <div className="aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-100" />
      <div className="p-3">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-slate-500">{desc}</div>
      </div>
    </div>
  );
}

function WordTile({ word }: { word: string }) {
  return (
    <div className="rounded-2xl bg-white/80 border border-black/5 overflow-hidden shadow-sm flex items-center justify-center">
      <div className="text-lg font-semibold tracking-wide px-6 py-16">{word}</div>
    </div>
  );
}

function SignalsPanel() {
  const talk = [
    { name: "Dana", pct: 22 },
    { name: "Ido", pct: 18 },
    { name: "Leah", pct: 31 },
    { name: "Noa", pct: 29 },
  ];
  const openQ = 34; // percent
  const valence = 0.62; // 0..1
  const arousal = 0.44;

  return (
    <div className="space-y-4">
      {/* Talk-time */}
      <div>
        <div className="text-xs font-medium mb-1">Talk-time balance</div>
        <div className="space-y-1">
          {talk.map(t => (
            <div key={t.name} className="text-[11px]">
              <div className="flex items-center justify-between"><span className="text-slate-600">{t.name}</span><span className="tabular-nums">{t.pct}%</span></div>
              <div className="h-2 bg-slate-200 rounded-lg overflow-hidden">
                <div className="h-full bg-emerald-600" style={{ width: `${t.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Affect */}
      <div>
        <div className="text-xs font-medium mb-1">Affect (valence / arousal)</div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-xl border border-black/10 p-2 bg-white/70">
            <div className="flex items-center justify-between"><span className="text-slate-600">Valence</span><span className="tabular-nums">{Math.round(valence * 100)}%</span></div>
            <div className="h-2 bg-slate-200 rounded-lg overflow-hidden mt-1">
              <div className="h-full bg-emerald-500" style={{ width: `${valence * 100}%` }} />
            </div>
          </div>
          <div className="rounded-xl border border-black/10 p-2 bg-white/70">
            <div className="flex items-center justify-between"><span className="text-slate-600">Arousal</span><span className="tabular-nums">{Math.round(arousal * 100)}%</span></div>
            <div className="h-2 bg-slate-200 rounded-lg overflow-hidden mt-1">
              <div className="h-full bg-emerald-500" style={{ width: `${arousal * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
      {/* Open-question ratio */}
      <div>
        <div className="text-xs font-medium mb-1">Open-question ratio</div>
        <div className="h-2 bg-slate-200 rounded-lg overflow-hidden">
          <div className="h-full bg-emerald-600" style={{ width: `${openQ}%` }} />
        </div>
        <div className="text-[11px] text-slate-600 mt-1">Target ≥ 40%</div>
      </div>
    </div>
  );
}

function NudgeCard({ nudge, onAccept, onDismiss }: { nudge: Nudge; onAccept: (id: string) => void; onDismiss: (id: string) => void }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white/80 p-3" data-test="nudge-card">
      <div className="flex items-start gap-2">
        <div className="mt-0.5"><Bot className="h-4 w-4 text-emerald-700" /></div>
        <div className="flex-1">
          <div className="text-sm font-medium">{nudge.title}</div>
          <div className="text-xs text-slate-600">{nudge.reason}</div>
          <div className="mt-2 text-sm">{nudge.suggestion}</div>
          <div className="mt-2 flex items-center gap-2">
            <Button onClick={() => onAccept(nudge.id)} variant="success" size="xs" leftIcon={<Check className="h-3 w-3" />}>Accept</Button>
            <Button variant="secondary" size="xs" leftIcon={<Edit3 className="h-3 w-3" />}>Edit</Button>
            <Button onClick={() => onDismiss(nudge.id)} variant="ghost" size="xs" leftIcon={<X className="h-3 w-3" />}>Dismiss</Button>
            <span className="ml-auto text-[10px] text-slate-500">Lvl {nudge.difficulty} · cooldown {nudge.cooldown}s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Meeting components */
function MeetingPill({ provider, state, onStart, onJoin, onMenu, onEnd }: {
  provider: Provider | null; state: MeetingState; onStart: () => void; onJoin: () => void; onMenu: () => void; onEnd: () => void;
}) {
  const icon = provider === "zoom" ? "🟦" : provider === "meet" ? "🟢" : "➕";
  const labelMap: Record<MeetingState, string> = { none: "Add meeting", scheduled: "Join", live: "Live", ended: "Ended" };
  return (
    <div className="flex items-center gap-2 bg-white/70 border border-black/5 rounded-xl px-3 py-1.5" data-test="meeting-pill">
      <span className="text-lg" aria-hidden>{icon}</span>
      <span className="text-sm">{labelMap[state]}</span>
      {state === "none" && (
        <Button variant="success" size="xs" onClick={onMenu}>Schedule / Start</Button>
      )}
      {state === "scheduled" && (
        <button className="text-xs px-2 py-1 rounded-lg bg-emerald-600 text-white" onClick={onJoin}>Join</button>
      )}
      {state === "live" && (
        <>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-600 text-white">REC</span>
          <button className="text-xs px-2 py-1 rounded-lg hover:bg-slate-100" onClick={onEnd}>End</button>
        </>
      )}
      <button className="ml-1 px-2 py-1 text-xs rounded-lg hover:bg-slate-100" onClick={onMenu} aria-label="More">⋯</button>
    </div>
  );
}

function ScheduleMeetingModal({ onCreate, onClose }: { onCreate: (p: Provider, when: "now" | "later") => void; onClose: () => void; }) {
  const [provider, setProvider] = useState<Provider>("zoom");
  const [when, setWhen] = useState<"now" | "later">("now");
  return (
    <div>
      <div className="text-sm font-semibold mb-2">Attach a meeting</div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <button onClick={() => setProvider("zoom")} className={`p-3 rounded-xl border ${provider === "zoom" ? "border-emerald-400 bg-emerald-50" : "border-black/10"}`}>🟦 Zoom</button>
        <button onClick={() => setProvider("meet")} className={`p-3 rounded-xl border ${provider === "meet" ? "border-emerald-400 bg-emerald-50" : "border-black/10"}`}>🟢 Google Meet</button>
      </div>
      <div className="flex gap-2 text-sm mb-3">
        <label className={`px-3 py-1.5 rounded-xl border ${when === "now" ? "border-slate-400" : "border-black/10"}`}>
          <input type="radio" name="when" className="mr-2" checked={when === "now"} onChange={() => setWhen("now")} /> Start now
        </label>
        <label className={`px-3 py-1.5 rounded-xl border ${when === "later" ? "border-slate-400" : "border-black/10"}`}>
          <input type="radio" name="when" className="mr-2" checked={when === "later"} onChange={() => setWhen("later")} /> Schedule
        </label>
      </div>
      <div className="flex items-center justify-end gap-2">
        <button className="px-3 py-2 rounded-xl bg-slate-200" onClick={onClose}>Cancel</button>
        <button className="px-3 py-2 rounded-xl bg-emerald-600 text-white" onClick={() => onCreate(provider, when)}>Continue</button>
      </div>
    </div>
  );
}

function LiveMeetingCard({ provider, state, captionsOn, onToggleCaptions, onImport }: {
  provider: Provider; state: MeetingState; captionsOn: boolean; onToggleCaptions: () => void; onImport: () => void;
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white/80 p-3">
      <div className="text-sm font-medium mb-1">{provider === "zoom" ? "Zoom" : "Google Meet"} {state === "live" ? "is live" : state === "scheduled" ? "scheduled" : "ended"}</div>
      <div className="text-xs text-slate-600 mb-2">Consent: ✅ | Recording: {state === "live" ? "⏺️" : "—"} | Captions: {captionsOn ? "On" : "Off"}</div>
      <div className="flex gap-2">
        {state !== "ended" && (
          <button className="text-xs px-2 py-1 rounded-lg bg-slate-200" onClick={onToggleCaptions}>
            {captionsOn ? "Disable captions" : "Enable captions"}
          </button>
        )}
        <button className="text-xs px-2 py-1 rounded-lg bg-emerald-600 text-white" onClick={onImport}>Import transcript/recording</button>
      </div>
    </div>
  );
}


/* ——— Mock Data ——— */
const initialNudges: Nudge[] = [
  { id: "n1", title: "Invite an open ‘how’ question", reason: "Open-Q ratio dropped to 18% in last 2 min", suggestion: "How might this card be calling you to take a first step this week?", difficulty: 1, cooldown: 30 },
  { id: "n2", title: "Reflect & validate", reason: "Tension spike detected for Leah", suggestion: "I’m hearing both courage and uncertainty in what you shared.", difficulty: 2, cooldown: 45 },
  { id: "n3", title: "Brief silence", reason: "Overlap up 22% (interruptions)", suggestion: "Let’s pause for 15 seconds and notice what stands out from your card.", difficulty: 1, cooldown: 60 },
];

const promptLibrary = [
  { id: "p1", title: "Acknowledge", example: "I hear… and it makes sense that…", tags: ["acknowledge", "validate"] },
  { id: "p2", title: "Reframe", example: "What’s another way to look at this card right now?", tags: ["reframe", "perspective"] },
  { id: "p3", title: "Scale", example: "On a scale 1–10, where are you now? What makes it a point higher than before?", tags: ["scale", "progress"] },
  { id: "p4", title: "Future Step", example: "What’s one small step you could try before next time?", tags: ["future", "action"] },
  { id: "p5", title: "Strengths", example: "What strengths of yours does this card remind you of?", tags: ["strengths", "values"] },
];

const sampleParticipants = ["Dana", "Ido", "Leah", "Noa", "Amit", "Sara", "Yuri", "Maya", "Omer", "Tali", "Ben", "Zohar"];


const botAvatarSvg = `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="12" fill="#10b981"/><circle cx="14" cy="16" r="3" fill="white"/><circle cx="26" cy="16" r="3" fill="white"/><rect x="10" y="24" width="20" height="4" rx="2" fill="white"/></svg>`;

/* ——— Types ——— */
interface Nudge { id: string; title: string; reason: string; suggestion: string; difficulty: 1 | 2 | 3; cooldown: number; }


type Provider = "zoom" | "meet";

type MeetingState = "none" | "scheduled" | "live" | "ended";
