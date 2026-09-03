import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  UserProfile,
  GradeLevel,
  ObjectiveMastery,
  MasteryStatus,
  MistakeCategory,
  RecommendedActivity
} from '../types/math-os';

interface MathOSState {
  profile: UserProfile;
  masteries: Record<string, ObjectiveMastery>;
  activeSessionStartTime: number;

  // Actions
  setGrade: (grade: GradeLevel) => void;
  setName: (name: string) => void;
  setAvatar: (avatar: string) => void;
  toggleSound: () => void;
  addXp: (amount: number) => { newXp: number; leveledUp: boolean; oldLevel: number; newLevel: number };
  recordAnswer: (params: {
    objectiveId: string;
    questionId: string;
    isCorrect: boolean;
    difficulty: 'easy' | 'medium' | 'hard' | 'challenge';
    mistakeType?: MistakeCategory;
    hintsUsed: number;
  }) => { updatedMastery: ObjectiveMastery; statusChanged: boolean };
  completeLesson: (lessonId: string) => void;
  completePuzzle: (puzzleId: string) => void;
  setGameHighScore: (gameId: string, score: number) => void;
  unlockBadge: (badgeId: string) => boolean;
  resetProgress: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  id: 'child_1',
  name: 'Bintang',
  grade: 3,
  avatar: '🦁',
  xp: 150,
  level: 2,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  coins: 45,
  unlockedBadges: ['first_step', 'math_explorer'],
  completedLessonIds: [],
  completedPuzzleIds: [],
  highScores: {},
  soundEnabled: true,
  theme: 'fun',
};

function calculateStatus(score: number): MasteryStatus {
  if (score >= 90) return 'mastered';
  if (score >= 75) return 'proficient';
  if (score >= 60) return 'developing';
  if (score >= 40) return 'beginning';
  return 'not_yet';
}

function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 50)) + 1;
}

export const useMathOSStore = create<MathOSState>()(
  persist(
    (set, get) => ({
      profile: DEFAULT_PROFILE,
      masteries: {},
      activeSessionStartTime: Date.now(),

      setGrade: (grade) => {
        set((state) => ({
          profile: { ...state.profile, grade }
        }));
      },

      setName: (name) => {
        set((state) => ({
          profile: { ...state.profile, name }
        }));
      },

      setAvatar: (avatar) => {
        set((state) => ({
          profile: { ...state.profile, avatar }
        }));
      },

      toggleSound: () => {
        set((state) => ({
          profile: { ...state.profile, soundEnabled: !state.profile.soundEnabled }
        }));
      },

      addXp: (amount) => {
        const currentProfile = get().profile;
        const newXp = currentProfile.xp + amount;
        const oldLevel = currentProfile.level;
        const newLevel = calculateLevel(newXp);
        const leveledUp = newLevel > oldLevel;

        set((state) => ({
          profile: {
            ...state.profile,
            xp: newXp,
            level: newLevel,
            coins: state.profile.coins + Math.floor(amount / 5),
          }
        }));

        return { newXp, leveledUp, oldLevel, newLevel };
      },

      recordAnswer: ({ objectiveId, questionId, isCorrect, difficulty, mistakeType, hintsUsed }) => {
        const state = get();
        const current = state.masteries[objectiveId] || {
          objectiveId,
          score: 0,
          confidence: 0,
          attemptsCount: 0,
          correctCount: 0,
          consecutiveCorrect: 0,
          lastPracticedAt: new Date().toISOString(),
          status: 'not_yet',
          mistakesHistory: [],
          historyTrend: []
        };

        const newAttempts = current.attemptsCount + 1;
        const newCorrect = isCorrect ? current.correctCount + 1 : current.correctCount;
        const newConsecutive = isCorrect ? current.consecutiveCorrect + 1 : 0;

        // Weight delta based on difficulty and hint usage
        const diffWeight = difficulty === 'challenge' ? 1.5 : difficulty === 'hard' ? 1.2 : difficulty === 'medium' ? 1.0 : 0.8;
        const hintPenalty = Math.min(hintsUsed * 5, 20);

        let delta = 0;
        if (isCorrect) {
          delta = (15 * diffWeight) - hintPenalty;
        } else {
          delta = -10;
        }

        const newScore = Math.max(0, Math.min(100, Math.round(current.score + delta)));
        const newStatus = calculateStatus(newScore);
        const statusChanged = newStatus !== current.status;

        const newMistakes = [...current.mistakesHistory];
        if (!isCorrect && mistakeType) {
          newMistakes.push({
            mistakeType,
            timestamp: new Date().toISOString(),
            questionId
          });
        }

        const todayStr = new Date().toISOString().split('T')[0];
        const updatedTrend = [...current.historyTrend];
        const existingTrendIdx = updatedTrend.findIndex(t => t.date === todayStr);
        if (existingTrendIdx >= 0) {
          updatedTrend[existingTrendIdx].score = newScore;
        } else {
          updatedTrend.push({ date: todayStr, score: newScore });
        }

        const updatedMastery: ObjectiveMastery = {
          ...current,
          score: newScore,
          attemptsCount: newAttempts,
          correctCount: newCorrect,
          consecutiveCorrect: newConsecutive,
          lastPracticedAt: new Date().toISOString(),
          status: newStatus,
          mistakesHistory: newMistakes,
          historyTrend: updatedTrend,
          confidence: Math.min(1.0, newAttempts / 10)
        };

        set((s) => ({
          masteries: {
            ...s.masteries,
            [objectiveId]: updatedMastery
          }
        }));

        return { updatedMastery, statusChanged };
      },

      completeLesson: (lessonId) => {
        set((state) => {
          if (state.profile.completedLessonIds.includes(lessonId)) return state;
          return {
            profile: {
              ...state.profile,
              completedLessonIds: [...state.profile.completedLessonIds, lessonId]
            }
          };
        });
      },

      completePuzzle: (puzzleId) => {
        set((state) => {
          if (state.profile.completedPuzzleIds.includes(puzzleId)) return state;
          return {
            profile: {
              ...state.profile,
              completedPuzzleIds: [...state.profile.completedPuzzleIds, puzzleId]
            }
          };
        });
      },

      setGameHighScore: (gameId, score) => {
        set((state) => {
          const prev = state.profile.highScores[gameId] || 0;
          if (score <= prev) return state;
          return {
            profile: {
              ...state.profile,
              highScores: {
                ...state.profile.highScores,
                [gameId]: score
              }
            }
          };
        });
      },

      unlockBadge: (badgeId) => {
        const state = get();
        if (state.profile.unlockedBadges.includes(badgeId)) return false;
        set((s) => ({
          profile: {
            ...s.profile,
            unlockedBadges: [...s.profile.unlockedBadges, badgeId]
          }
        }));
        return true;
      },

      resetProgress: () => {
        set({
          profile: DEFAULT_PROFILE,
          masteries: {},
          activeSessionStartTime: Date.now()
        });
      }
    }),
    {
      name: 'matematika-ceria-os-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
