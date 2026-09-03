import {
  ObjectiveMastery,
  MistakeCategory,
  RecommendedActivity,
  GradeLevel,
  LearningObjective,
  MathDomain,
  DifficultyLevel
} from '@/types/math-os';
import { CURRICULUM_OBJECTIVES, CurriculumEngine } from '@/data/curriculum';

export class AdaptiveLearningEngine {
  /**
   * Menghitung aktivitas berikutnya yang paling direkomendasikan untuk anak.
   * Urutan Prioritas:
   * 1. Remediasi Miskonsepsi Kritis (misal: penjumlahan penyebut pecahan)
   * 2. Prasyarat yang belum tercapai (Prerequisite weakness)
   * 3. Topik dengan Mastery rendah (< 60%)
   * 4. Topik baru di kurikulum sesuai tingkat kelas
   * 5. Pengayaan / Tantangan untuk topik yang sudah Mastered (>= 90%)
   */
  public static getNextBestActivity(
    grade: GradeLevel,
    masteries: Record<string, ObjectiveMastery>
  ): RecommendedActivity {
    const gradeObjectives = CurriculumEngine.getObjectivesByGrade(grade);

    // 1. Cek apakah ada kesalahan kritis berulang (Mistake Pattern)
    for (const obj of gradeObjectives) {
      const mastery = masteries[obj.id];
      if (mastery && mastery.mistakesHistory.length > 0) {
        const recentMistakes = mastery.mistakesHistory.slice(-3);
        const hasFractionMisconception = recentMistakes.some(
          (m) => m.mistakeType === 'fraction_denominator_misconception'
        );

        if (hasFractionMisconception && mastery.score < 75) {
          return {
            type: 'remediation',
            targetId: obj.id,
            title: `Remediasi Khusus: ${obj.title}`,
            reason: 'Kak Matematika melihat kamu perlu bantuan visual menyamakan penyebut pecahan sebelum menjumlahkannya.',
            domain: obj.domain,
            grade: obj.grade,
            difficulty: 'easy',
            badgeRewardXp: 40
          };
        }
      }
    }

    // 2. Cek Prerequisite yang belum tuntas untuk materi yang sedang dipelajari
    for (const obj of gradeObjectives) {
      const prereqCheck = CurriculumEngine.checkPrerequisitesMet(obj.id, masteries);
      if (!prereqCheck.ready && prereqCheck.missingPrerequisites.length > 0) {
        const missing = prereqCheck.missingPrerequisites[0];
        return {
          type: 'lesson',
          targetId: missing.id,
          title: `Fondasi Penting: ${missing.title}`,
          reason: `Sebelum lanjut ke materi ${obj.title}, yuk kita kuasai dulu ${missing.title}!`,
          domain: missing.domain,
          grade: missing.grade,
          difficulty: 'easy',
          badgeRewardXp: 35
        };
      }
    }

    // 3. Cek materi dengan skor terendah yang butuh latihan
    const developingObjectives = gradeObjectives
      .filter((obj) => {
        const m = masteries[obj.id];
        return m && m.score > 0 && m.score < 75;
      })
      .sort((a, b) => (masteries[a.id]?.score || 0) - (masteries[b.id]?.score || 0));

    if (developingObjectives.length > 0) {
      const target = developingObjectives[0];
      return {
        type: 'practice',
        targetId: target.id,
        title: `Latihan Penguatan: ${target.title}`,
        reason: `Skor kamu di ${target.topic} saat ini ${masteries[target.id].score}%. Sedikit latihan lagi untuk mencapai predikat Mahir!`,
        domain: target.domain,
        grade: target.grade,
        difficulty: 'medium',
        badgeRewardXp: 30
      };
    }

    // 4. Pelajaran baru yang belum pernah dicoba
    const unstarted = gradeObjectives.find((obj) => !masteries[obj.id] || masteries[obj.id].attemptsCount === 0);
    if (unstarted) {
      return {
        type: 'lesson',
        targetId: unstarted.id,
        title: `Materi Baru: ${unstarted.title}`,
        reason: `Materi seru berikutnya di Kelas ${grade}: ${unstarted.topic}!`,
        domain: unstarted.domain,
        grade: unstarted.grade,
        difficulty: 'medium',
        badgeRewardXp: 50
      };
    }

    // 5. Pengayaan / Mini Game / Puzzle untuk yang sudah menguasai semua materi
    return {
      type: 'game',
      targetId: 'balloon_math',
      title: 'Tantangan Master: Balloon Math',
      reason: 'Kamu sudah hebat di semua materi! Uji kecepatan dan ketangkasan berhitungmu di arena permainan.',
      domain: 'operasi_hitung',
      grade: grade,
      difficulty: 'challenge',
      badgeRewardXp: 60
    };
  }

  /**
   * Menghitung tingkat kesulitan adaptif (Dynamic Scaffolding) berdasarkan akurasi sesi
   */
  public static calculateAdaptiveDifficulty(
    currentMasteryScore: number,
    consecutiveCorrect: number
  ): DifficultyLevel {
    if (currentMasteryScore >= 85 && consecutiveCorrect >= 3) {
      return 'challenge';
    }
    if (currentMasteryScore >= 70 && consecutiveCorrect >= 2) {
      return 'hard';
    }
    if (currentMasteryScore >= 45) {
      return 'medium';
    }
    return 'easy';
  }
}
