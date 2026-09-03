import { UserProfile, ObjectiveMastery, GradeLevel } from '@/types/math-os';
import { CURRICULUM_OBJECTIVES } from '@/data/curriculum';

export interface ParentInsightReport {
  summaryTitle: string;
  narrativeOverview: string;
  strongestTopics: { topic: string; score: number; statusText: string }[];
  needsImprovementTopics: { topic: string; score: number; suggestion: string }[];
  weeklyLearningTimeMinutes: number;
  totalQuestionsAnswered: number;
  overallAccuracyPercentage: number;
  actionableRecommendation: string;
}

export class ParentInsightEngine {
  public static generateReport(
    profile: UserProfile,
    masteries: Record<string, ObjectiveMastery>
  ): ParentInsightReport {
    const objectives = CURRICULUM_OBJECTIVES.filter((o) => o.grade === profile.grade);

    let totalAttempts = 0;
    let totalCorrect = 0;
    const topicScores: { topic: string; score: number; status: string }[] = [];

    for (const obj of objectives) {
      const m = masteries[obj.id];
      const score = m ? m.score : 0;
      if (m) {
        totalAttempts += m.attemptsCount;
        totalCorrect += m.correctCount;
      }
      topicScores.push({
        topic: obj.topic,
        score,
        status: m ? m.status : 'not_yet'
      });
    }

    const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

    // Sort topics by score
    topicScores.sort((a, b) => b.score - a.score);
    const strongest = topicScores.filter((t) => t.score >= 75).slice(0, 3);
    const needsHelp = topicScores.filter((t) => t.score < 75);

    let narrative = `Ananda ${profile.name} (Kelas ${profile.grade}) telah menunjukkan ketekunan belajar dengan capaian level ${profile.level} dan total perolehan ${profile.xp} XP.`;

    if (accuracy >= 80) {
      narrative += ` Pemahaman logika dan komputasi dasar sangat baik dengan tingkat akurasi mencapai ${accuracy}%.`;
    } else if (accuracy >= 60) {
      narrative += ` Ananda sedang dalam tahap perkembangan yang positif dengan akurasi ${accuracy}%, membutuhkan latihan rutin pada topik berjenjang.`;
    } else {
      narrative += ` Ananda membutuhkan pendampingan pada konsep-konsep dasar untuk memperkuat fondasi matematika.`;
    }

    let recommendation = 'Pertahankan kebiasaan belajar 15 menit setiap hari untuk menjaga ketajaman logika.';
    if (needsHelp.length > 0) {
      recommendation = `Disarankan untuk mendampingi ananda berlatih pada topik "${needsHelp[0].topic}" melalui modul Belajar visual atau Mini Games yang interaktif.`;
    }

    return {
      summaryTitle: `Laporan Perkembangan Belajar Ananda ${profile.name}`,
      narrativeOverview: narrative,
      strongestTopics: strongest.map((s) => ({
        topic: s.topic,
        score: s.score,
        statusText: s.score >= 90 ? 'Sangat Mahir ⭐⭐⭐' : 'Mahir ⭐⭐'
      })),
      needsImprovementTopics: needsHelp.map((n) => ({
        topic: n.topic,
        score: n.score,
        suggestion: n.score === 0 ? 'Belum dipelajari' : 'Perlu latihan penguatan konsep visual'
      })),
      weeklyLearningTimeMinutes: Math.max(15, profile.level * 25),
      totalQuestionsAnswered: totalAttempts,
      overallAccuracyPercentage: accuracy,
      actionableRecommendation: recommendation
    };
  }
}
