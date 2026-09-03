'use client';

import React from 'react';
import Link from 'next/link';
import { useMathOSStore } from '@/lib/store';
import { AdaptiveLearningEngine } from '@/lib/engines/adaptive-engine';
import { CURRICULUM_OBJECTIVES } from '@/data/curriculum';
import { Sparkles, ArrowRight, Play, Flame, Star, BookOpen, Puzzle, Gamepad2, Brain, CheckCircle2 } from 'lucide-react';

export default function DashboardPage() {
  const { profile, masteries } = useMathOSStore();
  const nextActivity = AdaptiveLearningEngine.getNextBestActivity(profile.grade, masteries);

  const gradeObjectives = CURRICULUM_OBJECTIVES.filter((o) => o.grade === profile.grade);
  const masteredCount = gradeObjectives.filter((o) => masteries[o.id]?.status === 'mastered').length;
  const progressPercent = gradeObjectives.length > 0 ? Math.round((masteredCount / gradeObjectives.length) * 100) : 0;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Banner */}
      <section className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 rounded-3xl p-6 md:p-8 text-white shadow-fun-amber relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{profile.avatar}</span>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold font-comic">
              Kelas {profile.grade} SD
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black font-comic leading-tight">
            Semangat Pagi, {profile.name}! 🌟
          </h1>

          <p className="text-sm md:text-base text-white/90">
            Kemarin kamu sudah luar biasa! Hari ini ada petualangan matematika baru menantimu.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs md:text-sm font-bold">
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>Level {profile.level}</span>
            </div>

            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs md:text-sm font-bold">
              <Flame className="w-4 h-4 fill-orange-300 text-orange-300" />
              <span>{profile.streakDays} Hari Beruntun</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-6 -bottom-8 opacity-20 text-9xl select-none pointer-events-none">
          📐
        </div>
      </section>

      {/* Next Best Learning Activity Card */}
      <section className="bg-white border-2 border-amber-300 rounded-3xl p-6 shadow-fun-amber relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold font-comic">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>REKOMENDASI ADAPTIF KAK MATEMATIKA</span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold font-comic text-slate-800">
              {nextActivity.title}
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              💡 {nextActivity.reason}
            </p>
          </div>

          <Link
            href={nextActivity.type === 'game' ? '/permainan' : `/belajar?target=${nextActivity.targetId}`}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-comic font-bold rounded-2xl shadow-fun-amber hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 self-start md:self-auto"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Mulai Sekarang (+{nextActivity.badgeRewardXp} XP)</span>
          </Link>
        </div>
      </section>

      {/* Progress & Quick Modes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Curriculum Progress Box */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-fun flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-comic font-bold text-slate-700">Progres Kurikulum</span>
              <span className="text-sm font-bold text-amber-600">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {masteredCount} dari {gradeObjectives.length} topik kelas {profile.grade} sudah dikuasai
            </p>
          </div>

          <Link
            href="/belajar"
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-comic font-bold text-sm rounded-xl text-center transition-colors block"
          >
            Buka Peta Materi 🗺️
          </Link>
        </div>

        {/* Puzzle Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-fun flex flex-col justify-between space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl">
              🧩
            </div>
            <div>
              <h3 className="font-comic font-bold text-slate-800">Teka-Teki Logika</h3>
              <p className="text-xs text-slate-500">Tantang otakmu dengan tebakan pola & timbangan</p>
            </div>
          </div>

          <Link
            href="/puzzle"
            className="w-full py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-comic font-bold text-sm rounded-xl text-center border border-purple-200 transition-colors block"
          >
            Pecahkan Teka-Teki
          </Link>
        </div>

        {/* Game Arena Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-fun flex flex-col justify-between space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl">
              🎮
            </div>
            <div>
              <h3 className="font-comic font-bold text-slate-800">Arena Permainan</h3>
              <p className="text-xs text-slate-500">10 game seru: Balloon Math, Roket & Pizza</p>
            </div>
          </div>

          <Link
            href="/permainan"
            className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-comic font-bold text-sm rounded-xl text-center border border-emerald-200 transition-colors block"
          >
            Masuk Arena Games
          </Link>
        </div>
      </div>
    </div>
  );
}
