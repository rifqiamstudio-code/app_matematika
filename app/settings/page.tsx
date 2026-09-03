'use client';

import React, { useState } from 'react';
import { useMathOSStore } from '@/lib/store';
import { GradeLevel } from '@/types/math-os';
import { Settings, User, Volume2, RotateCcw, Check, Sparkles } from 'lucide-react';

export default function SettingsPage() {
  const { profile, setName, setGrade, setAvatar, toggleSound, resetProgress } = useMathOSStore();
  const [tempName, setTempName] = useState(profile.name);
  const [savedNotice, setSavedNotice] = useState(false);

  const AVATARS = ['🦁', '🦊', '🐬', '🐼', '🦄', '🚀', '🐥', '🐯', '🦉', '⭐'];

  const handleSaveName = () => {
    if (tempName.trim()) {
      setName(tempName.trim());
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black font-comic text-slate-900">Pengaturan Profil ⚙️</h1>
        <p className="text-sm text-slate-600">Sesuaikan profil belajar, avatar karakter, dan jenjang kelas.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-fun space-y-6">
        {/* Nama Panggilan */}
        <div className="space-y-2">
          <label className="font-comic font-bold text-sm text-slate-700">Nama Panggilan Anak</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-comic font-bold text-slate-800"
            />
            <button
              onClick={handleSaveName}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-comic font-bold rounded-2xl shadow-fun-amber transition-all"
            >
              {savedNotice ? 'Tersimpan ✓' : 'Simpan'}
            </button>
          </div>
        </div>

        {/* Pilih Avatar */}
        <div className="space-y-2">
          <label className="font-comic font-bold text-sm text-slate-700">Pilih Avatar Karakter</label>
          <div className="grid grid-cols-5 gap-3">
            {AVATARS.map((av) => {
              const isSelected = profile.avatar === av;
              return (
                <button
                  key={av}
                  onClick={() => setAvatar(av)}
                  className={`p-3 text-3xl rounded-2xl border-2 text-center transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 shadow-fun-amber scale-105'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  {av}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pilih Tingkat Kelas */}
        <div className="space-y-2">
          <label className="font-comic font-bold text-sm text-slate-700">Tingkat Kelas SD</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((g) => {
              const isSelected = profile.grade === g;
              return (
                <button
                  key={g}
                  onClick={() => setGrade(g as GradeLevel)}
                  className={`py-3 rounded-2xl border-2 font-comic font-bold text-sm transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500 text-white shadow-fun-amber scale-105'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Kelas {g}
                </button>
              );
            })}
          </div>
        </div>

        {/* Audio Effects */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <p className="font-comic font-bold text-sm text-slate-800">Efek Suara Permainan</p>
            <p className="text-xs text-slate-500">Suara tombol, kuis benar, dan perayaan naik level</p>
          </div>
          <button
            onClick={toggleSound}
            className={`px-4 py-2 rounded-xl font-comic font-bold text-xs transition-all ${
              profile.soundEnabled
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-slate-100 text-slate-500 border border-slate-200'
            }`}
          >
            {profile.soundEnabled ? 'Aktif 🔊' : 'Mati 🔇'}
          </button>
        </div>

        {/* Reset Progress */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="font-comic font-bold text-sm text-rose-600">Reset Semua Progress</p>
            <p className="text-xs text-slate-400">Menghapus riwayat jawaban dan skor ke awal</p>
          </div>
          <button
            onClick={() => {
              if (confirm('Yakin ingin mereset seluruh progres dan level belajar?')) {
                resetProgress();
              }
            }}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-comic font-bold text-xs rounded-xl border border-rose-200 transition-colors"
          >
            Reset Data
          </button>
        </div>
      </div>
    </div>
  );
}
