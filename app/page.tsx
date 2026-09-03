'use client';

import React from 'react';
import Link from 'next/link';
import { useMathOSStore } from '@/lib/store';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Compass, BrainCircuit, Trophy } from 'lucide-react';

export default function LandingPage() {
  const { profile, setGrade } = useMathOSStore();

  return (
    <div className="flex flex-col items-center justify-center py-6 md:py-12 space-y-12">
      {/* Hero Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-900 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold font-comic shadow-sm animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Platform Belajar Matematika Adaptif SD Kelas 1–6</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black font-comic tracking-tight text-slate-900 leading-tight">
          Belajar Matematika Jadi{' '}
          <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent underline decoration-wavy decoration-amber-300">
            Super Seru!
          </span>{' '}
          🎉
        </h1>

        <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Bukan sekadar kuis biasa! <strong>Matematika Ceria OS</strong> membimbing anak memahami konsep, mendeteksi pola kesalahan, dan memberikan jalur belajar adaptif bersama <strong>Kak Matematika (AI Coach)</strong>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-comic font-bold text-lg rounded-2xl shadow-fun-amber hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <span>Mulai Petualangan Belajar</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/parent"
            className="w-full sm:w-auto px-6 py-4 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-comic font-bold text-base rounded-2xl shadow-fun hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <span>Dashboard Orang Tua 👨‍👩‍👧</span>
          </Link>
        </div>
      </section>

      {/* Grade Selector Quick Cards */}
      <section className="w-full max-w-5xl">
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-2xl font-bold font-comic text-slate-800">Pilih Jenjang Kelas</h2>
          <p className="text-sm text-slate-500">Materi disesuaikan dengan Capaian Pembelajaran Kurikulum Nasional</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {[1, 2, 3, 4, 5, 6].map((g) => {
            const isSelected = profile.grade === g;
            return (
              <button
                key={g}
                onClick={() => setGrade(g as any)}
                className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2 ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50 shadow-fun-amber scale-105'
                    : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-slate-50 shadow-fun'
                }`}
              >
                <span className="text-3xl">
                  {g === 1 ? '🌱' : g === 2 ? '🐥' : g === 3 ? '🦊' : g === 4 ? '🐬' : g === 5 ? '🦁' : '🦅'}
                </span>
                <span className="font-comic font-bold text-slate-800 text-base">Kelas {g}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  {g <= 2 ? 'Fase A' : g <= 4 ? 'Fase B' : 'Fase C'}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-fun flex flex-col space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">
            🤖
          </div>
          <h3 className="font-comic font-bold text-lg text-slate-800">Kak Matematika (AI Coach)</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Metode bimbingan Sokratik yang tidak langsung memberi jawaban, melainkan memandu proses berpikir secara visual.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-fun flex flex-col space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-2xl">
            🧠
          </div>
          <h3 className="font-comic font-bold text-lg text-slate-800">Analisis Pola Kesalahan</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Mendeteksi miskonsepsi (seperti salah rumus, nilai tempat, atau pecahan) dan memberikan aktivitas remedial yang tepat sasaran.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-fun flex flex-col space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl">
            🎮
          </div>
          <h3 className="font-comic font-bold text-lg text-slate-800">10 Mini Games Edukasi</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Permainan berhitung seru (Balloon Math, Pizza Pecahan, Math Rocket) yang langsung terintegrasi dengan capaian pembelajaran.
          </p>
        </div>
      </section>
    </div>
  );
}
