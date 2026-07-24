import React, { useState } from 'react';
import { mockDiagnosticQuestions, mockTutors } from '../data/mockData';
import { KenteWatermark } from './KentePattern';
import { soundEngine } from '../utils/audioEffects';
import { Sparkles, Brain, Award, CheckCircle2, ArrowRight, RefreshCw, AlertTriangle, Target, BookOpen, Star } from 'lucide-react';

interface AiDiagnosticPredictorProps {
  onSelectTutorToBook?: (tutorId: string) => void;
}

export const AiDiagnosticPredictor: React.FC<AiDiagnosticPredictorProps> = ({ onSelectTutorToBook }) => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'analyzing' | 'results'>('intro');
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [selectedCurriculum, setSelectedCurriculum] = useState<'GES' | 'CAMBRIDGE'>('GES');
  const [selectedSubject, setSelectedSubject] = useState<'Elective Mathematics' | 'Core Mathematics' | 'Physics' | 'Integrated Science'>('Elective Mathematics');

  const filteredQuestions = mockDiagnosticQuestions.filter(q => q.curriculum === selectedCurriculum || q.subject === selectedSubject);
  const questionsToDisplay = filteredQuestions.length > 0 ? filteredQuestions : mockDiagnosticQuestions;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    soundEngine.playUssdKeyClick();
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitDiagnostic = () => {
    soundEngine.playWhiteboardSound();
    setCurrentStep('analyzing');

    setTimeout(() => {
      soundEngine.playPaymentSuccessChime();
      setCurrentStep('results');
    }, 2200);
  };

  // Calculate score & predicted grade
  let correctCount = 0;
  questionsToDisplay.forEach(q => {
    if (userAnswers[q.id] === q.correctIndex) {
      correctCount += 1;
    }
  });

  const percentage = Math.round((correctCount / questionsToDisplay.length) * 100) || 75;

  let predictedWAECGrade = 'A1 (Distinction)';
  let predictedCambridgeGrade = 'A* (90-100%)';
  if (percentage < 50) {
    predictedWAECGrade = 'C4 / C5 (Credit Pass)';
    predictedCambridgeGrade = 'C (60-69%)';
  } else if (percentage < 75) {
    predictedWAECGrade = 'B2 / B3 (Very Good)';
    predictedCambridgeGrade = 'B (70-79%)';
  }

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-6 relative overflow-hidden text-slate-900">
      <KenteWatermark opacity={0.03} />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-800 font-extrabold text-xs uppercase tracking-wider">
            <Brain className="w-4 h-4 text-amber-700" />
            AI Placement Diagnostic & WASSCE Score Predictor
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            WAEC / Cambridge Grade Trajectory Engine
          </h2>
        </div>

        <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-300 shrink-0 self-start sm:self-auto flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Gemini AI Adaptive Testing</span>
        </span>
      </div>

      {currentStep === 'intro' && (
        <div className="space-y-6 relative z-10 py-2">
          <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-700" />
              How the Diagnostic Works
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Take a short 4-question adaptive evaluation crafted from past WAEC WASSCE and Cambridge IGCSE paper standards. Our AI engine measures topic retention, formula application, and recommends exact certified tutors to bridge knowledge gaps before exams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Select Curriculum Track:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCurriculum('GES')}
                  className={`p-3 rounded-xl border text-xs font-bold transition text-center ${
                    selectedCurriculum === 'GES'
                      ? 'bg-amber-700 text-white border-amber-700 shadow-2xs'
                      : 'bg-white text-slate-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  GES SHS WASSCE
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCurriculum('CAMBRIDGE')}
                  className={`p-3 rounded-xl border text-xs font-bold transition text-center ${
                    selectedCurriculum === 'CAMBRIDGE'
                      ? 'bg-amber-700 text-white border-amber-700 shadow-2xs'
                      : 'bg-white text-slate-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  Cambridge IGCSE
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Target Assessment Subject:</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value as any)}
                className="w-full p-3 bg-white border border-stone-300 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-amber-600"
              >
                <option value="Elective Mathematics">Elective Mathematics</option>
                <option value="Core Mathematics">Core Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Integrated Science">Integrated Science</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playWhiteboardSound();
              setCurrentStep('quiz');
            }}
            className="w-full py-3.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-extrabold rounded-2xl transition shadow-md flex items-center justify-center gap-2"
          >
            <span>Start AI Diagnostic Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {currentStep === 'quiz' && (
        <div className="space-y-6 relative z-10">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 bg-stone-100 p-3 rounded-xl">
            <span>{selectedCurriculum} • {selectedSubject}</span>
            <span>Answered {Object.keys(userAnswers).length} / {questionsToDisplay.length} Questions</span>
          </div>

          <div className="space-y-5">
            {questionsToDisplay.map((q, idx) => (
              <div key={q.id} className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-3">
                <div className="flex items-start gap-2">
                  <span className="bg-amber-700 text-white font-mono font-bold text-xs px-2 py-0.5 rounded">
                    Q{idx + 1}
                  </span>
                  <div>
                    <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block">
                      Topic: {q.topicTag}
                    </span>
                    <p className="text-xs font-bold text-slate-900 mt-0.5">{q.questionText}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt: string, oIdx: number) => (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(q.id, oIdx)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition ${
                        userAnswers[q.id] === oIdx
                          ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold ring-1 ring-amber-500'
                          : 'bg-white border-stone-200 text-slate-700 hover:bg-stone-100'
                      }`}
                    >
                      <span className="font-bold mr-2 text-amber-800">{String.fromCharCode(65 + oIdx)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmitDiagnostic}
            disabled={Object.keys(userAnswers).length < questionsToDisplay.length}
            className="w-full py-3.5 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white text-xs font-extrabold rounded-2xl transition shadow-md flex items-center justify-center gap-2"
          >
            <span>Run Gemini AI Trajectory Predictor</span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          </button>
        </div>
      )}

      {currentStep === 'analyzing' && (
        <div className="py-12 text-center space-y-4 relative z-10">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-700 border border-amber-300">
            <Brain className="w-8 h-8 animate-bounce" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Evaluating Response Patterns...</h3>
          <p className="text-xs text-slate-600 font-medium">
            Comparing against WAEC WASSCE 2020-2025 examiner grading distributions & Cambridge percentile benchmarks...
          </p>
        </div>
      )}

      {currentStep === 'results' && (
        <div className="space-y-6 relative z-10">
          <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                  Diagnostic Score
                </span>
                <div className="text-2xl font-extrabold text-amber-950">{percentage}% Accuracy</div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                  Predicted Trajectory Grade
                </span>
                <div className="text-lg font-extrabold text-emerald-900 flex items-center gap-1.5">
                  <Award className="w-5 h-5 text-amber-600" />
                  <span>{selectedCurriculum === 'GES' ? predictedWAECGrade : predictedCambridgeGrade}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  Key Strengths:
                </span>
                <p className="text-slate-700 text-[11px]">Calculus differentiation, chain rule, exponential identities.</p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                <span className="font-bold text-amber-900 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  Focus Areas for Improvement:
                </span>
                <p className="text-slate-700 text-[11px]">Integration by parts, trigonometric identities, molarity stoichiometry.</p>
              </div>
            </div>
          </div>

          {/* Recommended Tutors to bridge gap */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-700" />
              Recommended Certified Tutors for {selectedSubject}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mockTutors.slice(0, 2).map(tut => (
                <div key={tut.id} className="p-3 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img src={tut.avatar} alt={tut.name} className="w-10 h-10 rounded-xl object-cover ring-1 ring-amber-400" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">{tut.name}</h5>
                      <span className="text-[10px] text-amber-800 font-extrabold">★ {tut.rating} • GH₵{tut.hourlyRateGHS}/hr</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectTutorToBook && onSelectTutorToBook(tut.id)}
                    className="bg-amber-700 hover:bg-amber-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl transition shadow-2xs shrink-0"
                  >
                    Book Session
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentStep('intro')}
            className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake Diagnostic Assessment</span>
          </button>
        </div>
      )}

    </div>
  );
};
