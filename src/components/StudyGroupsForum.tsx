import React, { useState } from 'react';
import { StudyGroup, StudyGroupThread } from '../types';
import { mockStudyGroups } from '../data/mockData';
import { KenteWatermark } from './KentePattern';
import { soundEngine } from '../utils/audioEffects';
import { Users, MessageSquare, ThumbsUp, Send, Sparkles, Plus, Search, Tag, BookOpen, ShieldCheck } from 'lucide-react';

export const StudyGroupsForum: React.FC = () => {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>(mockStudyGroups);
  const [activeGroup, setActiveGroup] = useState<StudyGroup>(mockStudyGroups[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  // New Thread Form State
  const [showNewThreadModal, setShowNewThreadModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newTag, setNewTag] = useState<string>('Calculus');

  // Interactive Upvote Handler
  const handleUpvote = (threadId: string) => {
    soundEngine.playUssdKeyClick();
    setActiveGroup(prevGroup => ({
      ...prevGroup,
      activeThreads: prevGroup.activeThreads.map(th =>
        th.id === threadId ? { ...th, upvotes: th.upvotes + 1 } : th
      )
    }));
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    soundEngine.playPaymentSuccessChime();
    const createdThread: StudyGroupThread = {
      id: 'th_' + Date.now(),
      authorName: 'Kofi Kwakye',
      authorRole: 'Student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      timestamp: 'Just now',
      title: newTitle,
      content: newContent,
      upvotes: 1,
      repliesCount: 0,
      tags: [newTag, activeGroup.curriculum]
    };

    setActiveGroup(prevGroup => ({
      ...prevGroup,
      activeThreads: [createdThread, ...prevGroup.activeThreads]
    }));

    setNewTitle('');
    setNewContent('');
    setShowNewThreadModal(false);
  };

  return (
    <div className="space-y-6 pb-12 text-slate-900 bg-white">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3 relative overflow-hidden">
        <KenteWatermark opacity={0.03} />
        <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider relative z-10">
          <Users className="w-4 h-4 text-amber-700" />
          Peer-to-Peer Academic Communities
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Student Study Groups & Past Paper Discussion Forums
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Collaborate with fellow Ghanaian & international scholars, share past paper proofs, and get verified solutions from tutors.
            </p>
          </div>

          <button
            onClick={() => {
              soundEngine.playWhiteboardSound();
              setShowNewThreadModal(true);
            }}
            className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs transition shadow-2xs shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Post Past Paper Question</span>
          </button>
        </div>
      </div>

      {/* Group Switcher Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-700 shrink-0">Study Room:</span>
        {studyGroups.map(group => (
          <button
            key={group.id}
            onClick={() => {
              soundEngine.playWhiteboardSound();
              setActiveGroup(group);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition shrink-0 ${
              activeGroup.id === group.id
                ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
                : 'bg-stone-50 text-slate-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{group.name}</span>
            <span className="bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded-full font-mono">
              {group.membersCount} members
            </span>
          </button>
        ))}
      </div>

      {/* Active Group Description */}
      <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl flex items-center justify-between text-xs">
        <div>
          <span className="font-bold text-slate-900">{activeGroup.name}</span>
          <p className="text-slate-600 text-[11px] font-medium mt-0.5">{activeGroup.description}</p>
        </div>
        <span className="bg-emerald-100 text-emerald-900 font-extrabold px-3 py-1 rounded-xl text-[11px] shrink-0 border border-emerald-300">
          Official Community
        </span>
      </div>

      {/* Discussion Threads List */}
      <div className="space-y-4">
        <h3 className="text-xs font-extrabold uppercase text-slate-800 tracking-wider">
          Active Peer Discussion Threads ({activeGroup.activeThreads.length})
        </h3>

        <div className="space-y-4">
          {activeGroup.activeThreads.map(thread => (
            <div key={thread.id} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-2xs space-y-3 relative overflow-hidden">
              <KenteWatermark opacity={0.015} />

              <div className="flex items-start justify-between gap-3 relative z-10">
                <div className="flex items-center gap-3">
                  <img src={thread.avatar} alt={thread.authorName} className="w-10 h-10 rounded-xl object-cover ring-1 ring-amber-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{thread.authorName}</h4>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        thread.authorRole === 'Certified Tutor'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-stone-100 text-slate-700'
                      }`}>
                        {thread.authorRole}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">{thread.timestamp}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {thread.tags.map((tag, idx) => (
                    <span key={idx} className="bg-stone-100 text-slate-700 font-bold text-[10px] px-2 py-0.5 rounded-lg border border-stone-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1 relative z-10">
                <h4 className="text-sm font-bold text-slate-900">{thread.title}</h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium bg-stone-50 p-3 rounded-xl border border-stone-200">
                  {thread.content}
                </p>
              </div>

              {thread.attachedPaperRef && (
                <div className="text-[11px] font-mono text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200 inline-block font-bold">
                  Attached Reference: {thread.attachedPaperRef}
                </div>
              )}

              {/* Thread Action Footer */}
              <div className="flex items-center justify-between border-t border-stone-200 pt-3 relative z-10">
                <button
                  onClick={() => handleUpvote(thread.id)}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-amber-800 transition bg-stone-100 hover:bg-amber-50 px-3 py-1.5 rounded-xl border border-stone-200"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-amber-700" />
                  <span>Upvote ({thread.upvotes})</span>
                </button>

                <button
                  onClick={() => alert(`Opening peer commentary thread for "${thread.title}"...`)}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Solutions ({thread.repliesCount})</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* New Thread Modal */}
      {showNewThreadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <form onSubmit={handleCreateThread} className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <h3 className="text-sm font-extrabold uppercase text-slate-900">
                Ask Study Group / Post Past Question
              </h3>
              <button
                type="button"
                onClick={() => setShowNewThreadModal(false)}
                className="text-stone-400 hover:text-stone-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Question Title / Topic:</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. WASSCE 2023 Elective Math Question 5 Proof"
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold outline-none focus:border-amber-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Question Detail / Proof Query:</label>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
                placeholder="Describe where you got stuck or paste the problem text..."
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs outline-none focus:border-amber-600 font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Topic Tag:</label>
              <select
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold outline-none"
              >
                <option value="Calculus">Calculus</option>
                <option value="Trigonometry">Trigonometry</option>
                <option value="Stoichiometry">Stoichiometry</option>
                <option value="Physics">Physics</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-extrabold rounded-xl text-xs transition shadow-2xs flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>Publish to {activeGroup.name}</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
