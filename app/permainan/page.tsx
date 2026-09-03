'use client';

import React, { useState, useEffect } from 'react';
import { useMathOSStore } from '@/lib/store';
import { MINI_GAMES } from '@/data/games-puzzles';
import { MiniGameMeta } from '@/types/math-os';
import { Sparkles, Trophy, Play, RotateCcw, Volume2, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PermainanPage() {
  const { profile, addXp, setGameHighScore } = useMathOSStore();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  // Active Game State
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [numA, setNumA] = useState<number>(4);
  const [numB, setNumB] = useState<number>(3);
  const [options, setOptions] = useState<number[]>([]);
  const [feedbackAnim, setFeedbackAnim] = useState<string | null>(null);

  const selectedGame = MINI_GAMES.find((g) => g.id === selectedGameId);

  const generateQuestion = () => {
    let a = Math.floor(Math.random() * (profile.grade * 3)) + 1;
    let b = Math.floor(Math.random() * (profile.grade * 2)) + 1;
    let correct = a + b;

    if (selectedGameId === 'fraction_pizza') {
      a = Math.floor(Math.random() * 4) + 1;
      b = 4;
      correct = a; // simple slices
    } else if (profile.grade >= 3 && Math.random() > 0.5) {
      a = Math.floor(Math.random() * 8) + 2;
      b = Math.floor(Math.random() * 8) + 2;
      correct = a * b;
    }

    setNumA(a);
    setNumB(b);

    const distractors = [correct + 1, Math.max(1, correct - 1), correct + 2, correct + 5]
      .filter((n) => n !== correct)
      .slice(0, 3);

    const allOpts = [correct, ...distractors].sort(() => Math.random() - 0.5);
    setOptions(allOpts);
  };

  const handleStartGame = (gameId: string) => {
    setSelectedGameId(gameId);
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    generateQuestion();
  };

  const handleAnswer = (ans: number) => {
    if (!gameActive) return;
    const isMul = profile.grade >= 3 && numA > 5;
    const correctAns = selectedGameId === 'fraction_pizza' ? numA : isMul ? numA * numB : numA + numB;

    if (ans === correctAns) {
      setScore((s) => s + 10);
      setFeedbackAnim('✨ +10');
      addXp(5);
      setTimeout(() => setFeedbackAnim(null), 500);
      generateQuestion();
    } else {
      setFeedbackAnim('❌');
      setTimeout(() => setFeedbackAnim(null), 500);
    }
  };

  // Timer countdown
  useEffect(() => {
    let timer: any;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      if (selectedGameId) {
        setGameHighScore(selectedGameId, score);
      }
      try {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      } catch (e) {}
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      {!selectedGameId ? (
        <>
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold font-comic">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>ARENA PERMAINAN MATEMATIKA</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-comic text-slate-900">
              10 Mini Games Edukasi 🎮
            </h1>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Bermain game seru sambil mengasah refleks dan logika berhitung matematika!
            </p>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {MINI_GAMES.map((game) => {
              const bestScore = profile.highScores[game.id] || 0;
              return (
                <div
                  key={game.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-fun p-6 flex flex-col justify-between space-y-4 hover:shadow-fun-lg transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl">{game.icon}</span>
                      {bestScore > 0 && (
                        <span className="bg-amber-100 text-amber-900 font-comic font-bold text-xs px-2.5 py-1 rounded-xl flex items-center gap-1">
                          <Trophy className="w-3.5 h-3.5 text-amber-600" />
                          <span>Skor: {bestScore}</span>
                        </span>
                      )}
                    </div>
                    <h3 className="font-comic font-bold text-lg text-slate-800">{game.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{game.description}</p>
                  </div>

                  <button
                    onClick={() => handleStartGame(game.id)}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-comic font-bold text-sm rounded-2xl shadow-fun-emerald hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Mainkan Game</span>
                  </button>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Active Game Arena */
        <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-emerald-300 shadow-fun-emerald max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <button
              onClick={() => setSelectedGameId(null)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-comic text-xs font-bold flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Keluar</span>
            </button>

            <div className="flex items-center gap-4">
              <span className="font-comic font-bold text-amber-600 text-base">⭐ Skor: {score}</span>
              <span className={`font-comic font-bold text-base ${timeLeft <= 5 ? 'text-rose-600 animate-bounce' : 'text-slate-700'}`}>
                ⏱️ {timeLeft}s
              </span>
            </div>
          </div>

          {gameActive ? (
            <div className="text-center space-y-8 py-6">
              {/* Question Banner */}
              <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-200 shadow-sm relative">
                {feedbackAnim && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-black text-2xl font-comic text-emerald-600 animate-bounce">
                    {feedbackAnim}
                  </span>
                )}

                <div className="text-4xl md:text-5xl font-black font-comic text-slate-800">
                  {selectedGameId === 'fraction_pizza'
                    ? `Berapa potongan dari 4 potong pizza? 🍕`
                    : profile.grade >= 3 && numA > 5
                    ? `${numA} × ${numB} = ?`
                    : `${numA} + ${numB} = ?`}
                </div>
              </div>

              {/* Balloon / Floating Choice Buttons */}
              <div className="grid grid-cols-2 gap-4">
                {options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt)}
                    className="py-6 rounded-3xl bg-gradient-to-tr from-sky-400 to-blue-600 text-white font-black font-comic text-3xl shadow-fun-sky hover:scale-105 active:scale-95 transition-transform"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Game Over Screen */
            <div className="text-center py-8 space-y-6">
              <span className="text-6xl">🏆</span>
              <h2 className="text-3xl font-black font-comic text-slate-800">Permainan Selesai!</h2>
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 inline-block">
                <p className="text-sm font-bold text-slate-600">Total Skor Akhir</p>
                <p className="text-4xl font-black font-comic text-amber-600 mt-1">{score} Poin</p>
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <button
                  onClick={() => handleStartGame(selectedGameId)}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-comic font-bold rounded-2xl shadow-fun-emerald flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Main Lagi</span>
                </button>

                <button
                  onClick={() => setSelectedGameId(null)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-comic font-bold rounded-2xl"
                >
                  Pilih Game Lain
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
