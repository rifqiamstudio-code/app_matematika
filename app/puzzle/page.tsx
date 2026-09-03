'use client';

import React, { useState } from 'react';
import { useMathOSStore } from '@/lib/store';
import { MATH_PUZZLES } from '@/data/games-puzzles';
import { MathPuzzle } from '@/types/math-os';
import { Sparkles, CheckCircle2, HelpCircle, ArrowRight, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PuzzlePage() {
  const { profile, addXp, completePuzzle } = useMathOSStore();
  const [selectedPuzzleId, setSelectedPuzzleId] = useState<string>(MATH_PUZZLES[0].id);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const currentPuzzle = MATH_PUZZLES.find((p) => p.id === selectedPuzzleId) || MATH_PUZZLES[0];
  const isCompleted = profile.completedPuzzleIds.includes(currentPuzzle.id);

  const handleCheckAnswer = () => {
    if (!userAnswer.trim()) return;
    const correct = String(userAnswer).trim() === String(currentPuzzle.correctAnswer).trim();
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      addXp(currentPuzzle.rewardXp);
      completePuzzle(currentPuzzle.id);
      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  const handleNextPuzzle = (puzzleId: string) => {
    setSelectedPuzzleId(puzzleId);
    setUserAnswer('');
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setShowHint(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-900 px-3 py-1 rounded-full text-xs font-bold font-comic">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>TEKA-TEKI & LOGIKA MATEMATIKA</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black font-comic text-slate-900">
          Teka-Teki Asah Otak 🧩
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Pecahkan teka-teki logika, temukan pola angka rahasia, dan jadilah Master Detektif Matematika!
        </p>
      </div>

      {/* Puzzle Selector Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 justify-start sm:justify-center">
        {MATH_PUZZLES.map((puz, idx) => {
          const isDone = profile.completedPuzzleIds.includes(puz.id);
          const isCurrent = puz.id === selectedPuzzleId;
          return (
            <button
              key={puz.id}
              onClick={() => handleNextPuzzle(puz.id)}
              className={`px-4 py-2 rounded-2xl font-comic text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                isCurrent
                  ? 'bg-purple-600 text-white border-purple-600 shadow-fun-purple scale-105'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              <span>Teka-Teki {idx + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Puzzle Interactive Arena Card */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-purple-200 shadow-fun-purple space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs text-purple-600 font-bold uppercase tracking-wider font-comic">
              Kelas {currentPuzzle.grade} • {currentPuzzle.domain.replace('_', ' ')}
            </span>
            <h2 className="font-comic font-bold text-xl md:text-2xl text-slate-800">
              {currentPuzzle.title}
            </h2>
          </div>
          <span className="bg-amber-100 text-amber-900 font-comic font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>+{currentPuzzle.rewardXp} XP</span>
          </span>
        </div>

        {/* Puzzle Prompt */}
        <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100 text-lg md:text-xl font-bold font-comic text-slate-800 whitespace-pre-line leading-relaxed">
          {currentPuzzle.prompt}
        </div>

        {/* Clues Box */}
        {currentPuzzle.clues && currentPuzzle.clues.length > 0 && (
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1 text-sm text-slate-600">
            <p className="font-bold text-slate-700 font-comic">🔍 Petunjuk Detektif:</p>
            {currentPuzzle.clues.map((c, i) => (
              <p key={i} className="pl-2">• {c}</p>
            ))}
          </div>
        )}

        {/* Input & Check */}
        {!isAnswerChecked ? (
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Ketik jawabanmu di sini..."
                className="flex-1 px-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none font-comic text-lg font-bold text-slate-800"
              />
              <button
                onClick={handleCheckAnswer}
                className="px-8 py-3.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-comic font-bold rounded-2xl shadow-fun-purple hover:scale-105 active:scale-95 transition-all"
              >
                Cek Jawaban 🔍
              </button>
            </div>

            {/* Hint Button */}
            <div className="flex justify-start">
              <button
                onClick={() => setShowHint(true)}
                className="text-xs text-purple-600 font-bold font-comic hover:underline flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? `💡 Hint: ${currentPuzzle.hint}` : 'Butuh Bantuan? Buka Hint'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            <div
              className={`p-5 rounded-2xl border-2 ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <h4 className="font-comic font-bold text-lg">
                {isCorrect ? '🎉 Hore, Jawabanmu Tepat Sekali!' : '🤔 Belum Tepat, Jangan Menyerah!'}
              </h4>
              <p className="text-sm mt-1 leading-relaxed">{currentPuzzle.explanation}</p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setUserAnswer('');
                  setIsAnswerChecked(false);
                }}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-comic font-bold rounded-xl text-sm"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
