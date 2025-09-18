import React, { useEffect, useMemo, useState } from "react";
import { 
  PanelsTopLeft, MessagesSquare, Notebook, CalendarDays, BarChart3, LibraryBig, Settings,
  Users, Bot, Timer as TimerIcon, Play, Pause, ShieldCheck, Search, Check, X, Edit3, ChevronRight, ArrowUpRight
} from "lucide-react";

// POY Facilitator Console – single-file mockup
// TailwindCSS-first UI. No backend; all data mocked.
// Default export is a React component for easy preview.

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
              <button className="px-2 py-1 text-xs rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                Modify
              </button>
              <button className="px-2 py-1 text-xs rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-200">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600">Total elements: {currentPhase.elements.length}</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs hover:bg-blue-700">
              New Element
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs hover:bg-emerald-700">
              Load Element
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FacilitatorConsoleMockup() {
  const [step, setStep] = useState(1);
  const [breakoutOpen, setBreakoutOpen] = useState(false);
  const [nudges, setNudges] = useState<Nudge[]>(initialNudges);
  const [accepted, setAccepted] = useState<string[]>([]);
  const [running, setRunning] = useState(true);
  const [search, setSearch] = useState("");

  const filteredPrompts = useMemo(
    () => promptLibrary.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.join(" ").toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  function acceptNudge(id: string) {
    setAccepted(a => [...a, id]);
    setNudges(ns => ns.filter(n => n.id !== id));
  }
  function dismissNudge(id: string) {
    setNudges(ns => ns.filter(n => n.id !== id));
  }

  // --- Dev smoke tests (non-intrusive) ---
  useEffect(() => {
    // Toggle to true to see console checks in the browser
    const DEV_TEST = false;
    if (!DEV_TEST) return;
    // Basic render checks
    console.assert(document.querySelectorAll("nav .group").length >= 6, "Nav items should render");
    console.assert(document.querySelectorAll("[data-test='nudge-card']").length === initialNudges.length, "Nudge cards count should match");
  }, []);

  return (
    <div className="h-screen w-full bg-[#f6efe6] text-slate-900 grid grid-cols-12 overflow-hidden">
      {/* Left Nav */}
      <aside className="col-span-2 min-w-[220px] bg-[#efe6d8] border-r border-black/5 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
        <div className="px-4 py-4 flex items-center gap-2 text-slate-700">
          <PanelsTopLeft className="h-5 w-5"/>
          <span className="font-semibold tracking-wide">Facilitator</span>
        </div>
        <nav className="px-2 py-2 space-y-1 text-sm">
          {/* FIX: make the first NavItem a non-self-closing tag so children are enclosed */}
          <NavItem icon={<Notebook className="h-4 w-4"/>} label="Journeys" active>
            Your structured programs and templates
          </NavItem>
          <NavItem icon={<MessagesSquare className="h-4 w-4"/>} label="On-Air">
            Live and scheduled sessions
          </NavItem>
          <NavItem icon={<LibraryBig className="h-4 w-4"/>} label="Library">
            Decks, prompts, exercises
          </NavItem>
          <NavItem icon={<Users className="h-4 w-4"/>} label="Clients">
            People & cohorts
          </NavItem>
          <NavItem icon={<CalendarDays className="h-4 w-4"/>} label="Calendar">
            Availability & invites
          </NavItem>
          <NavItem icon={<BarChart3 className="h-4 w-4"/>} label="Reports">
            Outcomes & trends
          </NavItem>
        </nav>
        <div className="mt-auto p-3 border-t border-black/5 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2"><Settings className="h-4 w-4"/> Settings</div>
          <div className="rounded-full bg-emerald-600 text-white text-[10px] px-2 py-1">Beta</div>
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
                    <button className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                      Load Journey
                    </button>
                    <button className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                      Activate Journey
                    </button>
                    <button className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                      Deactivate Journey
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 border border-black/5 rounded-2xl p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-emerald-700">Crossing Inner Bridges</h3>
                  <p className="text-sm text-slate-600">A journey for transitions</p>
                </div>

            {/* Participant Cards Display */}
                <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold">Participant Cards</h4>
                    <div className="text-xs text-slate-600">{participantCards.length} participants</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {participantCards.map(participant => (
                  <ParticipantCardDisplay key={participant.id} participant={participant} />
                ))}
              </div>
            </div>

            {/* Presenter tools */}
                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
              <ToolBadge label="Reveal"/>
              <ToolBadge label="Timer"/>
              <ToolBadge label="Poll"/>
              <ToolBadge label="Whiteboard"/>
              <ToolBadge label="Switch deck"/>
              <ToolBadge label="Mark off-record"/>
            </div>

            {/* Agenda strip */}
                <div className="mb-6 grid grid-cols-4 gap-2 text-xs">
              {[
                "Pause",
                "Expand",
                "Focus",
                "Doing"
              ].map((s, i) => (
                <div key={s} className={`rounded-xl px-2 py-2 border ${i+1 === step ? "bg-emerald-50 border-emerald-300" : "bg-white/70 border-black/5"}`}>
                  <div className="font-medium text-center">{i+1}. {s}</div>
                  <div className="text-slate-500 text-center">{i+1 === step ? "In progress" : i+1 < step ? "Done" : "Queued"}</div>
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
                  <button className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    New
                  </button>
                  <button className="px-3 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                    Load
                  </button>
                  <button className="px-3 py-2 text-sm bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors">
                    Save
                  </button>
                  <button className="px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                    Save to Library
                  </button>
                  <button className="px-3 py-2 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors">
                    Reset
                  </button>
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
                        <button className="px-3 py-2 text-sm text-red-600 hover:text-red-700">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          defaultValue="Build emotional awareness and resilience"
                          className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300"
                          placeholder="Enter a goal..."
                        />
                        <button className="px-3 py-2 text-sm text-red-600 hover:text-red-700">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          defaultValue="Create meaningful connections through shared experiences"
                          className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300"
                          placeholder="Enter a goal..."
                        />
                        <button className="px-3 py-2 text-sm text-red-600 hover:text-red-700">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <button className="flex items-center gap-2 px-3 py-2 text-sm text-emerald-600 hover:text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-50">
                        <span className="text-lg">+</span>
                        Add Goal
                      </button>
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
                    <button className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                      + Add Phase
                    </button>
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
                  <PhaseConstruction step={step}/>
                </div>

              </div>
            </div>

            {/* Scheduled Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Scheduled</h2>
                <button className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                  + New Journey
                </button>
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
                    <button className="text-emerald-600 hover:text-emerald-700">Edit</button>
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
                    <button className="text-emerald-600 hover:text-emerald-700">Edit</button>
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
                    <button className="text-emerald-600 hover:text-emerald-700">Edit</button>
                  </div>
                </div>
              </div>
            </div>

            {/* History Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">History</h2>
                <button className="px-4 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200">
                  View All
                </button>
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
                    <button className="text-emerald-600 hover:text-emerald-700">Reuse</button>
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
                    <button className="text-emerald-600 hover:text-emerald-700">Reuse</button>
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
                    <button className="text-emerald-600 hover:text-emerald-700">Reuse</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Right Rail – Library, Safety */}
      <aside className="col-span-3 border-l border-black/5 bg-white/60 backdrop-blur-md h-full flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">

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

            {/* Explore more options */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-slate-700">Explore More:</div>
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
                <button className="px-3 py-1.5 text-xs bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                  Send
                </button>
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
              <button className="p-1 rounded-lg hover:bg-slate-100" onClick={()=>setBreakoutOpen(false)}><X className="h-4 w-4"/></button>
            </div>
            <p className="text-sm text-slate-600">Pair by <span className="font-medium">similar cards</span>, room size <span className="font-medium">2</span>, countdown <span className="font-medium">06:00</span>.</p>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {Array.from({length:6}).map((_,i)=> (
                <div key={i} className="rounded-xl border border-black/10 p-3">
                  <div className="text-xs font-medium mb-2">Room {i+1}</div>
                  <div className="flex flex-wrap gap-1">
                    {sampleParticipants.slice(i*2, i*2+2).map(p => (
                      <span key={p} className="text-[10px] px-2 py-1 rounded-full bg-slate-100">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-slate-500">Broadcast prompt: <span className="italic">“Share one insight from your card.”</span></div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 text-sm rounded-xl bg-slate-200" onClick={()=>setBreakoutOpen(false)}>Cancel</button>
                <button className="px-4 py-2 text-sm rounded-xl bg-emerald-600 text-white" onClick={()=>setBreakoutOpen(false)}>Open Rooms</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ——— Components ——— */
function NavItem({ icon, label, active=false, children }:{ icon: React.ReactNode; label: string; active?: boolean; children?: React.ReactNode }){
  return (
    <div className={`group rounded-xl px-3 py-2 cursor-pointer ${active?"bg-white/80 border border-black/5":"hover:bg-white/50"}`}>
      <div className="flex items-center gap-2">
        <div className={`shrink-0 ${active?"text-emerald-700":"text-slate-600 group-hover:text-slate-700"}`}>{icon}</div>
        <div className="flex-1">
          <div className="text-sm font-medium">{label}</div>
          <div className="text-[11px] text-slate-500">{children}</div>
        </div>
      </div>
    </div>
  )
}

function ToolBadge({ label }:{ label:string }){
  return <span className="px-2.5 py-1 rounded-full border border-black/10 bg-white/70 text-slate-700">{label}</span>
}

function CardTile({ title, desc }:{ title:string; desc:string }){
  return (
    <div className="rounded-2xl bg-white/80 border border-black/5 overflow-hidden shadow-sm">
      <div className="aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-100"/>
      <div className="p-3">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-slate-500">{desc}</div>
      </div>
    </div>
  )
}

function WordTile({ word }:{ word:string }){
  return (
    <div className="rounded-2xl bg-white/80 border border-black/5 overflow-hidden shadow-sm flex items-center justify-center">
      <div className="text-lg font-semibold tracking-wide px-6 py-16">{word}</div>
    </div>
  )
}

function SignalsPanel(){
  const talk = [
    {name:"Dana", pct: 22},
    {name:"Ido", pct: 18},
    {name:"Leah", pct: 31},
    {name:"Noa", pct: 29},
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
                <div className="h-full bg-emerald-600" style={{width:`${t.pct}%`}}/>
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
            <div className="flex items-center justify-between"><span className="text-slate-600">Valence</span><span className="tabular-nums">{Math.round(valence*100)}%</span></div>
            <div className="h-2 bg-slate-200 rounded-lg overflow-hidden mt-1">
              <div className="h-full bg-emerald-500" style={{width:`${valence*100}%`}}/>
            </div>
          </div>
          <div className="rounded-xl border border-black/10 p-2 bg-white/70">
            <div className="flex items-center justify-between"><span className="text-slate-600">Arousal</span><span className="tabular-nums">{Math.round(arousal*100)}%</span></div>
            <div className="h-2 bg-slate-200 rounded-lg overflow-hidden mt-1">
              <div className="h-full bg-emerald-500" style={{width:`${arousal*100}%`}}/>
            </div>
          </div>
        </div>
      </div>
      {/* Open-question ratio */}
      <div>
        <div className="text-xs font-medium mb-1">Open-question ratio</div>
        <div className="h-2 bg-slate-200 rounded-lg overflow-hidden">
          <div className="h-full bg-emerald-600" style={{width:`${openQ}%`}}/>
        </div>
        <div className="text-[11px] text-slate-600 mt-1">Target ≥ 40%</div>
      </div>
    </div>
  )
}

function NudgeCard({ nudge, onAccept, onDismiss }:{ nudge:Nudge; onAccept:(id:string)=>void; onDismiss:(id:string)=>void }){
  return (
    <div className="rounded-xl border border-black/10 bg-white/80 p-3" data-test="nudge-card">
      <div className="flex items-start gap-2">
        <div className="mt-0.5"><Bot className="h-4 w-4 text-emerald-700"/></div>
        <div className="flex-1">
          <div className="text-sm font-medium">{nudge.title}</div>
          <div className="text-xs text-slate-600">{nudge.reason}</div>
          <div className="mt-2 text-sm">{nudge.suggestion}</div>
          <div className="mt-2 flex items-center gap-2">
            <button onClick={()=>onAccept(nudge.id)} className="px-2.5 py-1 text-xs rounded-lg bg-emerald-600 text-white inline-flex items-center gap-1"><Check className="h-3 w-3"/> Accept</button>
            <button className="px-2.5 py-1 text-xs rounded-lg bg-slate-200 inline-flex items-center gap-1"><Edit3 className="h-3 w-3"/> Edit</button>
            <button onClick={()=>onDismiss(nudge.id)} className="px-2 py-1 text-xs rounded-lg hover:bg-slate-100 inline-flex items-center gap-1"><X className="h-3 w-3"/> Dismiss</button>
            <span className="ml-auto text-[10px] text-slate-500">Lvl {nudge.difficulty} · cooldown {nudge.cooldown}s</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ——— Mock Data ——— */
const initialNudges: Nudge[] = [
  { id: "n1", title: "Invite an open ‘how’ question", reason: "Open-Q ratio dropped to 18% in last 2 min", suggestion: "How might this card be calling you to take a first step this week?", difficulty: 1, cooldown: 30 },
  { id: "n2", title: "Reflect & validate", reason: "Tension spike detected for Leah", suggestion: "I’m hearing both courage and uncertainty in what you shared.", difficulty: 2, cooldown: 45 },
  { id: "n3", title: "Brief silence", reason: "Overlap up 22% (interruptions)", suggestion: "Let’s pause for 15 seconds and notice what stands out from your card.", difficulty: 1, cooldown: 60 },
]

const promptLibrary = [
  { id:"p1", title:"Acknowledge", example:"I hear… and it makes sense that…", tags:["acknowledge","validate"] },
  { id:"p2", title:"Reframe", example:"What’s another way to look at this card right now?", tags:["reframe","perspective"] },
  { id:"p3", title:"Scale", example:"On a scale 1–10, where are you now? What makes it a point higher than before?", tags:["scale","progress"] },
  { id:"p4", title:"Future Step", example:"What’s one small step you could try before next time?", tags:["future","action"] },
  { id:"p5", title:"Strengths", example:"What strengths of yours does this card remind you of?", tags:["strengths","values"] },
]

const sampleParticipants = ["Dana","Ido","Leah","Noa","Amit","Sara","Yuri","Maya","Omer","Tali","Ben","Zohar"]

const participantCards = [
  {
    id: "pc1",
    name: "Dana Kim",
    status: "completed",
    selectedCard: {
      id: "card1",
      title: "Mountain Peak",
      description: "Reaching new heights, overcoming challenges",
      gradient: "from-purple-500 to-pink-600"
    },
    reflection: "This mountain represents the leadership challenge I'm facing. I need to take it one step at a time."
  },
  {
    id: "pc2", 
    name: "Ido Chen",
    status: "completed",
    selectedCard: {
      id: "card2",
      title: "Bridge",
      description: "Transition, connection, crossing boundaries", 
      gradient: "from-blue-500 to-indigo-600"
    },
    reflection: "The bridge symbolizes my career transition. I'm in between where I was and where I want to be."
  },
  {
    id: "pc3",
    name: "Leah Miller",
    status: "completed", 
    selectedCard: {
      id: "card3",
      title: "Sunrise",
      description: "New beginnings, hope, fresh start",
      gradient: "from-yellow-500 to-orange-600"
    },
    reflection: "Every sunrise is a new chance to start fresh. I choose to see opportunities instead of obstacles."
  },
  {
    id: "pc4",
    name: "Noa Wilson",
    status: "reflecting",
    selectedCard: {
      id: "card4", 
      title: "Tree Roots",
      description: "Foundation, grounding, stability",
      gradient: "from-green-500 to-emerald-600"
    },
    reflection: ""
  },
  {
    id: "pc5",
    name: "Amit Johnson",
    status: "selecting",
    selectedCard: null,
    reflection: ""
  },
  {
    id: "pc6",
    name: "Sara Lopez", 
    status: "completed",
    selectedCard: {
      id: "card5",
      title: "Ocean Wave",
      description: "Flow, adaptability, power",
      gradient: "from-cyan-500 to-blue-600"
    },
    reflection: "Like waves, I need to learn to flow with change instead of fighting against it."
  }
]

const botAvatarSvg = `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="12" fill="#10b981"/><circle cx="14" cy="16" r="3" fill="white"/><circle cx="26" cy="16" r="3" fill="white"/><rect x="10" y="24" width="20" height="4" rx="2" fill="white"/></svg>`

function ParticipantCardDisplay({ participant }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-black/5 p-3 hover:border-blue-300 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
          {participant.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium truncate">{participant.name}</div>
          <div className="text-[10px] text-slate-500">{participant.status}</div>
        </div>
      </div>
      
      {participant.selectedCard ? (
        <div className="space-y-1">
          <div className={`aspect-[4/3] rounded-lg bg-gradient-to-br ${participant.selectedCard.gradient} flex items-center justify-center text-white font-medium text-xs shadow-sm`}>
            {participant.selectedCard.title}
          </div>
          <div className="text-[10px] text-slate-600 line-clamp-2">{participant.selectedCard.description}</div>
          {participant.reflection && (
            <div className="text-[10px] text-slate-700 bg-slate-50 rounded p-1 italic line-clamp-2">
              "{participant.reflection}"
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-[4/3] rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-500 text-[10px] text-center">
          {participant.status === "selecting" ? "Choosing..." : "No card"}
        </div>
      )}
    </div>
  );
}

/* ——— Types ——— */
interface Nudge {
  id: string
  title: string
  reason: string
  suggestion: string
  difficulty: 1|2|3
  cooldown: number
}
