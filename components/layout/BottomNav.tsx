'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Puzzle, Gamepad2, TrendingUp, Users } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Beranda', icon: Home, active: pathname === '/dashboard' },
    { href: '/belajar', label: 'Belajar', icon: BookOpen, active: pathname.startsWith('/belajar') },
    { href: '/puzzle', label: 'Teka-Teki', icon: Puzzle, active: pathname.startsWith('/puzzle') },
    { href: '/permainan', label: 'Games', icon: Gamepad2, active: pathname.startsWith('/permainan') },
    { href: '/progress', label: 'Progress', icon: TrendingUp, active: pathname === '/progress' },
    { href: '/parent', label: 'Orang Tua', icon: Users, active: pathname === '/parent' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-2 flex items-center justify-around md:hidden shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all ${
              item.active
                ? 'text-amber-600 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon className={`w-5 h-5 ${item.active ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px] font-comic mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
