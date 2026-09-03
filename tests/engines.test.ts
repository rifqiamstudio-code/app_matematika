import { describe, it, expect } from 'vitest';
import { CurriculumEngine, CURRICULUM_OBJECTIVES } from '../data/curriculum';
import { QuestionEngine, STATIC_QUESTIONS } from '../data/questions';
import { AdaptiveLearningEngine } from '../lib/engines/adaptive-engine';
import { MistakeAnalysisEngine } from '../lib/engines/mistake-engine';
import { AICoachEngine } from '../lib/engines/ai-coach-engine';
import { ParentInsightEngine } from '../lib/engines/parent-insight-engine';
import { ObjectiveMastery, UserProfile } from '../types/math-os';

describe('CurriculumEngine & Data Integrity', () => {
  it('should cover all grades 1 through 6', () => {
    for (let grade = 1; grade <= 6; grade++) {
      const objs = CurriculumEngine.getObjectivesByGrade(grade as any);
      expect(objs.length).toBeGreaterThan(0);
    }
  });

  it('should validate prerequisite references exist', () => {
    CURRICULUM_OBJECTIVES.forEach((obj) => {
      obj.prerequisites.forEach((pId) => {
        const target = CurriculumEngine.getObjectiveById(pId);
        expect(target).toBeDefined();
      });
    });
  });
});

describe('QuestionEngine & Mathematical Validation', () => {
  it('should have valid correct answers for all static questions', () => {
    STATIC_QUESTIONS.forEach((q) => {
      expect(q.options).toBeDefined();
      const correctOption = q.options?.find((o) => o.isCorrect);
      expect(correctOption).toBeDefined();
      expect(correctOption?.text).toBe(q.correctAnswer);
    });
  });

  it('should dynamically generate mathematically sound addition for Grade 1', () => {
    for (let i = 0; i < 10; i++) {
      const q = QuestionEngine.generateDynamicArithmetic(1, 'easy');
      const correctOpt = q.options?.find((o) => o.isCorrect);
      expect(correctOpt).toBeDefined();
      const match = q.prompt.match(/(\d+)\s*\+\s*(\d+)/);
      expect(match).not.toBeNull();
      if (match) {
        const sum = parseInt(match[1]) + parseInt(match[2]);
        expect(parseInt(correctOpt!.text)).toBe(sum);
      }
    }
  });

  it('should dynamically generate mathematically sound multiplication for Grade 3', () => {
    for (let i = 0; i < 10; i++) {
      const q = QuestionEngine.generateDynamicArithmetic(3, 'medium');
      const correctOpt = q.options?.find((o) => o.isCorrect);
      expect(correctOpt).toBeDefined();
      const match = q.prompt.match(/(\d+)\s*×\s*(\d+)/);
      expect(match).not.toBeNull();
      if (match) {
        const prod = parseInt(match[1]) * parseInt(match[2]);
        expect(parseInt(correctOpt!.text)).toBe(prod);
      }
    }
  });
});

describe('AdaptiveLearningEngine', () => {
  it('should recommend remediation when fraction misconception is detected', () => {
    const mockMasteries: Record<string, ObjectiveMastery> = {
      g5_operasi_pecahan_beda_penyebut: {
        objectiveId: 'g5_operasi_pecahan_beda_penyebut',
        score: 40,
        confidence: 0.5,
        attemptsCount: 3,
        correctCount: 1,
        consecutiveCorrect: 0,
        lastPracticedAt: new Date().toISOString(),
        status: 'beginning',
        mistakesHistory: [
          {
            mistakeType: 'fraction_denominator_misconception',
            timestamp: new Date().toISOString(),
            questionId: 'q_g5_1',
          },
        ],
        historyTrend: [],
      },
    };

    const next = AdaptiveLearningEngine.getNextBestActivity(5, mockMasteries);
    expect(next.type).toBe('remediation');
    expect(next.targetId).toBe('g5_operasi_pecahan_beda_penyebut');
  });

  it('should recommend prerequisite lesson when prerequisites are missing', () => {
    const mockMasteries: Record<string, ObjectiveMastery> = {};
    const next = AdaptiveLearningEngine.getNextBestActivity(1, mockMasteries);
    expect(next).toBeDefined();
    expect(next.grade).toBe(1);
  });
});

describe('MistakeAnalysisEngine & AICoachEngine', () => {
  it('should diagnose fraction denominator misconception with socratic guidance', () => {
    const diag = MistakeAnalysisEngine.diagnose('fraction_denominator_misconception');
    expect(diag.category).toBe('fraction_denominator_misconception');
    expect(diag.remediationVisual).toBe('pizza');

    const coachRes = AICoachEngine.guideChild({
      questionPrompt: '1/2 + 1/4 = ...',
      studentAnswer: '2/6',
      correctAnswer: '3/4',
      grade: 5,
      mistakeCategory: 'fraction_denominator_misconception',
      hintsGivenCount: 0,
    });

    expect(coachRes.avatarMood).toBe('thinking');
    expect(coachRes.coachMessage).toContain('pizza');
  });
});

describe('ParentInsightEngine', () => {
  it('should generate meaningful parent report from profile and mastery state', () => {
    const profile: UserProfile = {
      id: 'child_1',
      name: 'Raka',
      grade: 4,
      avatar: '🦊',
      xp: 450,
      level: 4,
      streakDays: 5,
      lastActiveDate: '2026-09-03',
      coins: 90,
      unlockedBadges: ['first_step'],
      completedLessonIds: [],
      completedPuzzleIds: [],
      highScores: {},
      soundEnabled: true,
      theme: 'fun',
    };

    const masteries: Record<string, ObjectiveMastery> = {
      g4_keliling_luas_persegi: {
        objectiveId: 'g4_keliling_luas_persegi',
        score: 95,
        confidence: 0.9,
        attemptsCount: 10,
        correctCount: 9,
        consecutiveCorrect: 4,
        lastPracticedAt: '2026-09-03',
        status: 'mastered',
        mistakesHistory: [],
        historyTrend: [],
      },
    };

    const report = ParentInsightEngine.generateReport(profile, masteries);
    expect(report.summaryTitle).toContain('Raka');
    expect(report.strongestTopics.length).toBeGreaterThan(0);
    expect(report.overallAccuracyPercentage).toBe(90);
  });
});
