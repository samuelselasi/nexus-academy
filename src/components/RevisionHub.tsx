import React, { useState } from 'react';
import { CurriculumType, PastPaperResource } from '../types';
import { mockPastPapers } from '../data/mockData';
import { KenteWatermark } from './KentePattern';
import { BookOpen, CheckCircle, FileText, Download, HelpCircle, Sparkles, ChevronRight, RefreshCw, Trophy } from 'lucide-react';
import { soundEngine } from '../utils/audioEffects';

interface RevisionHubProps {
  currency: 'GHS' | 'USD';
}

export const RevisionHub: React.FC<RevisionHubProps> = () => {
  const [selectedCurriculum, setSelectedCurriculum] = useState<CurriculumType | 'ALL'>('ALL');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [activePaper, setActivePaper] = useState<PastPaperResource>(mockPastPapers[0]);
  
  // Interactive Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showSolutions, setShowSolutions] = useState<Record<string, boolean>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const filteredPapers = mockPastPapers.filter(paper => {
    if (selectedCurriculum !== 'ALL' && paper.curriculum !== selectedCurriculum) return false;
    if (selectedSubject !== 'ALL' && paper.subject !== selectedSubject) return false;
    return true;
  });

  const handleToggleSolution = (questionId: string) => {
    soundEngine.playWhiteboardSound();
    setShowSolutions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    soundEngine.playUssdKeyClick();
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleCalculateScore = () => {
    soundEngine.playPaymentSuccessChime();
    let score = 0;
    activePaper.questions.forEach(q => {
      if (q.correctOptionIndex !== undefined && quizAnswers[q.id] === q.correctOptionIndex) {
        score += 1;
      }
    });
    setQuizScore(score);
  };

  return (
    <div className="space-y-6 pb-12 text-slate-900 bg-white">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3 relative overflow-hidden">
        <KenteWatermark opacity={0.03} />
        <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider relative z-10">
          <BookOpen className="w-4 h-4 text-amber-700" /> Academic Resource & Revision Hub
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 relative z-10">
          WASSCE & Cambridge Past Questions, Marking Schemes & Revision Notes
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl relative z-10 font-medium">
          Access official West African Examinations Council (WAEC WASSCE) papers, Cambridge International (CIE IGCSE) past papers, and AMI Montessori foundational assessments with step-by-step examiner marking rubrics.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-800 mr-2">Curriculum:</span>
          {['ALL', 'GES', 'CAMBRIDGE', 'MONTESSORI'].map(c => (
            <button
              key={c}
              onClick={() => setSelectedCurriculum(c as CurriculumType | 'ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCurriculum === c
                  ? 'bg-amber-700 text-white shadow-2xs'
                  : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {c === 'ALL' ? 'All Curricula' : c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-800">Subject:</span>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-800 outline-none focus:border-amber-600"
          >
            <option value="ALL">All Subjects</option>
            <option value="Core Mathematics">Core Mathematics</option>
            <option value="Elective Mathematics">Elective Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Montessori Literacy & Math">Montessori Literacy & Math</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Resource Selection List */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase text-slate-800 tracking-wider">
            Available Past Papers ({filteredPapers.length})
          </h3>

          <div className="space-y-2.5">
            {filteredPapers.map(paper => (
              <div
                key={paper.id}
                onClick={() => {
                  soundEngine.playWhiteboardSound();
                  setActivePaper(paper);
                  setQuizScore(null);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition ${
                  activePaper.id === paper.id
                    ? 'bg-amber-50/90 border-amber-400 text-amber-950 shadow-xs ring-1 ring-amber-500/50'
                    : 'bg-white border-stone-200 text-slate-800 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                    paper.curriculum === 'GES' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                    paper.curriculum === 'CAMBRIDGE' ? 'bg-sky-100 text-sky-900 border border-sky-300' :
                    'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}>
                    {paper.curriculum} • {paper.year}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold">{paper.paperType}</span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{paper.title}</h4>
                <p className="text-[11px] text-slate-600 mt-1 flex items-center gap-1 font-medium">
                  <FileText className="w-3.5 h-3.5 text-amber-700" />
                  {paper.questions.length} Step-by-Step Questions Included
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Paper Viewer & Interactive Questions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-6 relative overflow-hidden">
            <KenteWatermark opacity={0.02} />

            {/* Active Paper Title Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4 relative z-10">
              <div>
                <span className="text-xs text-amber-800 font-extrabold uppercase tracking-wider block">
                  {activePaper.examType}
                </span>
                <h3 className="text-base font-bold text-slate-900">{activePaper.title}</h3>
              </div>

              <a
                href={activePaper.downloadUrl}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading official PDF booklet: ${activePaper.title}`);
                }}
                className="flex items-center gap-1.5 bg-stone-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download Printable PDF</span>
              </a>
            </div>

            {/* Questions Accordion / Practice Area */}
            <div className="space-y-6 relative z-10">
              {activePaper.questions.map((q) => (
                <div key={q.id} className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="bg-amber-700 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-lg shrink-0">
                      Q{q.questionNumber}
                    </span>
                    <p className="text-xs font-bold text-slate-900 leading-relaxed flex-1">
                      {q.questionText}
                    </p>
                  </div>

                  {/* Multiple Choice Options if available */}
                  {q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleAnswerSelect(q.id, oIdx)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-medium transition ${
                            quizAnswers[q.id] === oIdx
                              ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold ring-1 ring-amber-500'
                              : 'bg-white border-stone-200 text-slate-700 hover:bg-stone-100'
                          }`}
                        >
                          <span className="font-bold mr-2 text-amber-800">{String.fromCharCode(65 + oIdx)}.</span>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Examiner Marking Scheme Toggle */}
                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleSolution(q.id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{showSolutions[q.id] ? 'Hide Examiner Marking Scheme' : 'View Examiner Marking Scheme & Solution'}</span>
                    </button>
                  </div>

                  {showSolutions[q.id] && (
                    <div className="bg-white border border-amber-300 p-4 rounded-xl space-y-3 text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block mb-1">Step-by-Step Worked Solution:</span>
                        <p className="font-mono text-slate-700 bg-stone-50 p-2.5 rounded-lg border border-stone-200 leading-relaxed">
                          {q.workedSolution}
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-emerald-900 block mb-1">WAEC / Cambridge Marking Rubric:</span>
                        <ul className="space-y-1 text-slate-700">
                          {q.markingSchemePoints.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-center gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* Submit Practice Answers CTA */}
            <div className="flex items-center justify-between bg-stone-100 p-4 rounded-2xl border border-stone-200 relative z-10">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <HelpCircle className="w-4 h-4 text-amber-700" />
                <span>Test yourself using the interactive quiz options above.</span>
              </div>

              {quizScore !== null ? (
                <div className="flex items-center gap-2 bg-emerald-100 text-emerald-900 px-4 py-2 rounded-xl border border-emerald-300 font-bold text-xs">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <span>Score: {quizScore} / {activePaper.questions.length} Correct</span>
                </div>
              ) : (
                <button
                  onClick={handleCalculateScore}
                  className="py-2.5 px-4 bg-amber-700 hover:bg-amber-800 text-white font-extrabold rounded-xl text-xs transition shadow-2xs flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Grade My Quiz Answers</span>
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
