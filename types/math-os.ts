// ==========================================
// MATEMATIKA CERIA OS - CORE DOMAIN TYPES
// ==========================================

export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type MathDomain =
  | 'bilangan'          // Bilangan Cacah, Bulat, Tempat Nilai
  | 'operasi_hitung'    // Penjumlahan, Pengurangan, Perkalian, Pembagian, FPB/KPK
  | 'pecahan'           // Pecahan Biasa, Campuran, Desimal, Persen
  | 'pengukuran'        // Panjang, Berat, Waktu, Uang, Suhu, Kecepatan, Debit
  | 'geometri'          // Bangun Datar, Bangun Ruang, Sudut, Keliling, Luas, Volume
  | 'analisis_data'     // Diagram Batang, Garis, Lingkaran, Rata-rata/Modus/Median
  | 'aljabar_pola'      // Pola Bilangan, Pola Gambar, Persamaan Sederhana
  | 'penalaran_logika'; // Soal Cerita HOTS, Teka-teki Logika

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'challenge';

export type MasteryStatus =
  | 'not_yet'     // 0 - 39%
  | 'beginning'   // 40 - 59%
  | 'developing'  // 60 - 74%
  | 'proficient'  // 75 - 89%
  | 'mastered';   // 90 - 100%

export type MistakeCategory =
  | 'calculation_error'              // Salah hitung aritmatika dasar
  | 'place_value_error'              // Salah memahami nilai tempat (satuan/puluhan/ratusan)
  | 'fraction_denominator_misconception' // Menjumlahkan penyebut pecahan langsung (1/2 + 1/4 = 2/6)
  | 'wrong_operation'                // Salah memilih operasi (+ bukannya -)
  | 'misread_question'               // Salah membaca informasi soal cerita
  | 'unit_confusion'                 // Salah konversi satuan (cm -> m, jam -> menit)
  | 'geometry_formula_misconception' // Salah rumus keliling vs luas
  | 'multi_step_reasoning_failure'   // Terlewat salah satu langkah pada soal bertingkat
  | 'pattern_misunderstanding'       // Salah mengidentifikasi loncatan pola
  | 'misunderstood_concept'          // Miskonsepsi pemahaman materi dasar
  | 'careless_error';                // Kesalahan ketik atau terburu-buru

// ----------------------------------------------------
// CURRICULUM OBJECTIVE MODEL
// ----------------------------------------------------
export interface LearningObjective {
  id: string;
  grade: GradeLevel;
  domain: MathDomain;
  topic: string;
  title: string;
  description: string;
  prerequisites: string[]; // IDs of prerequisite LearningObjectives
  masteryTargetPercentage: number; // e.g., 80
  estimatedMinutes: number;
  tags: string[];
}

export interface LessonContent {
  id: string;
  objectiveId: string;
  grade: GradeLevel;
  title: string;
  explanation: {
    hook: string;
    concept: string;
    visualType?: 'apples' | 'blocks' | 'pizza' | 'coins' | 'clock' | 'shapes' | 'grid' | 'bar';
    visualData?: any;
    examples: {
      problem: string;
      stepByStep: string[];
      conclusion: string;
    }[];
  };
  remediationTip: string;
}

// ----------------------------------------------------
// QUESTION & EXERCISE MODEL
// ----------------------------------------------------
export type QuestionType =
  | 'multiple_choice'
  | 'numeric_input'
  | 'true_false'
  | 'ordering'
  | 'matching'
  | 'visual_interactive';

export interface QuestionOption {
  id: string;
  text: string;
  visual?: string;
  isCorrect: boolean;
  explanationIfChosen?: string;
}

export interface Question {
  id: string;
  objectiveId: string;
  grade: GradeLevel;
  domain: MathDomain;
  topic: string;
  difficulty: DifficultyLevel;
  type: QuestionType;
  prompt: string;
  visualType?: string;
  visualData?: any;
  options?: QuestionOption[];
  correctAnswer: string | number | string[];
  explanation: string;
  hints: string[];
  mistakeTags?: Partial<Record<string, MistakeCategory>>; // maps chosen wrong option to mistake category
}

// ----------------------------------------------------
// MASTERY & PROGRESS MODEL
// ----------------------------------------------------
export interface ObjectiveMastery {
  objectiveId: string;
  score: number; // 0 - 100
  confidence: number; // 0.0 - 1.0
  attemptsCount: number;
  correctCount: number;
  consecutiveCorrect: number;
  lastPracticedAt: string;
  status: MasteryStatus;
  mistakesHistory: {
    mistakeType: MistakeCategory;
    timestamp: string;
    questionId: string;
  }[];
  historyTrend: {
    date: string;
    score: number;
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  grade: GradeLevel;
  avatar: string;
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  coins: number;
  unlockedBadges: string[];
  completedLessonIds: string[];
  completedPuzzleIds: string[];
  highScores: Record<string, number>; // gameId -> score
  soundEnabled: boolean;
  theme: 'fun' | 'calm' | 'dark';
}

// ----------------------------------------------------
// AI COACH & RECOMMENDATION MODEL
// ----------------------------------------------------
export type NextActivityType =
  | 'lesson'
  | 'practice'
  | 'puzzle'
  | 'game'
  | 'remediation'
  | 'daily_challenge'
  | 'spaced_review';

export interface RecommendedActivity {
  type: NextActivityType;
  targetId: string; // lessonId, gameId, puzzleId, etc.
  title: string;
  reason: string;
  domain: MathDomain;
  grade: GradeLevel;
  difficulty: DifficultyLevel;
  badgeRewardXp: number;
}

// ----------------------------------------------------
// MINI GAME & PUZZLE MODEL
// ----------------------------------------------------
export interface MiniGameMeta {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  domain: MathDomain;
  grades: GradeLevel[];
  category: 'speed' | 'strategy' | 'puzzle' | 'simulation';
}

export interface MathPuzzle {
  id: string;
  grade: GradeLevel;
  domain: MathDomain;
  title: string;
  difficulty: DifficultyLevel;
  prompt: string;
  clues: string[];
  visualType?: string;
  visualData?: any;
  correctAnswer: string | number;
  explanation: string;
  hint: string;
  rewardXp: number;
}
