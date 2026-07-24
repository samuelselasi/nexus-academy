import React, { useState, useEffect } from 'react';
import { Session } from '../types';
import { soundEngine } from '../utils/audioEffects';
import { CollaborativeWhiteboard } from './CollaborativeWhiteboard';
import { Video, Mic, MicOff, VideoOff, MessageSquare, PhoneOff, Users, Share2, ShieldCheck, Sparkles, Send, Layout, Edit3 } from 'lucide-react';

interface GoogleMeetModalProps {
  session: Session;
  onClose: () => void;
}

export const GoogleMeetModal: React.FC<GoogleMeetModalProps> = ({ session, onClose }) => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [viewMode, setViewMode] = useState<'video' | 'whiteboard'>('video');

  useEffect(() => {
    soundEngine.playJoinMeetChime();
  }, []);
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: session.tutorName, text: 'Akwaaba! Welcome to today\'s session. Let\'s get started.', time: '14:30' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages([...messages, {
      sender: 'Kofi Kwakye (Student)',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setChatInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col justify-between p-4 md:p-6 text-white font-sans overflow-y-auto">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Google Meet Virtual Classroom</span>
          </div>
          <h2 className="text-base font-bold text-white hidden sm:block">
            {session.subject}: {session.topic}
          </h2>
        </div>

        {/* View mode toggle button */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => {
                soundEngine.playWhiteboardSound();
                setViewMode('video');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'video' ? 'bg-amber-500 text-slate-950 shadow-2xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Video Grid</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playWhiteboardSound();
                setViewMode('whiteboard');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'whiteboard' ? 'bg-amber-500 text-slate-950 shadow-2xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Collaborative Whiteboard</span>
            </button>
          </div>

          <span className="text-xs bg-slate-800 text-amber-300 font-mono px-3 py-1 rounded-lg border border-slate-700 hidden lg:block">
            Curriculum: {session.curriculum}
          </span>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition shrink-0"
          >
            Leave Class
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'whiteboard' ? (
        <div className="my-4">
          <CollaborativeWhiteboard tutorName={session.tutorName} />
        </div>
      ) : (
        /* Main Video Grid */
        <div className="flex-1 my-4 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden min-h-0">
          
          {/* Tutor Video Stream (2 cols) */}
          <div className="md:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center group shadow-2xl min-h-[320px]">
            <img
              src={session.tutorAvatar}
              alt={session.tutorName}
              className="absolute inset-0 w-full h-full object-cover opacity-60 filter blur-sm scale-105"
            />
            <div className="relative z-10 text-center space-y-3 p-6 bg-slate-950/70 backdrop-blur-md rounded-2xl border border-slate-700/60 max-w-md">
              <img
                src={session.tutorAvatar}
                alt={session.tutorName}
                className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-emerald-500 shadow-xl"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{session.tutorName}</h3>
                <p className="text-xs text-amber-300 font-mono font-bold">
                  Certified {session.curriculum} Master Educator
                </p>
              </div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" /> Presenting Screen: Calculus Differential Equations
              </div>
            </div>

            <div className="absolute bottom-4 left-4 bg-slate-950/80 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-200 border border-slate-800 backdrop-blur-sm">
              {session.tutorName} (Host)
            </div>
          </div>

          {/* Student Tile & In-Class Live Chat */}
          <div className="flex flex-col gap-4 overflow-hidden">
            
            {/* Student Video Tile */}
            <div className="h-40 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center shrink-0">
              {videoOn ? (
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-slate-500 text-xs flex flex-col items-center gap-1">
                  <VideoOff className="w-6 h-6 text-slate-600" />
                  <span>Camera Off</span>
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-slate-950/80 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-200 border border-slate-800">
                Kofi Kwakye (You)
              </div>
            </div>

            {/* In-Class Chat */}
            <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col overflow-hidden min-h-[220px]">
              <div className="text-xs font-bold text-slate-300 border-b border-slate-800 pb-2 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" /> In-Call Messages
                </span>
                <span className="text-[10px] text-slate-500">Google Meet Encrypted</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
                {messages.map((m, i) => (
                  <div key={i} className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/50 space-y-0.5">
                    <div className="flex justify-between text-[10px] font-bold text-amber-300">
                      <span>{m.sender}</span>
                      <span className="text-slate-500">{m.time}</span>
                    </div>
                    <p className="text-slate-200 text-xs">{m.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className="pt-2 flex gap-1.5">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Send message to tutor..."
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition"
                >
                  <Send className="w-3.5 h-3.5 font-bold" />
                </button>
              </form>
            </div>

          </div>

        </div>
      )}

      {/* Bottom Controls Bar */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-center gap-4">
        <button
          onClick={() => setMicOn(!micOn)}
          className={`p-3 rounded-full transition ${
            micOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-600 text-white hover:bg-red-500'
          }`}
          title={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
        >
          {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setVideoOn(!videoOn)}
          className={`p-3 rounded-full transition ${
            videoOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-600 text-white hover:bg-red-500'
          }`}
          title={videoOn ? 'Turn Off Camera' : 'Turn On Camera'}
        >
          {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        <button
          onClick={onClose}
          className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full font-bold text-xs flex items-center gap-2 shadow-lg transition"
        >
          <PhoneOff className="w-4 h-4" />
          <span>End Call</span>
        </button>
      </div>

    </div>
  );
};

