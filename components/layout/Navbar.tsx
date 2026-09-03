'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMathOSStore } from '@/lib/store';
import { Sparkles, Flame, Coins, ShieldAlert, Volume2, VolumeX, User } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { profile, toggleSound } = useMathOSStore();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white text-xl font-black shadow-fun-amber group-hover:scale-105 transition-transform">
            MC
          </div>
          <div className="flex flex-col">
            <span className="font-comic font-bold text-lg leading-tight bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              MATEMATIKA CERIA
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider">OS ADAPTIF SD</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 font-comic font-medium text-sm">
          <NavLink href="/dashboard" label="🏠 Beranda" active={pathname === '/dashboard'} />
          <NavLink href="/belajar" label="📚 Belajar" active={pathname.startsWith('/belajar')} />
          <NavLink href="/puzzle" label="🧩 Teka-Teki" active={pathname.startsWith('/puzzle')} />
          <NavLink href="/permainan" label="🎮 Permainan" active={pathname.startsWith('/permainan')} />
          <NavLink href="/progress" label="📊 Perkembangan" active={pathname === '/progress'} />
          <NavLink href="/parent" label="👨‍👩‍👧 Orang Tua" active={pathname === '/parent'} />
        </nav>

        {/* Gamification Badges / Stats Bar */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Streak */}
          <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-xl text-orange-600 font-bold text-xs md:text-sm">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
            <span>{profile.streakDays} Hari</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl text-amber-700 font-bold text-xs md:text-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{profile.xp} XP</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound"
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
          >
            {profile.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Profile Badge */}
          <Link
            href="/settings"
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 p-1.5 md:px-3 md:py-1 rounded-xl border border-slate-200 transition-colors"
          >
            <span className="text-lg">{profile.avatar}</span>
            <span className="hidden md:inline font-bold text-xs text-slate-700">Kls {profile.grade}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-xl transition-all ${
        active
          ? 'bg-amber-100 text-amber-900 font-bold shadow-sm'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      {label}
    </Link>
  );
}
