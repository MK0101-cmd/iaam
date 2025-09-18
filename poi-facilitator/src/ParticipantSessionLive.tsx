import { useState } from "react";
import {
  Mic, Video, MessageSquare, Hand, Camera, Settings, ArrowLeft,
  Send, Clock, Bot, Maximize2, Minimize2
} from "lucide-react";

/*
  Live Participant Session Experience
  Shows what participants see during an active POY session
  Features: Video tiles, card interactions, chat, reflection tools
*/

export default function ParticipantSessionLive() {
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [selectedCard, setSelectedCard] = useState<string | null>("card2");
  const [reflection, setReflection] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  function getAvatarUrl(name: string, size: number = 160): string {
    const femaleNames = new Set(["Dana", "Leah"]);
    const maleNames = new Set(["Ido"]);
    const gender = femaleNames.has(name) ? "women" : maleNames.has(name) ? "men" : null;
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = ((hash << 5) - hash) + name.charCodeAt(i);
    const idx = Math.abs(hash) % 100;
    if (gender) return `https://randomuser.me/api/portraits/${gender}/${idx}.jpg`;
    return `https://i.pravatar.cc/${size}?u=${encodeURIComponent(name)}`;
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 text-slate-900 flex flex-col">
      {/* Header */}
      <header className="px-4 py-3 border-b border-black/5 bg-white/80 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { location.hash = "#participant/sessions"; }}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Sessions</span>
          </button>
          <div className="h-4 w-px bg-slate-300" />
          <div>
            <div className="font-semibold text-sm">Crossing Inner Bridges</div>
            <div className="text-xs text-slate-600">Live Session • Step 1 of 4</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            LIVE
          </div>
          <div className="text-xs bg-slate-100 px-2 py-1 rounded-full">
            <Clock className="h-3 w-3 inline mr-1" />
            12:34
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        {/* Video Area */}
        <section className="col-span-8 p-3 flex flex-col gap-3 overflow-hidden">
          {/* Main Video/Studio View */}
          <div className="relative rounded-xl bg-black overflow-hidden flex-shrink-0" style={{height: '200px'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-xl font-bold mx-auto mb-2">
                  MJ
                </div>
                <div className="text-base font-semibold">Marcus Johnson</div>
                <div className="text-xs opacity-75">Studio</div>
              </div>
            </div>
            
            {/* Studio controls overlay */}
            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              Speaking
            </div>
            
            {/* Session info overlay */}
            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              <div className="font-medium">Current Phase: Pause</div>
              <div className="opacity-75">Share how you're feeling in one word</div>
            </div>

            {/* Fullscreen toggle */}
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded hover:bg-black/70"
            >
              {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Participant Video Tiles */}
          <div className="grid grid-cols-3 gap-2 flex-shrink-0" style={{height: '100px'}}>
            {participantTiles.map((participant) => (
              <div key={participant.name} className="relative rounded-lg overflow-hidden">
                <img 
                  src={getAvatarUrl(participant.name, 160)}
                  alt={participant.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute bottom-1 left-1 text-[10px] text-white/90 bg-black/40 rounded px-1 py-0.5">
                  {participant.name}
                </div>
                {participant.speaking && (
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                )}
                {!participant.videoOn && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                    <Video className="h-4 w-4 text-white/50" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Participant Cards Display */}
          <div className="flex-1 min-h-0 overflow-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-white">Group Cards</h3>
              <div className="text-xs text-white/70">{participantSessionCards.length} participants</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {participantSessionCards.map(participant => (
                <ParticipantSessionCard key={participant.id} participant={participant} />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-2 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-black/5 flex-shrink-0">
            <button 
              onClick={() => setMicOn(!micOn)}
              className={`p-2 rounded-full ${micOn ? "bg-green-600 text-white" : "bg-slate-200 text-slate-600"}`}
            >
              <Mic className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setVideoOn(!videoOn)}
              className={`p-2 rounded-full ${videoOn ? "bg-green-600 text-white" : "bg-slate-200 text-slate-600"}`}
            >
              <Video className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-full bg-slate-200 text-slate-600">
              <Camera className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setHandRaised(!handRaised)}
              className={`p-2 rounded-full ${handRaised ? "bg-yellow-500 text-white" : "bg-slate-200 text-slate-600"}`}
            >
              <Hand className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-full bg-slate-200 text-slate-600">
              <Settings className="h-4 w-4" />
            </button>
            <button className="px-3 py-2 rounded-full bg-red-600 text-white font-medium text-xs">
              Leave Session
            </button>
          </div>
        </section>

        {/* Right Panel */}
        <aside className="col-span-4 border-l border-black/5 bg-white/60 backdrop-blur-sm flex flex-col overflow-hidden">
          {/* Activity Panel */}
          <div className="p-3 border-b border-black/5 flex-shrink-0">
            <div className="text-sm font-semibold mb-2">Your Cards</div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {sessionCards.map(card => (
                <button
                  key={card.id}
                  onClick={() => setSelectedCard(card.id)}
                  className={`aspect-square rounded-lg border-2 overflow-hidden ${
                    selectedCard === card.id ? "border-blue-500" : "border-slate-200"
                  }`}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white font-medium text-[10px] text-center p-1`}>
                    {card.title}
                  </div>
                </button>
              ))}
            </div>
            
            {selectedCard && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-3">
                <div className="text-[10px] font-medium text-blue-800 mb-1">Selected Card</div>
                <div className="text-[10px] text-blue-700">
                  {sessionCards.find(c => c.id === selectedCard)?.description}
                </div>
              </div>
            )}

            <div className="text-xs font-medium mb-2">Your Reflection</div>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Write one sentence that connects your card to your current transition..."
              className="w-full h-16 rounded-lg border border-black/10 p-2 text-[10px] bg-white/90 resize-none"
            />
            
            <div className="flex items-center gap-2 mt-2">
              <button className="flex-1 px-2 py-1.5 rounded-lg bg-blue-600 text-white text-[10px]">
                Share with Group
              </button>
              <button className="px-2 py-1.5 rounded-lg bg-slate-200 text-[10px]">
                Save Private
              </button>
            </div>
          </div>

          {/* AI Coach */}
          <div className="p-3 border-b border-black/5 flex-shrink-0">
            <div className="text-xs font-semibold mb-2 flex items-center gap-2">
              <Bot className="h-3 w-3 text-blue-600" />
              POY AI Coach
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-2">
              <div className="text-[10px] font-medium text-yellow-800 mb-1">💡 Live Insight</div>
              <div className="text-[10px] text-yellow-700">
                You often choose bridge or path cards. This suggests you're in a transition phase and seeking direction.
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="p-3 border-b border-black/5 flex-shrink-0">
              <div className="text-xs font-semibold flex items-center gap-2">
                <MessageSquare className="h-3 w-3" />
                Group Chat
              </div>
            </div>
            
            <div className="flex-1 p-3 overflow-auto space-y-2 min-h-0">
              {chatMessages.map(message => (
                <div key={message.id} className="text-[10px]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-slate-700">{message.sender}</span>
                    <span className="text-slate-500">{message.time}</span>
                  </div>
                  <div className="text-slate-600 bg-slate-100 rounded-lg px-2 py-1">
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-black/5 flex-shrink-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-2 py-1.5 rounded-lg border border-black/10 text-[10px] bg-white/90"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && chatMessage.trim()) {
                      // Handle send message
                      setChatMessage("");
                    }
                  }}
                />
                <button 
                  disabled={!chatMessage.trim()}
                  className="p-1.5 rounded-lg bg-blue-600 text-white disabled:bg-slate-300"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ParticipantSessionCard({ participant }: { participant: any }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-semibold">
          {participant.name.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div className="text-xs text-white font-medium">{participant.name}</div>
        <div className={`ml-auto w-2 h-2 rounded-full ${
          participant.status === "completed" ? "bg-green-400" :
          participant.status === "reflecting" ? "bg-yellow-400" : 
          "bg-slate-400"
        }`} />
      </div>
      
      {participant.selectedCard ? (
        <div className={`aspect-[4/3] rounded-lg bg-gradient-to-br ${participant.selectedCard.gradient} flex items-center justify-center text-white font-medium text-xs shadow-sm`}>
          {participant.selectedCard.title}
        </div>
      ) : (
        <div className="aspect-[4/3] rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center text-white/60 text-xs">
          {participant.status === "selecting" ? "Choosing..." : "No card"}
        </div>
      )}
    </div>
  );
}

/* ——— Demo Data ——— */
const participantTiles = [
  { name: "Sarah Chen", speaking: true, videoOn: true },
  { name: "David Kim", speaking: false, videoOn: true },
  { name: "Maria Lopez", speaking: false, videoOn: false },
  { name: "Alex Johnson", speaking: false, videoOn: true },
  { name: "Emma Wilson", speaking: false, videoOn: true },
  { name: "You", speaking: false, videoOn: true }
];

const participantSessionCards = [
  {
    id: "psc1",
    name: "Sarah Chen",
    selectedCard: {
      id: "card1",
      title: "Mountain Peak",
      gradient: "from-purple-500 to-pink-600"
    },
    status: "completed"
  },
  {
    id: "psc2",
    name: "David Kim", 
    selectedCard: {
      id: "card2",
      title: "Bridge",
      gradient: "from-blue-500 to-indigo-600"
    },
    status: "completed"
  },
  {
    id: "psc3",
    name: "Maria Lopez",
    selectedCard: {
      id: "card3", 
      title: "Sunrise",
      gradient: "from-yellow-500 to-orange-600"
    },
    status: "reflecting"
  },
  {
    id: "psc4",
    name: "Alex Johnson",
    selectedCard: {
      id: "card4",
      title: "Tree Roots", 
      gradient: "from-green-500 to-emerald-600"
    },
    status: "completed"
  },
  {
    id: "psc5",
    name: "Emma Wilson",
    selectedCard: null,
    status: "selecting"
  }
];

const sessionCards = [
  {
    id: "card1",
    title: "Mountain Peak",
    description: "Reaching new heights, overcoming challenges, achievement",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    id: "card2", 
    title: "Bridge",
    description: "Transition, connection, crossing from one state to another",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: "card3",
    title: "Sunrise",
    description: "New beginnings, hope, fresh start, awakening",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    id: "card4",
    title: "Tree Roots",
    description: "Foundation, grounding, stability, growth from within",
    gradient: "from-green-500 to-emerald-600"
  }
];

const chatMessages = [
  {
    id: "m1",
    sender: "Marcus (Studio)",
    content: "Great insights everyone! Take 2 more minutes to finish your reflections.",
    time: "12:32"
  },
  {
    id: "m2",
    sender: "David",
    content: "This bridge card really speaks to me about my career transition.",
    time: "12:33"
  },
  {
    id: "m3",
    sender: "Maria",
    content: "Same here! I chose the mountain - feeling like I'm climbing toward something new.",
    time: "12:34"
  },
  {
    id: "m4",
    sender: "POY AI Coach",
    content: "💡 I notice many of you are choosing transition-themed cards. This suggests the group is in a growth phase together.",
    time: "12:34"
  }
];
