import { GradeLevel, MathDomain, MistakeCategory } from '@/types/math-os';
import { MistakeAnalysisEngine } from './mistake-engine';

export interface CoachResponse {
  coachMessage: string;
  avatarMood: 'happy' | 'thinking' | 'encouraging' | 'celebrating';
  socraticQuestions?: string[];
  visualHelpPrompt?: string;
  recommendedNextStep?: string;
}

export class AICoachEngine {
  /**
   * Menghasilkan bimbingan Sokratik cerdas secara deterministik (100% aman offline tanpa API cost),
   * atau dapat diperluas menggunakan route handler LLM secara aman.
   */
  public static guideChild(params: {
    questionPrompt: string;
    studentAnswer: string | number;
    correctAnswer: string | number;
    grade: GradeLevel;
    mistakeCategory?: MistakeCategory;
    hintsGivenCount: number;
  }): CoachResponse {
    const { mistakeCategory, grade, hintsGivenCount } = params;

    // Jika jawaban anak benar
    if (String(params.studentAnswer).trim() === String(params.correctAnswer).trim()) {
      const celebrations = [
        'Wah, luar biasa! Logika matematikamu tajam sekali! 🌟',
        'Hebat! Kamu berhasil menyelesaikannya dengan tepat! 🚀',
        'Keren banget! Kak Matematika bangga dengan usahamu! 🎉',
        'Mantap! Satu langkah lebih dekat menjadi Juara Matematika! 🏆'
      ];
      return {
        coachMessage: celebrations[Math.floor(Math.random() * celebrations.length)],
        avatarMood: 'celebrating',
        recommendedNextStep: 'Lanjut ke tantangan berikutnya!'
      };
    }

    // Jika jawaban anak keliru - gunakan metode Sokratik
    if (mistakeCategory) {
      const diagnosis = MistakeAnalysisEngine.diagnose(mistakeCategory);
      return {
        coachMessage: `Hampir tepat! Yuk kita pelajari bersama. ${diagnosis.socraticHint}`,
        avatarMood: 'thinking',
        socraticQuestions: [
          'Apa yang diketahui dari soal?',
          'Operasi apa yang harus kita lakukan terlebih dahulu?',
          'Bagaimana kalau kita coba bayangkan dengan gambar?'
        ],
        visualHelpPrompt: `Menampilkan representasi visual ${diagnosis.remediationVisual}`,
        recommendedNextStep: 'Coba hitung sekali lagi dengan tenang ya!'
      };
    }

    // Petunjuk berjenjang (Scaffolding)
    if (hintsGivenCount === 0) {
      return {
        coachMessage: 'Jangan berkecil hati, matematika itu seperti teka-teki seru! Coba perhatikan kembali angka kuncinya.',
        avatarMood: 'encouraging',
        socraticQuestions: ['Apakah ada angka yang perlu kita jumlahkan atau kurangkan terlebih dahulu?'],
        recommendedNextStep: 'Baca soal sekali lagi perlahan-lahan.'
      };
    }

    return {
      coachMessage: 'Kak Matematika ada di sini untuk membantumu. Yuk kita selesaikan langkah demi langkah bersama!',
      avatarMood: 'thinking',
      recommendedNextStep: 'Gunakan petunjuk visual untuk mempermudah.'
    };
  }
}
