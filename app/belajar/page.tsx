'use client';

import React, { useState } from 'react';
import { useMathOSStore } from '@/lib/store';
import { CURRICULUM_OBJECTIVES, CurriculumEngine } from '@/data/curriculum';
import { LESSON_CONTENTS } from '@/data/lessons';
import { QuestionEngine } from '@/data/questions';
import { AICoachEngine, CoachResponse } from '@/lib/engines/ai-coach-engine';
import { CheckCircle2, Lock, Sparkles, HelpCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BelajarPage() {
  const { profile, masteries, recordAnswer, addXp, completeLesson } = useMathOSStore();
  const objectives = CurriculumEngine.getObjectivesByGrade(profile.grade);

  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string>(objectives[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'materi' | 'latihan'>('materi');

  // Exercise states
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<CoachResponse | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [hintsCount, setHintsCount] = useState<number>(0);

  const currentObjective = CurriculumEngine.getObjectiveById(selectedObjectiveId);
  const currentLesson = currentObjective ? LESSON_CONTENTS[currentObjective.id] : null;
  const questions = currentObjective ? QuestionEngine.getQuestionsByObjective(currentObjective.id) : [];
  const activeQuestion = questions.length > 0 ? questions[0] : QuestionEngine.generateDynamicArithmetic(profile.grade, 'medium');

  const currentMastery = selectedObjectiveId ? masteries[selectedObjectiveId] : null;

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || !activeQuestion.options) return;
    const chosen = activeQuestion.options.find((o) => o.id === selectedOptionId);
    if (!chosen) return;

    const isCorrect = chosen.isCorrect;
    const mistakeType = isCorrect ? undefined : (activeQuestion.mistakeTags?.[chosen.id] || 'calculation_error');

    // Guide with AI Coach
    const coachRes = AICoachEngine.guideChild({
      questionPrompt: activeQuestion.prompt,
      studentAnswer: chosen.text,
      correctAnswer: String(activeQuestion.correctAnswer),
      grade: profile.grade,
      mistakeCategory: mistakeType,
      hintsGivenCount: hintsCount
    });

    setFeedback(coachRes);
    setIsAnswerSubmitted(true);

    // Record in Learning Engine Store
    recordAnswer({
      objectiveId: selectedObjectiveId,
      questionId: activeQuestion.id,
      isCorrect,
      difficulty: activeQuestion.difficulty,
      mistakeType,
      hintsUsed: hintsCount
    });

    if (isCorrect) {
      addXp(25);
      completeLesson(selectedObjectiveId);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}
    }
  };

  const handleResetExercise = () => {
    setSelectedOptionId(null);
    setFeedback(null);
    setIsAnswerSubmitted(false);
    setHintsCount(0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar: Curriculum Learning Map */}
      <aside className="lg:col-span-4 space-y-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-fun">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-comic font-bold text-slate-800 text-lg">Materi Kelas {profile.grade}</h2>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full">
              {objectives.length} Topik
            </span>
          </div>

          <div className="space-y-2">
            {objectives.map((obj, idx) => {
              const mastery = masteries[obj.id];
              const score = mastery ? mastery.score : 0;
              const isSelected = obj.id === selectedObjectiveId;
              const prereq = CurriculumEngine.checkPrerequisitesMet(obj.id, masteries);

              return (
                <button
                  key={obj.id}
                  onClick={() => {
                    setSelectedObjectiveId(obj.id);
                    handleResetExercise();
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between gap-2 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 shadow-fun-amber'
                      : 'border-slate-200 bg-white hover:bg-slate-50 shadow-sm'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="font-comic font-bold text-slate-800 text-sm">{obj.topic}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{obj.title}</p>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {score >= 90 ? (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                        <CheckCircle2 className="w-4 h-4 fill-emerald-100 text-emerald-600" />
                        <span>90%+</span>
                      </span>
                    ) : score > 0 ? (
                      <span className="text-xs font-bold text-amber-600">{score}%</span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold">Baru</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Content: Lesson Explanation & Interactive Practice */}
      <main className="lg:col-span-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl max-w-xs font-comic font-bold text-sm">
          <button
            onClick={() => setActiveTab('materi')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeTab === 'materi' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            📖 Penjelasan Visual
          </button>
          <button
            onClick={() => setActiveTab('latihan')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeTab === 'latihan' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            🎯 Latihan Soal
          </button>
        </div>

        {/* Tab 1: Lesson Content */}
        {activeTab === 'materi' && (
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-fun space-y-6">
            <div>
              <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full uppercase tracking-wider font-comic">
                {currentObjective?.domain.replace('_', ' ')}
              </span>
              <h1 className="text-2xl md:text-3xl font-black font-comic text-slate-900 mt-2">
                {currentObjective?.title}
              </h1>
            </div>

            {/* Hook Question */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl text-amber-950 font-medium">
              💡 {currentLesson?.explanation.hook || 'Mari kita pahami konsep matematika ini bersama-sama!'}
            </div>

            {/* Core Explanation */}
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
              <h3 className="font-comic font-bold text-lg text-slate-800">Konsep Inti</h3>
              <p>{currentLesson?.explanation.concept || currentObjective?.description}</p>
            </div>

            {/* Step-by-Step Examples */}
            {currentLesson?.explanation.examples && (
              <div className="space-y-4 pt-2">
                <h3 className="font-comic font-bold text-lg text-slate-800">Contoh & Langkah Pengerjaan</h3>
                {currentLesson.explanation.examples.map((ex, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <p className="font-bold text-slate-900">📝 Soal: {ex.problem}</p>
                    <div className="space-y-1 text-sm text-slate-600 pl-2">
                      {ex.stepByStep.map((s, idx) => (
                        <p key={idx}>{s}</p>
                      ))}
                    </div>
                    <p className="text-sm font-bold text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200 mt-2">
                      Kesimpulan: {ex.conclusion}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Switch to Exercise Button */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveTab('latihan')}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-comic font-bold rounded-2xl shadow-fun-amber hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Mulai Latihan Mandiri</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Practice */}
        {activeTab === 'latihan' && (
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-fun space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase">Latihan Interaktif</span>
                <h2 className="font-comic font-bold text-xl text-slate-800">{activeQuestion.topic}</h2>
              </div>
              <span className="text-xs bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full uppercase">
                {activeQuestion.difficulty}
              </span>
            </div>

            {/* Question Prompt */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-lg md:text-xl font-bold font-comic text-slate-800 whitespace-pre-line">
              {activeQuestion.prompt}
            </div>

            {/* Options */}
            {activeQuestion.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeQuestion.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      disabled={isAnswerSubmitted}
                      onClick={() => setSelectedOptionId(opt.id)}
                      className={`p-4 rounded-2xl border-2 text-left font-comic text-base font-bold transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-fun-amber scale-[1.02]'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 shadow-sm'
                      }`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Action Bar */}
            {!isAnswerSubmitted ? (
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setHintsCount((c) => c + 1)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-comic text-sm font-bold hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  <span>Petunjuk ({hintsCount > 0 ? activeQuestion.hints[0] : 'Buka Hint'})</span>
                </button>

                <button
                  disabled={!selectedOptionId}
                  onClick={handleSubmitAnswer}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 text-white font-comic font-bold rounded-2xl shadow-fun-emerald hover:scale-105 active:scale-95 transition-all"
                >
                  Periksa Jawaban 🚀
                </button>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                {/* AI Coach Socratic Feedback Box */}
                <div
                  className={`p-5 rounded-2xl border-2 ${
                    feedback?.avatarMood === 'celebrating'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">🤖</span>
                    <div className="space-y-1">
                      <h4 className="font-comic font-bold text-base">Kak Matematika</h4>
                      <p className="text-sm leading-relaxed">{feedback?.coachMessage}</p>
                      <p className="text-xs font-bold mt-2 opacity-80">{activeQuestion.explanation}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleResetExercise}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-comic font-bold rounded-2xl transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Coba Soal Lain</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
