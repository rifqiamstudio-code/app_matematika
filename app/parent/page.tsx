'use client';

import React from 'react';
import { useMathOSStore } from '@/lib/store';
import { ParentInsightEngine } from '@/lib/engines/parent-insight-engine';
import { Sparkles, TrendingUp, Clock, Target, AlertTriangle, CheckCircle, Lightbulb, UserCheck } from 'lucide-react';

export default function ParentDashboardPage() {
  const { profile, masteries } = useMathOSStore();
  const report = ParentInsightEngine.generateReport(profile, masteries);

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold font-comic">
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>PORTAL MONITORING ORANG TUA</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black font-comic text-slate-900 mt-1">
            Dashboard Pemahaman Anak 👨‍👩‍👧
          </h1>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-2xl">
          <span className="text-2xl">{profile.avatar}</span>
          <div>
            <p className="font-comic font-bold text-sm text-slate-800">{profile.name}</p>
            <p className="text-xs text-slate-500 font-bold">Kelas {profile.grade} SD</p>
          </div>
        </div>
      </div>

      {/* Narrative AI Insight Box */}
      <section className="bg-gradient-to-tr from-sky-50 to-indigo-50 border-2 border-sky-200 rounded-3xl p-6 md:p-8 shadow-fun-sky space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sky-600" />
          <h2 className="font-comic font-bold text-lg text-slate-900">Analisis Edukatif Matematika Ceria OS</h2>
        </div>

        <p className="text-slate-700 leading-relaxed text-sm md:text-base">
          {report.narrativeOverview}
        </p>

        {/* Actionable Advice for Parents */}
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-sky-200 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold font-comic text-xs uppercase text-slate-600">Saran Pendampingan Orang Tua:</span>
            <p className="text-sm text-slate-800 mt-0.5 font-medium">{report.actionableRecommendation}</p>
          </div>
        </div>
      </section>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-fun">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">Tingkat Akurasi</p>
              <p className="text-2xl font-black font-comic text-slate-800">{report.overallAccuracyPercentage}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-fun">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">Estimasi Waktu Belajar</p>
              <p className="text-2xl font-black font-comic text-slate-800">{report.weeklyLearningTimeMinutes} Menit</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-fun">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">Total Soal Dikerjakan</p>
              <p className="text-2xl font-black font-comic text-slate-800">{report.totalQuestionsAnswered} Butir</p>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Mastery breakdown */}
      <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-fun space-y-6">
        <h3 className="font-comic font-bold text-xl text-slate-800">Peta Penguasaan Topik Matematika</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 font-comic font-bold text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Topik yang Sangat Dikuasai</span>
            </div>
            <div className="space-y-2">
              {report.strongestTopics.length > 0 ? (
                report.strongestTopics.map((s, i) => (
                  <div key={i} className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-800">{s.topic}</span>
                    <span className="font-bold text-xs text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-xl">
                      {s.score}%
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">Belum ada topik yang mencapai skor kemahiran penuh.</p>
              )}
            </div>
          </div>

          {/* Needs Practice */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-700 font-comic font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Topik yang Perlu Penguatan</span>
            </div>
            <div className="space-y-2">
              {report.needsImprovementTopics.map((n, i) => (
                <div key={i} className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-100 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-slate-800">{n.topic}</p>
                    <p className="text-[11px] text-slate-500">{n.suggestion}</p>
                  </div>
                  <span className="font-bold text-xs text-amber-700 bg-amber-100 px-2.5 py-1 rounded-xl">
                    {n.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
