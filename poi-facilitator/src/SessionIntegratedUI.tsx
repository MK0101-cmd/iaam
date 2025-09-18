import React, { useMemo, useState } from "react";
import {
  Users, Video, Mic, ScreenShare, MessageSquare,
  Timer as TimerIcon, Play, Pause, ArrowLeft,
  Bot, Check, X, AlertTriangle, Captions, PanelRight,
  Search, Plus, Upload, Download, Filter, Tag, Layers, ChevronDown,
  BarChart3 as BarChartIcon, TrendingUp, PieChart, BookOpen
} from "lucide-react";
import { Button } from "./design-system/components";
import { CardDisplay } from "./components/CardDisplay";
import { allCards, getCardById, getRandomCards, type Card as CardType } from "./data/cards";

/*
  Integrated Session UI — Participant-first mockup with breakouts (2–4 ppl)
  + NEW: Library and Reports mockups integrated via top view switcher
  - Works with Vite + React + Tailwind (v4 or v3)
  - Simulates provider pill (Zoom/Meet), assignments, and breakout rooms
*/

type Provider = "zoom" | "meet";
type MeetingState = "none" | "scheduled" | "live" | "ended";
type Room = { id: string; name: string; members: string[] };

interface SharedCard {
  id: string;
  card: CardType;
  sharedBy: string;
  timestamp: number;
}

type View = "session" | "library" | "reports" | "clients" | "calendar" | "settings" | "marketplace";

// Deterministic, gender-aware avatar resolver shared across views
function getAvatarUrl(name: string, size: number = 240): string {
  const femaleNames = new Set(["Dana", "Leah"]);
  const maleNames = new Set(["Ido"]);
  const gender = femaleNames.has(name) ? "women" : maleNames.has(name) ? "men" : null;
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = ((hash << 5) - hash) + name.charCodeAt(i);
  const idx = Math.abs(hash) % 100;
  if (gender) return `https://randomuser.me/api/portraits/${gender}/${idx}.jpg`;
  return `https://i.pravatar.cc/${size}?u=${encodeURIComponent(name)}`;
}

export default function SessionIntegratedUI() {
  // Get initial view from URL hash
  const getInitialView = (): View => {
    const hash = location.hash.replace(/^#\/?/, "");
    if (["session", "library", "reports", "clients", "calendar", "marketplace", "settings"].includes(hash)) {
      return hash as View;
    }
    return "session";
  };
  
  const [view, setView] = useState<View>(getInitialView());

  // Session state
  const [running, setRunning] = useState(true);
  const [provider] = useState<Provider>("zoom");
  const [meetingState] = useState<MeetingState>("live");
  const [step, setStep] = useState(1); // current agenda step
  const [captions, setCaptions] = useState(true);

  // Assignment w/ breakout
  const [assignmentOpen, setAssignmentOpen] = useState(true);
  const [inBreakout, setInBreakout] = useState(false);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  
  // Participant detail modal
  const [selectedParticipant, setSelectedParticipant] = useState<ParticipantCard | null>(null);
  
  // Room shared cards
  const [roomSharedCards, setRoomSharedCards] = useState<{[roomId: string]: SharedCard[]}>({});
  const [cardSharingParticipant, setCardSharingParticipant] = useState<{[roomId: string]: string}>({});

  const groups = useMemo(() => sampleGroups, []);

  function joinRoom(id: string) {
    setActiveRoomId(id);
    setInBreakout(true);
  }
  function leaveRoom() {
    setInBreakout(false);
    setActiveRoomId(null);
  }
  
  function shareCardToRoom(roomId: string, card: CardType, participantName: string) {
    const currentCards = roomSharedCards[roomId] || [];
    if (currentCards.length >= 3) return; // Max 3 cards per room
    
    const sharedCard: SharedCard = {
      id: `${roomId}-${Date.now()}`,
      card,
      sharedBy: participantName,
      timestamp: Date.now()
    };
    
    setRoomSharedCards(prev => ({
      ...prev,
      [roomId]: [...currentCards, sharedCard]
    }));
    
    setCardSharingParticipant(prev => ({
      ...prev,
      [roomId]: participantName
    }));
  }
  
  function replaceSharedCard(roomId: string, cardIndex: number, newCard: CardType, participantName: string) {
    const currentCards = roomSharedCards[roomId] || [];
    if (cardIndex >= currentCards.length) return;
    
    const updatedCards = [...currentCards];
    updatedCards[cardIndex] = {
      id: `${roomId}-${Date.now()}`,
      card: newCard,
      sharedBy: participantName,
      timestamp: Date.now()
    };
    
    setRoomSharedCards(prev => ({
      ...prev,
      [roomId]: updatedCards
    }));
  }

  const currentRoom = groups.find(g => g.id === activeRoomId) || null;

  return (
    <div className="h-screen w-full bg-[#f6efe6] text-slate-900 grid grid-rows-[auto_1fr]">
      {/* Header */}
      <header className="px-4 sm:px-6 py-3 border-b border-black/5 bg-white/70 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="font-semibold tracking-wide">Crossing Inner Bridges · {view === "session" ? "On-Air" : view === "library" ? "Library" : "Reports"}</div>
            {view === "session" && <ProviderPill provider={provider} state={meetingState} />}
            {view === "session" && (
              <div className="hidden sm:flex items-center gap-2 text-sm bg-white border border-black/5 rounded-xl px-3 py-1.5">
                <TimerIcon className="h-4 w-4" />
                <span className="tabular-nums">{running ? "12:34" : "Paused"}</span>
                <button onClick={() => setRunning(!running)} className="rounded-lg p-1 hover:bg-slate-100" aria-label={running ? "Pause" : "Start"}>
                  {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
              </div>
            )}
          </div>

          {/* View switcher */}
          <div className="flex items-center gap-1 bg-white border border-black/10 rounded-xl p-1 text-xs">
            {(["session", "library", "reports", "clients", "calendar", "marketplace"] as View[]).map(v => (
              <button key={v}
                onClick={() => {
                  setView(v);
                  location.hash = `#${v}`;
                }}
                className={`px-2 py-1.5 rounded-lg ${view === v ? "bg-emerald-600 text-white" : "hover:bg-slate-100"}`}
                aria-pressed={view === v}
              >{v === "marketplace" ? "Marketplace" : v === "session" ? "On-Air" : v[0].toUpperCase() + v.slice(1)}</button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <ConsentBadge />
            <button 
              onClick={() => { location.hash = "#studio"; }}
              className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center gap-1 text-xs"
            >
              🎯 Studio
            </button>
            <button 
              onClick={() => { location.hash = "#participant/dashboard"; }}
              className="px-3 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-800 flex items-center gap-1 text-xs"
            >
              👤 Participant View
            </button>
            {view === "session" && (
              <button className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 text-xs">
                <Users className="h-4 w-4" /> Breakouts
              </button>
            )}
            <button className="px-3 py-1.5 rounded-xl border border-black/10 bg-white hover:bg-slate-50 flex items-center gap-1 text-xs">
              <PanelRight className="h-4 w-4" /> Panels
            </button>
          </div>
        </div>

        {view === "session" && (
          <div className="mt-3 hidden md:flex items-center gap-2 text-xs">
            {agenda.map((s, i) => (
              <div key={s} className={`rounded-xl px-3 py-1.5 border ${i + 1 === step ? "bg-emerald-50 border-emerald-300" : "bg-white border-black/5"}`}>
                <span className="font-medium">{i + 1}. {s}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* BODY: switch on view */}
      <div className="flex-1 overflow-hidden">
        {view === "session" ? (
          <ErrorBoundary>
            <SessionBody
              captions={captions}
              setCaptions={setCaptions}
              setStep={setStep}
              step={step}
              assignmentOpen={assignmentOpen}
              setAssignmentOpen={setAssignmentOpen}
              groups={groups}
              joinRoom={joinRoom}
              inBreakout={inBreakout}
              currentRoom={currentRoom}
              leaveRoom={leaveRoom}
              selectedParticipant={selectedParticipant}
              setSelectedParticipant={setSelectedParticipant}
              roomSharedCards={roomSharedCards}
              cardSharingParticipant={cardSharingParticipant}
              shareCardToRoom={shareCardToRoom}
              replaceSharedCard={replaceSharedCard}
            />
          </ErrorBoundary>
        ) : view === "library" ? (
          <LibraryBody />
        ) : view === "reports" ? (
          <ReportsBody />
        ) : view === "clients" ? (
          <ClientsBody />
        ) : view === "calendar" ? (
          <CalendarBody />
        ) : view === "marketplace" ? (
          <MarketplaceBody />
        ) : (
          <SettingsBody />
        )}
      </div>
    </div>
  );
}

function AICopilotPanel(){
  const nudges: { id:string; title:string; reason:string; suggestion:string; difficulty:1|2|3; cooldown:number }[] = [
    { id: "n1", title: "Invite an open 'how' question", reason: "Open-Q ratio dropped to 18% in last 2 min", suggestion: "How might this card be calling you to take a first step this week?", difficulty: 1, cooldown: 30 },
    { id: "n2", title: "Reflect & validate", reason: "Tension spike detected for Leah", suggestion: "I'm hearing both courage and uncertainty in what you shared.", difficulty: 2, cooldown: 45 },
  ];
  return (
    <div className="rounded-2xl border border-black/10 bg-white/80">
      <div className="px-3 py-2 border-b border-black/10 flex items-center gap-2 text-sm">
        <Bot className="h-4 w-4 text-emerald-700"/>
        <div className="font-semibold">AI Copilot</div>
        <div className="ml-auto text-[11px] text-slate-500">Private</div>
      </div>
      <div className="p-3 space-y-2">
        <div className="text-xs text-slate-600">Live Nudges</div>
        {nudges.map(n => (
          <div key={n.id} className="rounded-xl border border-black/10 bg-white/80 p-3">
            <div className="text-sm font-medium">{n.title}</div>
            <div className="text-xs text-slate-600">{n.reason}</div>
            <div className="mt-2 text-sm">{n.suggestion}</div>
            <div className="mt-2 flex items-center gap-2">
              <button className="px-2.5 py-1 text-xs rounded-lg bg-emerald-600 text-white">Accept</button>
              <button className="px-2.5 py-1 text-xs rounded-lg bg-slate-200">Edit</button>
              <button className="px-2 py-1 text-xs rounded-lg hover:bg-slate-100">Dismiss</button>
              <span className="ml-auto text-[10px] text-slate-500">Lvl {n.difficulty} · cooldown {n.cooldown}s</span>
            </div>
          </div>
        ))}
      </div>
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
    <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
      <div className="text-sm font-semibold mb-3">Signals</div>
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
    </div>
  );
}

/* ——— Session Page ——— */
function SessionBody({ 
  captions, 
  setCaptions, 
  step, 
  setStep, 
  assignmentOpen, 
  setAssignmentOpen, 
  groups, 
  joinRoom, 
  inBreakout, 
  currentRoom, 
  leaveRoom,
  selectedParticipant,
  setSelectedParticipant,
  roomSharedCards,
  cardSharingParticipant,
  shareCardToRoom,
  replaceSharedCard
}:{
  captions:boolean; 
  setCaptions:(v:boolean)=>void; 
  step:number; 
  setStep:(n:number)=>void; 
  assignmentOpen:boolean; 
  setAssignmentOpen:(v:boolean)=>void; 
  groups:Room[]; 
  joinRoom:(id:string)=>void; 
  inBreakout:boolean; 
  currentRoom:Room|null; 
  leaveRoom:()=>void;
  selectedParticipant: ParticipantCard | null;
  setSelectedParticipant: (participant: ParticipantCard | null) => void;
  roomSharedCards: {[roomId: string]: SharedCard[]};
  cardSharingParticipant: {[roomId: string]: string};
  shareCardToRoom: (roomId: string, card: CardType, participantName: string) => void;
  replaceSharedCard: (roomId: string, cardIndex: number, newCard: CardType, participantName: string) => void;
}){
  return (
    <>
      <div className="grid grid-cols-12 h-full overflow-hidden">
        {/* Stage */}
        <section className="col-span-12 lg:col-span-8 p-4 sm:p-6 flex flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
          {/* Video/meeting area */}
          <div className="rounded-2xl bg-slate-100 border border-slate-200 p-4 w-full">
            {/* Video Grid Frame */}
            <div className="bg-black rounded-xl overflow-hidden" style={{ aspectRatio: '3/2', minWidth: '600px' }}>
              <div className="h-full w-full grid gap-1 p-1" style={{ 
                gridTemplateColumns: '1fr 1fr 1fr', 
                gridTemplateRows: '1fr 1fr'
              }}>
                {sampleParticipants.slice(0, 6).map((p, i) => (
                  <div key={p} className="relative rounded-md overflow-hidden">
                    <img 
                      src={getAvatarUrl(p, 240)}
                      alt={p}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-2 left-2 text-[11px] text-white/90 bg-black/40 rounded px-1.5 py-0.5">{p}</div>
                    {i === 1 && (
                      <div className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded bg-emerald-600 text-white">Speaking</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Controls bar */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <CallButton icon={<Mic className="h-4 w-4" />} label="Mute" />
              <CallButton icon={<Video className="h-4 w-4" />} label="Video" />
              <CallButton icon={<ScreenShare className="h-4 w-4" />} label="Share" />
              <CallButton active={captions} onClick={() => setCaptions(!captions)} icon={<Captions className="h-4 w-4" />} label="Captions" />
              <CallButton danger icon={<X className="h-4 w-4" />} label="Leave" />
            </div>
            
            {/* AI hint */}
            <div className="mt-3 bg-emerald-600/90 text-white text-xs rounded-lg px-2 py-1 flex items-center gap-1 w-fit">
              <Bot className="h-3.5 w-3.5" /> Try an open "how" now
            </div>
          </div>

          {/* Participant Cards Display */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Participant Cards</h3>
              <div className="text-sm text-slate-600">{participantCards.length} participants</div>
            </div>
            <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {participantCards.map(participant => (
                  <ParticipantCardDisplay 
                    key={participant.id} 
                    participant={participant}
                    onClick={() => setSelectedParticipant(participant)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Shared activity/content */}
          <div className="rounded-2xl bg-white/80 border border-black/5 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold">Activity · {agenda[step - 1]}</div>
              <div className="text-xs text-slate-600">Step {step} of {agenda.length}</div>
            </div>
            <p className="text-sm text-slate-700">
              {step === 1 && "Welcome! Take a moment to pause and share how you're feeling right now using one word."}
              {step === 2 && "Look at your card and write one sentence that connects it to your current transition. When ready, share with your partner. We'll return in 06:00."}
              {step === 3 && "Share your sentence with the group. Listen for themes and connections between different perspectives."}
              {step === 4 && "Based on today's session, what's one small action you could take before we meet again?"}
            </p>
            
            {/* Elements for Pause phase */}
            {step === 1 && (
              <div className="mt-4 mb-4">
                <div className="text-xs font-medium text-slate-600 mb-2">Phase Elements:</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center">
                      <span className="text-xs font-bold">W</span>
                    </div>
                    <span className="text-slate-600">One-word check-in</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center">
                      <span className="text-xs font-bold">P</span>
                    </div>
                    <span className="text-slate-600">How are you feeling?</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center">
                      <span className="text-xs font-bold">V</span>
                    </div>
                    <span className="text-slate-600">Welcome Card</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center">
                      <span className="text-xs font-bold">E</span>
                    </div>
                    <span className="text-slate-600">Two-word check-in</span>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              <textarea 
                className="w-full min-h-[84px] rounded-xl border border-black/10 p-3 text-sm bg-white/90" 
                placeholder={
                  step === 1 ? "One word describing how you feel..." :
                  step === 2 ? "Your sentence here…" :
                  step === 3 ? "Notes from sharing..." :
                  "Your action commitment..."
                }
                defaultValue={
                  step === 2 ? "I notice this bridge represents the courage I need to take my next career step." :
                  step === 3 ? "Everyone seems to be at a similar transition point, just in different areas of life." :
                  ""
                }
              />
              <div className="rounded-xl border border-black/10 bg-white/60 p-3 text-xs">
                <div className="font-medium mb-1">Tip from POY Coach</div>
                <div className="text-slate-700">
                  {step === 1 && "No right or wrong answers. Just notice what comes up first."}
                  {step === 2 && "Start with \"I notice…\" or \"I'm learning…\" and keep it specific."}
                  {step === 3 && "Listen for the emotions and values behind each person's words."}
                  {step === 4 && "Keep it small and specific. What's one thing you can do this week?"}
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm">
                {step <= 2 ? "Share to group" : step === 4 ? "Commit to action" : "Continue"}
              </button>
              <button className="px-3 py-2 rounded-xl bg-slate-200 text-sm">Save note</button>
              {step === 2 && <button className="px-3 py-2 rounded-xl bg-blue-600 text-white text-sm">Start breakouts</button>}
            </div>
          </div>
        </section>

        {/* Right rail: AI Copilot + Signals + assignment + groups */}
        <aside className="hidden lg:block col-span-4 border-l border-black/5 bg-white/60 backdrop-blur-sm p-4 sm:p-6 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
          <AICopilotPanel />
          <SignalsPanel />
          <AssignmentCard open={assignmentOpen} onToggle={() => setAssignmentOpen(!assignmentOpen)} />
          <GroupsPanel groups={groups} onJoin={joinRoom} />
          <SafetyCard />
        </aside>
      </div>

      {/* Footer: tiny chat */}
      <footer className="border-t border-black/5 bg-white/70 backdrop-blur-md p-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-slate-500" />
          <input placeholder="Send a message to everyone…" className="flex-1 px-3 py-2 rounded-xl border border-black/10 bg-white/90 text-sm" />
          <button className="px-3 py-2 rounded-xl bg-black text-white text-sm">Send</button>
        </div>
      </footer>

      {/* Breakout overlay */}
      {inBreakout && currentRoom && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="px-4 sm:px-6 py-3 border-b border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm"><ArrowLeft className="h-4 w-4" /> Room {currentRoom.name}</div>
              <div className="text-xs text-slate-600">Auto return in 06:00</div>
            </div>
            <div className="p-4 grid grid-cols-12 gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 max-h-96">
              <div className="col-span-12 md:col-span-8">
                <div className="bg-slate-100 border border-slate-200 rounded-xl p-4">
                  <div className="bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '3/2', minWidth: '400px' }}>
                    <div className="h-full w-full grid gap-1 p-1" style={{ 
                      gridTemplateColumns: '1fr 1fr 1fr', 
                      gridTemplateRows: '1fr 1fr'
                    }}>
                      {currentRoom.members.map((m, i) => (
                        <div key={m} className="relative bg-slate-800/80 rounded-md flex items-end p-2">
                          <div className="text-[11px] text-white/90 bg-black/40 rounded px-1.5 py-0.5">{m}</div>
                          {i === 0 && <div className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded bg-emerald-600 text-white">Speaking</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <CallButton icon={<Mic className="h-4 w-4" />} label="Mute" />
                    <CallButton icon={<Video className="h-4 w-4" />} label="Video" />
                    <CallButton icon={<MessageSquare className="h-4 w-4" />} label="Chat" />
                    <CallButton active={captions} onClick={() => setCaptions(!captions)} icon={<Captions className="h-4 w-4" />} label="Captions" />
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 space-y-3">
                {/* Room Shared Cards */}
                <RoomSharedCardsPanel 
                  roomId={currentRoom.id}
                  sharedCards={roomSharedCards[currentRoom.id] || []}
                  currentParticipant="You"
                  canShare={!cardSharingParticipant[currentRoom.id] || cardSharingParticipant[currentRoom.id] === "You"}
                  onShareCard={(card) => shareCardToRoom(currentRoom.id, card, "You")}
                  onReplaceCard={(cardIndex, newCard) => replaceSharedCard(currentRoom.id, cardIndex, newCard, "You")}
                />
                
                <div className="rounded-xl border border-black/10 bg-white/70 p-3 text-sm">
                  <div className="font-medium mb-1">Your assignment</div>
                  <ol className="list-decimal list-inside text-slate-700 space-y-1 text-sm">
                    <li>Each shares the one sentence (1 min each).</li>
                    <li>Ask one open question to your partner.</li>
                    <li>Write a shared action in chat.</li>
                  </ol>
                </div>
                <div className="rounded-xl border border-black/10 bg-white/70 p-3 text-sm">
                  <div className="font-medium mb-1">Room chat</div>
                  <div className="h-28 overflow-auto text-xs text-slate-700 border border-black/5 rounded-md p-2 bg-white/80">
                    <p><span className="font-medium">Dana:</span> I’ll try one small outreach this week.</p>
                    <p><span className="font-medium">Ido:</span> What would make it a 7/10?</p>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <input className="flex-1 px-2 py-1.5 rounded-lg border border-black/10 bg-white" placeholder="Type here…" />
                    <button className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs">Send</button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button onClick={leaveRoom} className="px-3 py-2 rounded-xl bg-slate-200 text-sm">Return to main</button>
                  <button className="px-3 py-2 rounded-xl bg-black text-white text-sm">Ask for help</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Participant Detail Modal */}
      {selectedParticipant && (
        <ParticipantDetailModal
          participant={selectedParticipant}
          onClose={() => setSelectedParticipant(null)}
        />
      )}
    </>
  );
}

/* ——— Library Page ——— */
function LibraryBody(){
  const [query, setQuery] = useState("");
  const items = sampleLibrary.filter(i => (
    i.title.toLowerCase().includes(query.toLowerCase()) ||
    i.tags.join(" ").toLowerCase().includes(query.toLowerCase())
  ));
  const [selected, setSelected] = useState<LibItem | null>(items[0] ?? null);

  return (
    <div className="grid grid-cols-12 h-full">
      <aside className="hidden lg:block col-span-3 border-r border-black/5 bg-white/60 p-4 space-y-4">
        <div className="text-sm font-semibold">Filters</div>
        <div className="text-xs space-y-2">
          <div className="font-medium">Type</div>
          <div className="flex flex-wrap gap-1">
            {(["word", "image", "prompt", "exercise", "template", "deck"] as LibType[]).map(t => (
              <span key={t} className="px-2 py-1 rounded-full bg-slate-100">{t}</span>
            ))}
          </div>
          <div className="font-medium mt-3">Tags</div>
          <div className="flex flex-wrap gap-1">
            {"values,strengths,open,reflection,how,action,coaching,management".split(",").map(t => (
              <span key={t} className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">#{t}</span>
            ))}
          </div>
        </div>
      </aside>

      <main className="col-span-12 lg:col-span-6 p-4 space-y-3 overflow-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Content Library</h2>
          <button 
            onClick={() => { location.hash = "#facilitator"; }}
            className="px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center gap-1 text-xs"
          >
            🎯 Return to Studio
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search library…" className="pl-8 pr-3 py-2 text-sm rounded-xl border border-black/10 bg-white/90 w-[280px]" />
          </div>
          <button className="px-3 py-2 text-xs rounded-xl border border-black/10 bg-white flex items-center gap-1"><Filter className="h-4 w-4"/> Filters</button>
          <button className="px-3 py-2 text-xs rounded-xl bg-emerald-600 text-white flex items-center gap-1"><Plus className="h-4 w-4"/> New</button>
          <button className="px-3 py-2 text-xs rounded-xl border border-black/10 bg-white flex items-center gap-1"><Upload className="h-4 w-4"/> Import</button>
          <button className="px-3 py-2 text-xs rounded-xl border border-black/10 bg-white flex items-center gap-1"><Download className="h-4 w-4"/> Export</button>
          <div className="ml-auto text-xs inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-black/10 bg-white">Sort <ChevronDown className="h-4 w-4"/></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {items.map(i => (
            <button key={i.id} onClick={()=>setSelected(i)} className="text-left rounded-xl border border-black/10 bg-white/80 p-4 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 group">
              {/* Visual Card */}
              <div className="relative mb-3">
                {i.type === "word" && (
                  <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
                    <div className="text-4xl font-bold text-blue-800 transform group-hover:scale-110 transition-transform duration-200">
                      {i.title.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">📝</span>
                    </div>
                  </div>
                )}
                {i.type === "image" && (
                  <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center relative overflow-hidden">
                    <div className="text-4xl">🖼️</div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">🖼️</span>
                    </div>
                  </div>
                )}
                {i.type === "prompt" && (
                  <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative overflow-hidden">
                    <div className="text-4xl">❓</div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">❓</span>
                    </div>
                  </div>
                )}
                {i.type === "exercise" && (
                  <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative overflow-hidden">
                    <div className="text-4xl">🏃</div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">🏃</span>
                    </div>
                  </div>
                )}
                {i.type === "template" && (
                  <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center relative overflow-hidden">
                    <div className="text-4xl">📋</div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">📋</span>
                    </div>
                  </div>
                )}
                {i.type === "deck" && (
                  <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center relative overflow-hidden">
                    <div className="text-4xl">🃏</div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">🃏</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="space-y-2">
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  {i.type === "word" && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                  {i.type === "image" && <span className="w-2 h-2 bg-purple-500 rounded-full"></span>}
                  {i.type === "prompt" && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
                  {i.type === "exercise" && <span className="w-2 h-2 bg-orange-500 rounded-full"></span>}
                  {i.type === "template" && <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>}
                  {i.type === "deck" && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
                  {i.type}
                </div>
                <div className="text-sm font-medium truncate">{i.title}</div>
                <div className="text-[11px] text-slate-500 truncate">{i.tags.map(t=>`#${t}`).join("  ")}</div>
                {i.rating && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-xs text-slate-600">{i.rating}</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </main>

      <aside className="hidden lg:block col-span-3 border-l border-black/5 bg-white/60 p-4">
        <div className="text-sm font-semibold mb-2">Preview</div>
        {selected ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-black/10 bg-white/80 p-4 shadow-sm">
              {/* Visual Preview */}
              <div className="relative mb-4">
                {selected.type === "word" && (
                  <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
                    <div className="text-5xl font-bold text-blue-800">
                      {selected.title.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute top-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📝</span>
                    </div>
                  </div>
                )}
                {selected.type === "image" && (
                  <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center relative overflow-hidden">
                    <div className="text-5xl">🖼️</div>
                    <div className="absolute top-2 right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🖼️</span>
                    </div>
                  </div>
                )}
                {selected.type === "prompt" && (
                  <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative overflow-hidden">
                    <div className="text-5xl">❓</div>
                    <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">❓</span>
                    </div>
                  </div>
                )}
                {selected.type === "exercise" && (
                  <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative overflow-hidden">
                    <div className="text-5xl">🏃</div>
                    <div className="absolute top-2 right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🏃</span>
                    </div>
                  </div>
                )}
                {selected.type === "template" && (
                  <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center relative overflow-hidden">
                    <div className="text-5xl">📋</div>
                    <div className="absolute top-2 right-2 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📋</span>
                    </div>
                  </div>
                )}
                {selected.type === "deck" && (
                  <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center relative overflow-hidden">
                    <div className="text-5xl">🃏</div>
                    <div className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🃏</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Content Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    {selected.type === "word" && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                    {selected.type === "image" && <span className="w-2 h-2 bg-purple-500 rounded-full"></span>}
                    {selected.type === "prompt" && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
                    {selected.type === "exercise" && <span className="w-2 h-2 bg-orange-500 rounded-full"></span>}
                    {selected.type === "template" && <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>}
                    {selected.type === "deck" && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
                    {selected.type}
                  </div>
                  {selected.rating && (
                    <div className="flex items-center gap-1 ml-auto">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-sm font-medium">{selected.rating}</span>
                    </div>
                  )}
                </div>
                
                <div className="text-lg font-semibold">{selected.title}</div>
                
                {selected.author && (
                  <div className="text-sm text-slate-600 flex items-center gap-1">
                    <span className="w-4 h-4 bg-slate-200 rounded-full flex items-center justify-center text-xs">👤</span>
                    by {selected.author}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-1">
                  {selected.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {selected.description && (
                  <div className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg">
                    {selected.description}
                  </div>
                )}
                
                <div className="flex flex-col gap-2 pt-2">
                  <button className="w-full px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors">
                    Use in session
                  </button>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 rounded-lg bg-slate-200 text-slate-700 text-sm hover:bg-slate-300 transition-colors">
                      Edit
                    </button>
                    <button className="flex-1 px-3 py-2 rounded-lg bg-slate-200 text-slate-700 text-sm hover:bg-slate-300 transition-colors">
                      Duplicate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📚</div>
            <div className="text-sm text-slate-500">Select an item to preview</div>
          </div>
        )}
      </aside>
    </div>
  );
}

/* ——— Reports Page ——— */
function ReportsBody(){
  // Mock KPIs
  const kpis = [
    { label:"Open-question ratio", value: 42, unit:"%" },
    { label:"Reflections per hour", value: 8.3, unit:"" },
    { label:"Talk-time balance", value: 0.78, unit:"equity idx" },
  ];
  const trend = [18,22,28,35,33,40,42];

  return (
    <div className="h-full grid grid-cols-12">
      <aside className="hidden lg:block col-span-3 border-r border-black/5 bg-white/60 p-4 space-y-3">
        <div className="text-sm font-semibold">Filters</div>
        <div className="text-xs">Date range</div>
        <div className="flex items-center gap-1 text-xs">
          <button className="px-2 py-1 rounded-lg border border-black/10 bg-white">Last 7d</button>
          <button className="px-2 py-1 rounded-lg border border-black/10 bg-white">Last 30d</button>
          <button className="px-2 py-1 rounded-lg border border-black/10 bg-white">Quarter</button>
        </div>
        <div className="text-xs mt-3">Cohort</div>
        <div className="px-2 py-1 rounded-lg border border-black/10 bg-white text-xs">All participants</div>
        <div className="text-xs mt-3">Export</div>
        <button className="px-3 py-2 rounded-lg border border-black/10 bg-white text-xs inline-flex items-center gap-1"><Download className="h-4 w-4"/> CSV</button>
      </aside>

      <main className="col-span-12 lg:col-span-9 p-4 space-y-4 overflow-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChartIcon className="h-5 w-5"/>
            <div className="text-sm font-semibold">Session insights</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-black/10 bg-white">Refresh <TrendingUp className="h-4 w-4"/></div>
            <button 
              onClick={() => { location.hash = "#studio"; }}
              className="px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center gap-1 text-xs"
            >
              🎯 Return to Studio
            </button>
          </div>
        </div>

        {/* KPI tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {kpis.map(k => (
            <div key={k.label} className="rounded-xl border border-black/10 bg-white/80 p-4">
              <div className="text-xs text-slate-600 mb-1">{k.label}</div>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-semibold">{k.value}<span className="text-base align-super">{k.unit}</span></div>
                {k.label.includes("ratio") && <Donut percent={k.value} />}
              </div>
            </div>
          ))}
        </div>

        {/* Trend */}
        <div className="rounded-xl border border-black/10 bg-white/80 p-4">
          <div className="text-xs text-slate-600 mb-2">Open-question ratio over time</div>
          <Bars data={trend} max={100}/>
        </div>

        {/* Participant Analytics */}
        <div className="rounded-xl border border-black/10 bg-white/80 p-4">
          <div className="text-xs text-slate-600 mb-3">Participant Progress Overview</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {clients.filter(c => c.status === "active").map(client => (
              <div key={client.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-semibold">
                    {client.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                  </div>
                  <div className="font-medium text-xs">{client.name}</div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Journal entries:</span>
                    <span className="font-medium">{client.journalEntries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reflection streak:</span>
                    <span className="font-medium">{client.reflectionStreak}d</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Goals completed:</span>
                    <span className="font-medium">{client.goalsCompleted}/8</span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-slate-600 bg-blue-50 rounded p-2">
                  <div className="font-medium text-blue-800 mb-1">Key Theme</div>
                  <div className="text-blue-700">#{client.themes[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Session Table */}
        <div className="rounded-xl border border-black/10 bg-white/80 p-4">
          <div className="text-xs text-slate-600 mb-2">Recent sessions</div>
          <div className="overflow-auto">
            <table className="w-full text-xs">
              <thead className="text-slate-600">
                <tr>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left">Title</th>
                  <th className="text-left">Open-Q %</th>
                  <th className="text-left">Reflections</th>
                  <th className="text-left">Talk-time equity</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {d:"2025-08-10", t:"Crossing Inner Bridges", oq:44, r:9, eq:0.81},
                  {d:"2025-08-03", t:"Team Reset", oq:37, r:6, eq:0.73},
                  {d:"2025-07-27", t:"Leadership Lab", oq:41, r:8, eq:0.76},
                ].map((row) => (
                  <tr key={row.d} className="border-t border-black/5">
                    <td className="py-2">{row.d}</td>
                    <td>{row.t}</td>
                    <td>{row.oq}%</td>
                    <td>{row.r}</td>
                    <td>{row.eq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ——— Small UI helpers ——— */
function ProviderPill({ provider, state }: { provider: Provider; state: MeetingState }) {
  const icon = provider === "zoom" ? "🟦" : "🟢";
  const stateText = state === "live" ? "Live" : state === "scheduled" ? "Scheduled" : state === "ended" ? "Ended" : "";
  return (
    <div className="flex items-center gap-2 text-xs bg-white border border-black/5 rounded-xl px-3 py-1.5">
      <span className="text-lg" aria-hidden>{icon}</span>
      <span>{provider === "zoom" ? "Zoom" : "Google Meet"} {stateText && `· ${stateText}`}</span>
    </div>
  );
}

function ConsentBadge() {
  return (
    <div className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
      <Check className="h-3.5 w-3.5" /> Consent on
    </div>
  );
}

function AssignmentCard({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Current assignment</div>
          <div className="text-xs text-slate-600">Pairs or trios (2–4 people)</div>
        </div>
        <button onClick={onToggle} className="text-xs px-2 py-1 rounded-lg border border-black/10 bg-white hover:bg-slate-50">{open ? "Hide" : "Show"}</button>
      </div>
      {open && (
        <div className="mt-3 text-sm">
          <ol className="list-decimal list-inside text-slate-700 space-y-1">
            <li>Share your sentence with your partner(s).</li>
            <li>Ask one open question.</li>
            <li>Capture one action you’ll try before next time.</li>
          </ol>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <div className="px-2 py-1 rounded-full bg-slate-100">Timebox: 06:00</div>
            <div className="px-2 py-1 rounded-full bg-slate-100">Return automatically</div>
          </div>
        </div>
      )}
    </div>
  );
}

function GroupsPanel({ groups, onJoin }: { groups: Room[]; onJoin: (id: string) => void }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
      <div className="text-sm font-semibold mb-2">Your groups</div>
      <div className="grid grid-cols-2 gap-3">
        {groups.map(g => (
          <div key={g.id} className="rounded-xl border border-black/10 bg-white p-3 text-xs">
            <div className="font-medium mb-1">Room {g.name}</div>
            <div className="flex flex-wrap gap-1 mb-2">
              {g.members.map(m => <span key={m} className="px-2 py-0.5 rounded-full bg-slate-100">{m}</span>)}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-slate-500">{g.members.length} people</div>
              <button onClick={() => onJoin(g.id)} className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white">Join</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SafetyCard() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs flex items-start gap-2">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <div>
        <div className="font-medium">Ground rules</div>
        <div className="text-slate-700">Confidentiality, one voice at a time, invite silence, ask open questions.</div>
      </div>
    </div>
  );
}

function CallButton({ icon, label, active = false, danger = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; danger?: boolean; onClick?: () => void }) {
  const getVariant = () => {
    if (danger) return 'danger';
    if (active) return 'success';
    return 'secondary';
  };
  
  return (
    <Button 
      onClick={onClick} 
      variant={getVariant()} 
      size="xs" 
      leftIcon={icon}
      isActive={active}
    >
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );
}

function Donut({ percent }: { percent: number }){
  const p = Math.max(0, Math.min(100, percent));
  const background = `conic-gradient(#10b981 ${p}%, #e5e7eb 0)`;
  return (
    <div className="ml-auto w-10 h-10 rounded-full" style={{ background }} />
  );
}

function Bars({ data, max }:{ data:number[]; max:number }){
  const m = max || Math.max(...data, 1);
  return (
    <div className="flex items-end gap-2 h-28">
      {data.map((v,i)=> (
        <div key={i} className="flex-1 rounded bg-emerald-600" style={{ height: `${(v/m)*100}%` }} />
      ))}
    </div>
  );
}

function ParticipantCardDisplay({ participant, onClick }: { participant: ParticipantCard; onClick?: () => void }) {
  return (
    <div 
      className={`bg-white/80 backdrop-blur-sm rounded-lg border border-black/5 p-3 transition-colors ${
        onClick ? 'hover:border-blue-300 cursor-pointer hover:shadow-md' : 'hover:border-blue-300'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
          {participant.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium truncate">{participant.name}</div>
          <div className="text-[10px] text-slate-500 capitalize">{participant.status}</div>
        </div>
        {onClick && (
          <div className="text-xs text-blue-600">👁️</div>
        )}
      </div>
      
      {participant.selectedCard ? (
        <div className="space-y-1">
          <div className="aspect-[4/3]">
            <CardDisplay
              card={participant.selectedCard}
              size="sm"
              variant="compact"
              showTitle={true}
              showDescription={false}
              className="w-full h-full"
            />
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

/* ——— New Components ——— */
function ParticipantDetailModal({ participant, onClose }: { participant: ParticipantCard; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
              {participant.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="font-semibold">{participant.name}</div>
              <div className="text-sm text-slate-600 capitalize">{participant.status}</div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          {participant.selectedCard ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <CardDisplay
                  card={participant.selectedCard}
                  size="lg"
                  variant="detailed"
                  showTitle={true}
                  showDescription={true}
                  showThemes={true}
                  className="max-w-sm"
                />
              </div>
              {participant.reflection && (
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="text-sm font-medium text-slate-700 mb-2">Personal Reflection</div>
                  <div className="text-slate-800 italic">"{participant.reflection}"</div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <div className="text-lg mb-2">No card selected yet</div>
              <div className="text-sm">This participant is still choosing their card.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RoomSharedCardsPanel({ 
  roomId, 
  sharedCards, 
  currentParticipant, 
  canShare, 
  onShareCard, 
  onReplaceCard 
}: {
  roomId: string;
  sharedCards: SharedCard[];
  currentParticipant: string;
  canShare: boolean;
  onShareCard: (card: CardType) => void;
  onReplaceCard: (cardIndex: number, newCard: CardType) => void;
}) {
  const [showCardSelector, setShowCardSelector] = useState(false);
  const [replacingCardIndex, setReplacingCardIndex] = useState<number | null>(null);

  const sampleCards: CardType[] = getRandomCards(6);

  const handleCardSelect = (card: CardType) => {
    if (replacingCardIndex !== null) {
      onReplaceCard(replacingCardIndex, card);
      setReplacingCardIndex(null);
    } else {
      onShareCard(card);
    }
    setShowCardSelector(false);
  };

  const handleReplaceCard = (cardIndex: number) => {
    setReplacingCardIndex(cardIndex);
    setShowCardSelector(true);
  };

  return (
    <div className="rounded-xl border border-black/10 bg-white/70 p-3 text-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="font-medium">Shared Cards ({sharedCards.length}/3)</div>
        {canShare && sharedCards.length < 3 && (
          <button 
            onClick={() => setShowCardSelector(true)}
            className="px-2 py-1 text-xs bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Share Card
          </button>
        )}
      </div>

      <div className="space-y-2">
        {sharedCards.map((sharedCard, index) => (
          <div key={sharedCard.id} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-black/5">
            <div className="w-12 h-8">
              <CardDisplay
                card={sharedCard.card}
                size="sm"
                variant="compact"
                showTitle={false}
                className="w-full h-full"
              />
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium">{sharedCard.card.title}</div>
              <div className="text-xs text-slate-600">by {sharedCard.sharedBy}</div>
            </div>
            {sharedCard.sharedBy !== currentParticipant && (
              <button 
                onClick={() => handleReplaceCard(index)}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                Replace
              </button>
            )}
          </div>
        ))}
        
        {sharedCards.length === 0 && (
          <div className="text-center text-slate-500 py-4">
            <div className="text-xs">No cards shared yet</div>
            <div className="text-xs mt-1">Share your card to start the discussion</div>
          </div>
        )}
      </div>

      {/* Card Selector Modal */}
      {showCardSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-black/5 flex items-center justify-between">
              <div className="font-semibold">
                {replacingCardIndex !== null ? "Replace Card" : "Share Your Card"}
              </div>
              <button 
                onClick={() => {
                  setShowCardSelector(false);
                  setReplacingCardIndex(null);
                }}
                className="p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {sampleCards.map(card => (
                  <div
                    key={card.id}
                    className="p-3 rounded-lg border border-black/10 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
                  >
                    <CardDisplay
                      card={card}
                      size="md"
                      variant="detailed"
                      showTitle={true}
                      showDescription={true}
                      onClick={() => handleCardSelect(card)}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ——— Error Boundary ——— */
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error?: unknown }>{
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }
  componentDidCatch(error: unknown, info: unknown) {
    // eslint-disable-next-line no-console
    console.error("Session view error:", error, info);
  }
  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };
  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-2xl border border-red-200 bg-red-50 p-4 text-sm">
            <div className="font-semibold text-red-700 mb-1">Something went wrong in the session view</div>
            <div className="text-red-700 mb-3">Please try again. If the issue persists, refresh the page.</div>
            <button onClick={this.handleReset} className="px-3 py-2 rounded-lg bg-red-600 text-white">Retry</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ——— Mock data ——— */
const agenda = ["Pause", "Expand", "Focus", "Doing"];

const sampleParticipants = ["Dana", "Ido", "Leah", "Noa", "Amit", "Sara", "Yuri", "Maya", "Omer", "Tali", "Ben", "Zohar"];

const sampleGroups: Room[] = [
  { id: "r1", name: "A", members: ["Dana", "Ido"] },
  { id: "r2", name: "B", members: ["Leah", "Noa", "Amit"] },
  { id: "r3", name: "C", members: ["Sara", "Yuri", "Maya", "Omer"] },
  { id: "r4", name: "D", members: ["Tali", "Ben"] },
];

// Library data
type LibType = "word" | "image" | "prompt" | "exercise" | "template" | "deck";
interface LibItem { id:string; type:LibType; title:string; tags:string[]; description?:string; author?:string; rating?:number; }
const sampleLibrary: LibItem[] = [
  { id:"l1", type:"word", title:"Courageous", tags:["values","strengths"], description:"A word card for exploring personal courage" },
  { id:"l2", type:"word", title:"Renewal", tags:["reflection"], description:"Focus on fresh starts and new beginnings" },
  { id:"l3", type:"image", title:"Bridge at Dawn", tags:["transition","how"], description:"Visual metaphor for crossing into something new" },
  { id:"l4", type:"prompt", title:"What's a first step you could try?", tags:["open","action"], description:"Action-oriented question for forward movement" },
  { id:"l5", type:"exercise", title:"Two-word check-in", tags:["warmup"], description:"Quick emotional temperature check", author:"POY Master Trainer" },
  { id:"l6", type:"prompt", title:"What's another way to look at this?", tags:["reframe"], description:"Perspective-shifting question" },
  { id:"l7", type:"deck", title:"Coaching Game", tags:["coaching","professional"], description:"Official POY coaching deck with 65 cards", author:"Efrat Shokef", rating:4.8 },
  { id:"l8", type:"template", title:"1:1 Feedback Session", tags:["feedback","management"], description:"Structured template for giving constructive feedback", author:"HR Expert", rating:4.6 },
  { id:"l9", type:"template", title:"Team Retrospective", tags:["team","agile"], description:"Agile retrospective with POY cards", author:"Scrum Master", rating:4.7 },
  { id:"l10", type:"image", title:"Mountain Path", tags:["journey","challenge"], description:"Winding path up a mountain - overcoming obstacles" },
  { id:"l11", type:"word", title:"Authentic", tags:["values","identity"], description:"Being true to yourself" },
  { id:"l12", type:"exercise", title:"Card Dialogue", tags:["reflection","pairs"], description:"Partners ask questions based on each other's cards", author:"POY Academy" },
];

/* ——— Additional Page Components ——— */

/* ——— Clients Page ——— */
function ClientsBody(){
  const [selectedClient, setSelectedClient] = useState<Client | null>(clients[0] ?? null);
  const [view, setView] = useState<"list" | "cohorts">("list");

  return (
    <div className="grid grid-cols-12 h-full">
      <aside className="hidden lg:block col-span-3 border-r border-black/5 bg-white/60 p-4 space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <button onClick={() => setView("list")} className={`px-3 py-1.5 rounded-lg ${view === "list" ? "bg-emerald-600 text-white" : "bg-white"}`}>Individual</button>
          <button onClick={() => setView("cohorts")} className={`px-3 py-1.5 rounded-lg ${view === "cohorts" ? "bg-emerald-600 text-white" : "bg-white"}`}>Cohorts</button>
        </div>
        <div className="text-sm font-semibold">Filters</div>
        <div className="text-xs space-y-2">
          <div className="font-medium">Status</div>
          <div className="flex flex-wrap gap-1">
            {["active", "archived", "prospect"].map(s => (
              <span key={s} className="px-2 py-1 rounded-full bg-slate-100">{s}</span>
            ))}
          </div>
          <div className="font-medium mt-3">Tags</div>
          <div className="flex flex-wrap gap-1">
            {"leadership,coaching,hr,team".split(",").map(t => (
              <span key={t} className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">#{t}</span>
            ))}
          </div>
        </div>
      </aside>

      <main className="col-span-12 lg:col-span-6 p-4 space-y-3 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Clients & Participants</h2>
          <button 
            onClick={() => { location.hash = "#facilitator"; }}
            className="px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center gap-1 text-xs"
          >
            🎯 Return to Studio
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
            <input placeholder="Search clients..." className="pl-8 pr-3 py-2 text-sm rounded-xl border border-black/10 bg-white/90 w-[280px]" />
          </div>
          <button className="px-3 py-2 text-xs rounded-xl bg-emerald-600 text-white flex items-center gap-1"><Plus className="h-4 w-4"/> Add Client</button>
          <button className="px-3 py-2 text-xs rounded-xl border border-black/10 bg-white flex items-center gap-1"><Upload className="h-4 w-4"/> Import</button>
          <button className="px-3 py-2 text-xs rounded-xl border border-black/10 bg-white flex items-center gap-1"><Download className="h-4 w-4"/> Export</button>
        </div>

        <div className="space-y-2">
          {clients.map(client => (
            <button key={client.id} onClick={() => setSelectedClient(client)} className={`w-full text-left rounded-xl border p-3 hover:border-emerald-300 ${selectedClient?.id === client.id ? "border-emerald-300 bg-emerald-50" : "border-black/10 bg-white/80"}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold">
                    {client.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                  </div>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-slate-600">{client.role} • {client.organization}</div>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div className={`px-2 py-1 rounded-full ${client.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100"}`}>
                    {client.status}
                  </div>
                  <div className="text-slate-500 mt-1">Last session: {client.lastSession}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>

      <aside className="hidden lg:block col-span-3 border-l border-black/5 bg-white/60 p-4">
        <div className="text-sm font-semibold mb-2">Client Details</div>
        {selectedClient ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-black/10 bg-white/80 p-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold text-lg mb-3 mx-auto">
                {selectedClient.name.split(' ').map(n => n[0]).join('').slice(0,2)}
              </div>
              <div className="text-center">
                <div className="font-medium">{selectedClient.name}</div>
                <div className="text-sm text-slate-600">{selectedClient.role}</div>
                <div className="text-sm text-slate-600">{selectedClient.organization}</div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <button className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-xs">Schedule Session</button>
                <button className="px-3 py-2 rounded-lg bg-slate-200 text-xs">Send Message</button>
              </div>
            </div>
            
            <div className="rounded-xl border border-black/10 bg-white/80 p-3">
              <div className="text-xs font-medium mb-2">Session History</div>
              <div className="space-y-2 text-xs">
                {selectedClient.sessions.map((session, i) => (
                  <div key={i} className="flex justify-between items-center py-1">
                    <span>{session.title}</span>
                    <span className="text-slate-500">{session.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-black/10 bg-white/80 p-3">
              <div className="text-xs font-medium mb-2">Notes & Goals</div>
              <div className="text-xs text-slate-600">{selectedClient.notes}</div>
            </div>

            <div className="rounded-xl border border-black/10 bg-white/80 p-3">
              <div className="text-xs font-medium mb-2">Progress Insights</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Journal Entries</span>
                  <span className="font-medium">{selectedClient.journalEntries}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Reflection Streak</span>
                  <span className="font-medium">{selectedClient.reflectionStreak} days</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Goals Completed</span>
                  <span className="font-medium">{selectedClient.goalsCompleted}/8</span>
                </div>
                <div className="text-xs text-slate-600 mt-2 p-2 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-800 mb-1">💡 AI Insight</div>
                  <div className="text-blue-700">{selectedClient.aiInsight}</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-black/10 bg-white/80 p-3">
              <div className="text-xs font-medium mb-2">Recent Themes</div>
              <div className="flex flex-wrap gap-1">
                {selectedClient.themes.map(theme => (
                  <span key={theme} className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs">
                    #{theme}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-500">Select a client to view details.</div>
        )}
      </aside>
    </div>
  );
}

/* ——— Calendar Page ——— */
function CalendarBody(){
  const [view, setView] = useState<"month" | "week" | "day">("week");
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-black/5">
        <div className="flex items-center gap-4">
          <div className="text-lg font-semibold">
            {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          <div className="flex items-center gap-1 bg-white border border-black/10 rounded-xl p-1 text-xs">
            {(["month", "week", "day"] as const).map(v => (
              <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 rounded-lg ${view === v ? "bg-emerald-600 text-white" : "hover:bg-slate-100"}`}>
                {v[0].toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => { location.hash = "#facilitator"; }}
            className="px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center gap-1 text-xs"
          >
            🎯 Return to Studio
          </button>
          <button className="px-3 py-2 text-xs rounded-xl bg-emerald-600 text-white flex items-center gap-1">
            <Plus className="h-4 w-4"/> New Session
          </button>
          <button className="px-3 py-2 text-xs rounded-xl border border-black/10 bg-white">
            Sync Calendar
          </button>
        </div>
      </div>

      <div className="flex-1 p-4">
        {view === "week" && (
          <div className="h-full">
            <div className="grid grid-cols-8 gap-px bg-slate-200 rounded-lg overflow-hidden">
              <div className="bg-white p-2 text-xs font-medium text-slate-600"></div>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                <div key={day} className="bg-white p-2 text-xs font-medium text-center">
                  {day}
                </div>
              ))}
              
              {Array.from({length: 24}).map((_, hour) => (
                <React.Fragment key={hour}>
                  <div className="bg-white p-2 text-xs text-slate-600 border-r">
                    {hour.toString().padStart(2, '0')}:00
                  </div>
                  {Array.from({length: 7}).map((_, day) => (
                    <div key={day} className="bg-white p-1 min-h-[40px] relative">
                      {/* Sample events */}
                      {hour === 10 && day === 1 && (
                        <div className="absolute inset-1 bg-emerald-100 border border-emerald-300 rounded text-xs p-1">
                          <div className="font-medium">Team Coaching</div>
                          <div className="text-slate-600">with Acme Corp</div>
                        </div>
                      )}
                      {hour === 14 && day === 3 && (
                        <div className="absolute inset-1 bg-blue-100 border border-blue-300 rounded text-xs p-1">
                          <div className="font-medium">1:1 Session</div>
                          <div className="text-slate-600">Sarah Chen</div>
                        </div>
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ——— Marketplace Page ——— */
function MarketplaceBody(){
  const [category, setCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(marketplaceItems[0] ?? null);

  const filteredItems = category === "all" ? marketplaceItems : marketplaceItems.filter(item => item.category === category);

  return (
    <div className="grid grid-cols-12 h-full">
      <aside className="hidden lg:block col-span-3 border-r border-black/5 bg-white/60 p-4 space-y-4">
        <div className="text-sm font-semibold">Categories</div>
        <div className="space-y-1">
          {["all", "templates", "decks", "exercises", "certifications", "coaching", "team-building", "digital", "leadership", "trainer-development", "therapy", "education", "organizational", "online", "advanced", "healthcare", "creative", "research", "international"].map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`w-full text-left px-3 py-2 rounded-lg text-sm ${category === cat ? "bg-emerald-600 text-white" : "hover:bg-white"}`}>
              {cat[0].toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="text-sm font-semibold">Filters</div>
        <div className="text-xs space-y-2">
          <div className="font-medium">Price</div>
          <div className="flex flex-wrap gap-1">
            {["free", "paid", "premium"].map(p => (
              <span key={p} className="px-2 py-1 rounded-full bg-slate-100">{p}</span>
            ))}
          </div>
          <div className="font-medium mt-3">Rating</div>
          <div className="flex items-center gap-1">
            {"★★★★☆".split("").map((star, i) => (
              <span key={i} className="text-yellow-400">{star}</span>
            ))}
            <span className="text-xs text-slate-600 ml-1">4+ stars</span>
          </div>
        </div>
      </aside>

      <main className="col-span-12 lg:col-span-6 p-4 space-y-3 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Marketplace</h2>
          <button 
            onClick={() => { location.hash = "#facilitator"; }}
            className="px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center gap-1 text-xs"
          >
            🎯 Return to Studio
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
            <input placeholder="Search marketplace..." className="pl-8 pr-3 py-2 text-sm rounded-xl border border-black/10 bg-white/90 w-[280px]" />
          </div>
          <button className="px-3 py-2 text-xs rounded-xl border border-black/10 bg-white flex items-center gap-1">
            <Filter className="h-4 w-4"/> Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredItems.map(item => (
            <button key={item.id} onClick={() => setSelectedItem(item)} className={`text-left rounded-xl border p-4 hover:border-emerald-300 ${selectedItem?.id === item.id ? "border-emerald-300 bg-emerald-50" : "border-black/10 bg-white/80"}`}>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center">
                  {item.type === "template" && <Layers className="h-6 w-6 text-slate-600"/>}
                  {item.type === "deck" && <Tag className="h-6 w-6 text-slate-600"/>}
                  {item.type === "exercise" && <Users className="h-6 w-6 text-slate-600"/>}
                  {item.type === "training" && <BookOpen className="h-6 w-6 text-slate-600"/>}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className="text-xs text-slate-600 mb-2">{item.author}</div>
                  <div className="text-xs text-slate-700 line-clamp-2">{item.description}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-xs">{item.rating}</span>
                      <span className="text-xs text-slate-500">({item.reviews})</span>
                    </div>
                    <div className="text-sm font-semibold text-emerald-600">
                      {item.price === 0 ? "Free" : `$${item.price}`}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>

      <aside className="hidden lg:block col-span-3 border-l border-black/5 bg-white/60 p-4">
        <div className="text-sm font-semibold mb-2">Item Details</div>
        {selectedItem ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-black/10 bg-white/80 p-3">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center mx-auto mb-3">
                {selectedItem.type === "template" && <Layers className="h-8 w-8 text-slate-600"/>}
                {selectedItem.type === "deck" && <Tag className="h-8 w-8 text-slate-600"/>}
                {selectedItem.type === "exercise" && <Users className="h-8 w-8 text-slate-600"/>}
              </div>
              <div className="text-center">
                <div className="font-medium">{selectedItem.title}</div>
                <div className="text-sm text-slate-600">{selectedItem.author}</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm">{selectedItem.rating}</span>
                  <span className="text-xs text-slate-500">({selectedItem.reviews} reviews)</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-700">{selectedItem.description}</div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm">
                  {selectedItem.price === 0 ? "Install Free" : `Buy $${selectedItem.price}`}
                </button>
                <button className="px-3 py-2 rounded-lg bg-slate-200 text-sm">Preview</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-500">Select an item to view details.</div>
        )}
      </aside>
    </div>
  );
}

/* ——— Settings Page ——— */
function SettingsBody(){
  const [activeTab, setActiveTab] = useState<"profile" | "integrations" | "billing" | "privacy">("profile");

  return (
    <div className="grid grid-cols-12 h-full">
      <aside className="hidden lg:block col-span-3 border-r border-black/5 bg-white/60 p-4 space-y-2">
        {(["profile", "integrations", "billing", "privacy"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left px-3 py-2 rounded-lg text-sm ${activeTab === tab ? "bg-emerald-600 text-white" : "hover:bg-white"}`}>
            {tab[0].toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </aside>

      <main className="col-span-12 lg:col-span-9 p-6 overflow-auto">
        {activeTab === "profile" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input className="w-full px-3 py-2 rounded-lg border border-black/10 bg-white" defaultValue="Sarah" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input className="w-full px-3 py-2 rounded-lg border border-black/10 bg-white" defaultValue="Chen" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input className="w-full px-3 py-2 rounded-lg border border-black/10 bg-white" defaultValue="sarah@example.com" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea className="w-full px-3 py-2 rounded-lg border border-black/10 bg-white min-h-[100px]" defaultValue="Certified coach specializing in leadership development and team dynamics." />
                </div>
              </div>
              <button className="mt-4 px-4 py-2 rounded-lg bg-emerald-600 text-white">Save Changes</button>
            </div>
          </div>
        )}

        {activeTab === "integrations" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-lg font-semibold mb-4">Integrations</h2>
              <div className="space-y-4">
                {[
                  { name: "Zoom", description: "Video conferencing integration", connected: true },
                  { name: "Google Calendar", description: "Sync your calendar", connected: true },
                  { name: "Slack", description: "Send session summaries", connected: false },
                  { name: "Microsoft Teams", description: "Video conferencing", connected: false },
                ].map(integration => (
                  <div key={integration.name} className="flex items-center justify-between p-4 rounded-lg border border-black/10 bg-white">
                    <div>
                      <div className="font-medium">{integration.name}</div>
                      <div className="text-sm text-slate-600">{integration.description}</div>
                    </div>
                    <button className={`px-3 py-1.5 rounded-lg text-sm ${integration.connected ? "bg-red-100 text-red-700" : "bg-emerald-600 text-white"}`}>
                      {integration.connected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "billing" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-lg font-semibold mb-4">Billing & Subscription</h2>
              <div className="rounded-lg border border-black/10 bg-white p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Pro Plan</div>
                    <div className="text-sm text-slate-600">$29/month • Renews Jan 15, 2024</div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-slate-200 text-sm">Manage</button>
                </div>
              </div>
              <div className="text-sm">
                <div className="font-medium mb-2">Usage This Month</div>
                <div className="space-y-1 text-slate-600">
                  <div>Sessions: 12 / 50</div>
                  <div>AI Credits: 245 / 1000</div>
                  <div>Storage: 2.3 GB / 10 GB</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-lg font-semibold mb-4">Privacy & Data</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-black/10 bg-white">
                  <div>
                    <div className="font-medium">Auto-transcription</div>
                    <div className="text-sm text-slate-600">Automatically transcribe sessions with consent</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-black/10 bg-white">
                  <div>
                    <div className="font-medium">Analytics sharing</div>
                    <div className="text-sm text-slate-600">Share anonymized data to improve AI models</div>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-black/10 bg-white">
                  <div>
                    <div className="font-medium">Marketing emails</div>
                    <div className="text-sm text-slate-600">Receive updates about new features</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Additional demo data for new pages
interface Client {
  id: string;
  name: string;
  role: string;
  organization: string;
  status: "active" | "archived" | "prospect";
  lastSession: string;
  sessions: { title: string; date: string; }[];
  notes: string;
  journalEntries: number;
  reflectionStreak: number;
  goalsCompleted: number;
  aiInsight: string;
  themes: string[];
}

const clients: Client[] = [
  {
    id: "c1",
    name: "Sarah Chen",
    role: "Engineering Manager",
    organization: "TechCorp Inc",
    status: "active",
    lastSession: "2 days ago",
    sessions: [
      { title: "Leadership Transition", date: "Jan 8" },
      { title: "Team Dynamics", date: "Dec 15" },
      { title: "Initial Coaching", date: "Nov 22" },
    ],
    notes: "Working on delegation skills and team communication. Shows strong technical background but needs confidence in leadership situations.",
    journalEntries: 23,
    reflectionStreak: 12,
    goalsCompleted: 5,
    aiInsight: "Sarah shows strong self-awareness and consistently chooses transition-themed cards. Her journal entries reveal growing confidence in leadership decisions.",
    themes: ["leadership", "transition", "courage", "delegation"]
  },
  {
    id: "c2", 
    name: "Marcus Johnson",
    role: "Product Manager",
    organization: "StartupXYZ",
    status: "active",
    lastSession: "1 week ago",
    sessions: [
      { title: "Product Strategy", date: "Jan 3" },
      { title: "Stakeholder Management", date: "Dec 20" },
    ],
    notes: "Excellent strategic thinking. Focus areas: difficult conversations and conflict resolution.",
    journalEntries: 18,
    reflectionStreak: 8,
    goalsCompleted: 6,
    aiInsight: "Marcus demonstrates excellent analytical skills but tends to avoid emotional topics. Recent entries show progress in vulnerability and authentic communication.",
    themes: ["strategy", "communication", "conflict", "authenticity"]
  },
  {
    id: "c3",
    name: "Emily Rodriguez", 
    role: "HR Director",
    organization: "Global Corp",
    status: "archived",
    lastSession: "3 months ago",
    sessions: [
      { title: "Feedback Culture", date: "Oct 15" },
      { title: "Change Management", date: "Sep 28" },
    ],
    notes: "Completed 6-month coaching program. Achieved goals around building psychological safety in HR processes.",
    journalEntries: 45,
    reflectionStreak: 30,
    goalsCompleted: 8,
    aiInsight: "Emily completed her program with exceptional engagement. Her transformation from directive to collaborative leadership style was remarkable.",
    themes: ["culture", "change", "safety", "collaboration"]
  },
];

interface MarketplaceItem {
  id: string;
  title: string;
  author: string;
  description: string;
  type: "template" | "deck" | "exercise" | "training";
  category: string;
  price: number;
  rating: number;
  reviews: number;
}

const marketplaceItems: MarketplaceItem[] = [
  {
    id: "m1",
    title: "Agile Retrospective Template",
    author: "Scrum Masters Guild",
    description: "Complete retrospective template with POY cards for What Went Well, What Could Improve, and Action Items. Includes breakout activities and closing reflections.",
    type: "template",
    category: "templates",
    price: 15,
    rating: 4.8,
    reviews: 127
  },
  {
    id: "m2",
    title: "Coaching Game Deck",
    author: "Efrat Shokef",
    description: "Official Points of You Coaching Game with 65 carefully selected photo cards. Perfect for coaching sessions, workshops, and personal development.",
    type: "deck", 
    category: "decks",
    price: 45,
    rating: 4.9,
    reviews: 1834
  },
  {
    id: "m3",
    title: "Icebreaker Collection",
    author: "POY Community",
    description: "20 engaging icebreaker exercises using POY methodology. Great for team building, workshops, and getting groups comfortable.",
    type: "exercise",
    category: "exercises", 
    price: 0,
    rating: 4.6,
    reviews: 89
  },
  {
    id: "m4",
    title: "Conflict Resolution Toolkit",
    author: "Mediation Institute",
    description: "Structured approach to resolving workplace conflicts using visual metaphors and guided conversations. Includes de-escalation techniques.",
    type: "template",
    category: "templates",
    price: 25,
    rating: 4.7,
    reviews: 56
  },
  {
    id: "m5",
    title: "Leadership Development Program",
    author: "Executive Coach Pro",
    description: "8-week leadership program with weekly sessions, homework assignments, and progress tracking. Covers emotional intelligence, decision-making, and team management.",
    type: "template",
    category: "templates", 
    price: 99,
    rating: 4.9,
    reviews: 234
  },
  {
    id: "m6",
    title: "Team Building Workshop Kit",
    author: "Team Dynamics Co",
    description: "Complete 4-hour team building workshop with POY cards, activities, and facilitation guide. Perfect for improving team communication and collaboration.",
    type: "template",
    category: "templates",
    price: 35,
    rating: 4.5,
    reviews: 78
  },
  {
    id: "m7",
    title: "Emotional Intelligence Deck",
    author: "EQ Institute",
    description: "Specialized deck of 40 cards focused on emotional awareness, regulation, and social skills. Includes reflection prompts and exercises.",
    type: "deck",
    category: "decks",
    price: 28,
    rating: 4.7,
    reviews: 156
  },
  {
    id: "m8",
    title: "Values Clarification Exercise",
    author: "Personal Growth Hub",
    description: "Guided exercise to help individuals identify and prioritize their core values using visual metaphors and structured reflection.",
    type: "exercise",
    category: "exercises",
    price: 0,
    rating: 4.4,
    reviews: 92
  },
  {
    id: "m9",
    title: "One-on-One Coaching Template",
    author: "Coaching Masters",
    description: "Structured template for individual coaching sessions with POY methodology. Includes session planning, progress tracking, and follow-up activities.",
    type: "template",
    category: "templates",
    price: 20,
    rating: 4.6,
    reviews: 143
  },
  {
    id: "m10",
    title: "Creativity & Innovation Deck",
    author: "Innovation Lab",
    description: "50 cards designed to spark creative thinking and innovative solutions. Perfect for brainstorming sessions and creative workshops.",
    type: "deck",
    category: "decks",
    price: 32,
    rating: 4.8,
    reviews: 201
  },
  {
    id: "m11",
    title: "Stress Management Workshop",
    author: "Wellness Center",
    description: "2-hour workshop focusing on stress identification, coping strategies, and resilience building using POY visual tools.",
    type: "template",
    category: "templates",
    price: 18,
    rating: 4.3,
    reviews: 67
  },
  {
    id: "m12",
    title: "Communication Skills Exercise",
    author: "Communication Experts",
    description: "Interactive exercise to improve active listening, empathy, and clear communication using visual storytelling techniques.",
    type: "exercise",
    category: "exercises",
    price: 0,
    rating: 4.5,
    reviews: 115
  },
  {
    id: "m13",
    title: "Career Transition Deck",
    author: "Career Coaches United",
    description: "Specialized deck for career changers and job seekers. Helps explore new possibilities, overcome fears, and plan next steps.",
    type: "deck",
    category: "decks",
    price: 25,
    rating: 4.6,
    reviews: 89
  },
  {
    id: "m14",
    title: "Feedback & Performance Review Template",
    author: "HR Professionals",
    description: "Comprehensive template for conducting meaningful performance reviews using POY methodology. Includes preparation, conversation, and follow-up phases.",
    type: "template",
    category: "templates",
    price: 22,
    rating: 4.4,
    reviews: 134
  },
  {
    id: "m15",
    title: "Mindfulness & Reflection Exercise",
    author: "Mindful Living",
    description: "Guided mindfulness exercise using POY cards to promote self-awareness, emotional regulation, and present-moment awareness.",
    type: "exercise",
    category: "exercises",
    price: 0,
    rating: 4.7,
    reviews: 203
  },
  {
    id: "m16",
    title: "Relationship Building Deck",
    author: "Relationship Coaches",
    description: "40 cards focused on building stronger personal and professional relationships. Covers trust, communication, and conflict resolution.",
    type: "deck",
    category: "decks",
    price: 30,
    rating: 4.5,
    reviews: 167
  },
  {
    id: "m17",
    title: "Goal Setting & Achievement Template",
    author: "Success Coaches",
    description: "Step-by-step template for setting meaningful goals, creating action plans, and tracking progress using visual motivation techniques.",
    type: "template",
    category: "templates",
    price: 16,
    rating: 4.6,
    reviews: 98
  },
  {
    id: "m18",
    title: "Cultural Diversity Exercise",
    author: "Diversity & Inclusion Experts",
    description: "Sensitive exercise to explore cultural differences, biases, and inclusion using POY visual metaphors and guided discussions.",
    type: "exercise",
    category: "exercises",
    price: 0,
    rating: 4.8,
    reviews: 145
  },
  {
    id: "m19",
    title: "Decision Making Deck",
    author: "Strategic Thinking Co",
    description: "35 cards to help with complex decision-making processes. Covers risk assessment, stakeholder analysis, and outcome evaluation.",
    type: "deck",
    category: "decks",
    price: 26,
    rating: 4.4,
    reviews: 112
  },
  {
    id: "m20",
    title: "Change Management Workshop",
    author: "Change Consultants",
    description: "Full-day workshop for managing organizational change using POY methodology. Includes resistance management and communication strategies.",
    type: "template",
    category: "templates",
    price: 45,
    rating: 4.7,
    reviews: 76
  },
  {
    id: "m21",
    title: "Self-Discovery Journey Exercise",
    author: "Personal Development Co",
    description: "Deep self-exploration exercise using POY cards to uncover personal strengths, values, and life purpose through visual storytelling.",
    type: "exercise",
    category: "exercises",
    price: 0,
    rating: 4.9,
    reviews: 189
  },
  {
    id: "m22",
    title: "Problem-Solving Deck",
    author: "Innovation Solutions",
    description: "50 cards designed to approach problems from multiple angles. Includes creative problem-solving techniques and solution evaluation methods.",
    type: "deck",
    category: "decks",
    price: 34,
    rating: 4.5,
    reviews: 156
  },
  {
    id: "m23",
    title: "Mentoring Program Template",
    author: "Mentorship Institute",
    description: "Complete mentoring program structure with POY integration. Includes mentor matching, session planning, and relationship development activities.",
    type: "template",
    category: "templates",
    price: 28,
    rating: 4.6,
    reviews: 87
  },
  {
    id: "m24",
    title: "Work-Life Balance Exercise",
    author: "Wellness Warriors",
    description: "Reflective exercise to assess and improve work-life balance using POY visual tools. Includes boundary setting and priority clarification.",
    type: "exercise",
    category: "exercises",
    price: 0,
    rating: 4.4,
    reviews: 124
  },
  {
    id: "m25",
    title: "Future Planning Deck",
    author: "Strategic Vision Co",
    description: "40 cards for long-term planning and vision setting. Helps individuals and teams create compelling futures and action plans.",
    type: "deck",
    category: "decks",
    price: 29,
    rating: 4.7,
    reviews: 178
  },
  {
    id: "m26",
    title: "POY Facilitator Certification",
    author: "Points of You Academy",
    description: "Complete 3-day certification program to become a certified POY facilitator. Includes methodology, practice sessions, and official certification.",
    type: "training",
    category: "certifications",
    price: 899,
    rating: 4.9,
    reviews: 156
  },
  {
    id: "m27",
    title: "Advanced Coaching Techniques",
    author: "International Coaching Federation",
    description: "2-day intensive training on advanced POY coaching methods. Covers deep listening, powerful questioning, and transformation techniques.",
    type: "training",
    category: "coaching",
    price: 450,
    rating: 4.8,
    reviews: 89
  },
  {
    id: "m28",
    title: "Team Dynamics Masterclass",
    author: "Team Building Institute",
    description: "Comprehensive 5-day training program on using POY methodology for team development, conflict resolution, and group facilitation.",
    type: "training",
    category: "team-building",
    price: 650,
    rating: 4.7,
    reviews: 67
  },
  {
    id: "m29",
    title: "Digital Facilitation Workshop",
    author: "Virtual Facilitation Co",
    description: "2-day workshop on adapting POY methodology for online sessions. Covers virtual tools, engagement techniques, and digital card sharing.",
    type: "training",
    category: "digital",
    price: 320,
    rating: 4.6,
    reviews: 134
  },
  {
    id: "m30",
    title: "Leadership Development Intensive",
    author: "Executive Leadership Institute",
    description: "4-day intensive program for senior leaders using POY cards for strategic thinking, decision-making, and organizational transformation.",
    type: "training",
    category: "leadership",
    price: 1200,
    rating: 4.9,
    reviews: 45
  },
  {
    id: "m31",
    title: "Train the Trainer Program",
    author: "POY Master Trainers",
    description: "5-day program to train internal facilitators and HR professionals to deliver POY workshops within their organizations.",
    type: "training",
    category: "trainer-development",
    price: 750,
    rating: 4.8,
    reviews: 78
  },
  {
    id: "m32",
    title: "Therapeutic Applications Training",
    author: "Psychology & Therapy Institute",
    description: "3-day specialized training for therapists and counselors on using POY cards in therapeutic settings and mental health support.",
    type: "training",
    category: "therapy",
    price: 580,
    rating: 4.7,
    reviews: 92
  },
  {
    id: "m33",
    title: "Youth & Education Workshop",
    author: "Educational Innovation Lab",
    description: "2-day training for teachers and youth workers on adapting POY methodology for educational settings and student development.",
    type: "training",
    category: "education",
    price: 280,
    rating: 4.5,
    reviews: 156
  },
  {
    id: "m34",
    title: "Corporate Culture Transformation",
    author: "Organizational Development Co",
    description: "3-day intensive for OD professionals on using POY cards for culture change, employee engagement, and organizational alignment.",
    type: "training",
    category: "organizational",
    price: 850,
    rating: 4.8,
    reviews: 34
  },
  {
    id: "m35",
    title: "Online POY Masterclass",
    author: "POY Global Academy",
    description: "Self-paced online course covering POY fundamentals, methodology, and practical applications. Includes video lessons and assignments.",
    type: "training",
    category: "online",
    price: 199,
    rating: 4.6,
    reviews: 267
  },
  {
    id: "m36",
    title: "Advanced Facilitation Skills",
    author: "Facilitation Masters",
    description: "2-day advanced training for experienced facilitators on complex group dynamics, challenging participants, and deep transformation work.",
    type: "training",
    category: "advanced",
    price: 420,
    rating: 4.9,
    reviews: 56
  },
  {
    id: "m37",
    title: "POY for Healthcare Professionals",
    author: "Healthcare Communication Institute",
    description: "Specialized 2-day training for healthcare workers on using POY cards for patient communication, team building, and stress management.",
    type: "training",
    category: "healthcare",
    price: 380,
    rating: 4.7,
    reviews: 73
  },
  {
    id: "m38",
    title: "Creative Industries Workshop",
    author: "Creative Facilitation Co",
    description: "2-day workshop for creative professionals on using POY cards for inspiration, creative problem-solving, and artistic collaboration.",
    type: "training",
    category: "creative",
    price: 350,
    rating: 4.6,
    reviews: 98
  },
  {
    id: "m39",
    title: "POY Research & Development",
    author: "POY Research Institute",
    description: "3-day intensive for researchers and academics on POY methodology, its psychological foundations, and research applications.",
    type: "training",
    category: "research",
    price: 600,
    rating: 4.8,
    reviews: 29
  },
  {
    id: "m40",
    title: "International Facilitator Exchange",
    author: "Global POY Network",
    description: "5-day international program bringing together facilitators from around the world to share experiences and advanced techniques.",
    type: "training",
    category: "international",
    price: 1500,
    rating: 4.9,
    reviews: 18
  },
];

// Participant Cards data
interface LegacyCard {
  id: string;
  title: string;
  description: string;
  gradient: string;
}

interface ParticipantCard {
  id: string;
  name: string;
  status: "selecting" | "reflecting" | "completed";
  selectedCard: CardType | null;
  reflection: string;
}

const participantCards: ParticipantCard[] = [
  {
    id: "pc1",
    name: "Dana Kim",
    status: "completed",
    selectedCard: getCardById("leadership") || null,
    reflection: "This card represents the leadership challenge I'm facing. I need to take it one step at a time and guide others with confidence."
  },
  {
    id: "pc2", 
    name: "Ido Chen",
    status: "completed",
    selectedCard: getCardById("choice") || null,
    reflection: "The choice card symbolizes my career transition. I'm at a crossroads between where I was and where I want to be."
  },
  {
    id: "pc3",
    name: "Leah Miller",
    status: "completed", 
    selectedCard: getCardById("everything_is_possible") || null,
    reflection: "Everything is possible - this card reminds me that every sunrise is a new chance to start fresh. I choose to see opportunities instead of obstacles."
  },
  {
    id: "pc4",
    name: "Noa Wilson",
    status: "reflecting",
    selectedCard: getCardById("balance") || null,
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
    selectedCard: getCardById("just_be") || null,
    reflection: "Just be - like flowing water, I need to learn to be present and flow with change instead of fighting against it."
  }
];
