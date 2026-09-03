'use client';

import React from 'react';
import { useMathOSStore } from '@/lib/store';
import { CURRICULUM_OBJECTIVES } from '@/data/curriculum';
import { Sparkles, Trophy, Award, Flame, Star, BookOpen, CheckCircle2 } from 'lucide-react';

export default function ProgressPage() {
  const { profile, masteries } = useMathOSStore();
  const objectives = CURRICULUM_OBJECTIVES.filter((o) => o.grade === profile.grade);

  const BADGES = [
    { id: 'first_step', icon: '🌱', name: 'Langkah Pertama', desc: 'Menyelesaikan pelajaran matematika pertama' },
    { id: 'math_explorer', icon: '🚀', name: 'Penjelajah Angka', desc: 'Mencapai Level 2 di Matematika Ceria' },
    { id: 'streak_3', icon: '🔥', name: 'Pejuang Tekun', desc: 'Belajar 3 hari berturut-turut' },
    { id: 'puzzle_master', icon: '🧩', name: 'Detektif Logika', desc: 'Memecahkan teka-teki matematika' },
    { id: 'arithmetic_hero', icon: '⚡', name: 'Kilat Berhitung', desc: 'Meraih skor 100 di arena permainan' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-black font-comic text-slate-900">
          Perkembangan & Prestasiku 🏆
        </h1>
        <p className="text-sm text-slate-600">
          Lihat jejak prestasimu, lencana yang berhasil dibuka, dan tingkat penguasaan topik!
        </p>
      </div>

      {/* Badges Collection */}
      <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-fun space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h2 className="font-comic font-bold text-xl text-slate-800">Koleksi Lencana Juara</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-2">
          {BADGES.map((b) => {
            const isUnlocked = profile.unlockedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-center space-y-2 transition-all ${
                  isUnlocked
                    ? 'border-amber-400 bg-amber-50/60 shadow-fun-amber'
                    : 'border-slate-200 bg-slate-50 opacity-40 grayscale'
                }`}
              >
                <span className="text-4xl">{b.icon}</span>
                <span className="font-comic font-bold text-xs text-slate-800">{b.name}</span>
                <span className="text-[10px] text-slate-500 leading-tight">{b.desc}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mastery List */}
      <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-fun space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-sky-500" />
          <h2 className="font-comic font-bold text-xl text-slate-800">Tingkat Kemahiran Materi Kelas {profile.grade}</h2>
        </div>

        <div className="space-y-3 pt-2">
          {objectives.map((obj) => {
            const m = masteries[obj.id];
            const score = m ? m.score : 0;
            return (
              <div
                key={obj.id}
                className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full uppercase">
                    {obj.domain.replace('_', ' ')}
                  </span>
                  <p className="font-comic font-bold text-sm text-slate-800">{obj.title}</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-48">
                  <div className="flex-1 bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        score >= 80
                          ? 'bg-emerald-500'
                          : score >= 50
                          ? 'bg-amber-500'
                          : 'bg-rose-400'
                      }`}
                      style={{ width: `${Math.max(5, score)}%` }}
                    />
                  </div>
                  <span className="font-comic font-bold text-xs w-10 text-right text-slate-700">
                    {score}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
