import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';

export const metadata: Metadata = {
  title: 'Matematika Ceria OS — Belajar Matematika Jadi Seru!',
  description: 'Platform Pembelajaran Matematika Adaptif Berbasis AI untuk Siswa SD Kelas 1–6 Kurikulum Nasional Indonesia.',
  keywords: ['matematika sd', 'belajar matematika ceria', 'kurikulum merdeka sd', 'games matematika', 'ai tutor matematika anak'],
  authors: [{ name: 'Matematika Ceria OS Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-20 md:pb-0">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
