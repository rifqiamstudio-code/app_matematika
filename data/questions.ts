import { Question, GradeLevel, DifficultyLevel, MathDomain, MistakeCategory } from '@/types/math-os';

export const STATIC_QUESTIONS: Question[] = [
  // ==========================================
  // KELAS 1
  // ==========================================
  {
    id: 'q_g1_1',
    objectiveId: 'g1_bilangan_cacah_10',
    grade: 1,
    domain: 'bilangan',
    topic: 'Mengenal Bilangan 1-10',
    difficulty: 'easy',
    type: 'multiple_choice',
    prompt: 'Hitung ada berapa buah apel di bawah ini:\n🍎 🍎 🍎 🍎 🍎',
    options: [
      { id: 'opt1', text: '4', isCorrect: false, explanationIfChosen: 'Hitung pelan-pelan lagi ya, sentuh setiap apel satu per satu.' },
      { id: 'opt2', text: '5', isCorrect: true, explanationIfChosen: 'Hebat! Ada tepat 5 buah apel merah.' },
      { id: 'opt3', text: '6', isCorrect: false, explanationIfChosen: 'Kelebihan satu hitungan. Coba hitung ulang.' },
    ],
    correctAnswer: '5',
    explanation: 'Ada 5 buah apel merah: 1, 2, 3, 4, 5.',
    hints: ['Sentuh layar di setiap apel sambil membilang angka dari satu.'],
    mistakeTags: {
      'opt1': 'calculation_error',
      'opt3': 'calculation_error'
    }
  },
  {
    id: 'q_g1_2',
    objectiveId: 'g1_penjumlahan_sampai_10',
    grade: 1,
    domain: 'operasi_hitung',
    topic: 'Penjumlahan Sampai 10',
    difficulty: 'medium',
    type: 'multiple_choice',
    prompt: 'Rina punya 4 pensil ✏️. Ayah memberi 3 pensil lagi ✏️. Berapa banyak pensil Rina sekarang?',
    options: [
      { id: 'opt1', text: '6', isCorrect: false, explanationIfChosen: 'Kurang tepat. 4 + 3 = 7.' },
      { id: 'opt2', text: '7', isCorrect: true, explanationIfChosen: 'Benar sekali! 4 pensil ditambah 3 pensil menjadi 7 pensil.' },
      { id: 'opt3', text: '8', isCorrect: false, explanationIfChosen: 'Kelebihan satu. 4 simpan di kepala, buka 3 jari, hitung maju: 5, 6, 7.' },
      { id: 'opt4', text: '1', isCorrect: false, explanationIfChosen: 'Ini adalah penjumlahan (diberi lagi), bukan pengurangan.' },
    ],
    correctAnswer: '7',
    explanation: 'Pensil awal (4) + Pensil dari Ayah (3) = 7 pensil.',
    hints: ['Simpan angka 4 di kepala, lalu hitung maju 3 langkah.'],
    mistakeTags: {
      'opt1': 'calculation_error',
      'opt3': 'calculation_error',
      'opt4': 'wrong_operation'
    }
  },

  // ==========================================
  // KELAS 2
  // ==========================================
  {
    id: 'q_g2_1',
    objectiveId: 'g2_nilai_tempat_ratusan',
    grade: 2,
    domain: 'bilangan',
    topic: 'Nilai Tempat Bilangan hingga 1000',
    difficulty: 'medium',
    type: 'multiple_choice',
    prompt: 'Pada bilangan 475, angka 7 menempati nilai tempat ...',
    options: [
      { id: 'opt1', text: 'Ratusan (400)', isCorrect: false, explanationIfChosen: 'Angka ratusan adalah angka paling kiri, yaitu 4.' },
      { id: 'opt2', text: 'Puluhan (70)', isCorrect: true, explanationIfChosen: 'Tepat! Angka 7 berada di tengah, bernilai 7 puluhan atau 70.' },
      { id: 'opt3', text: 'Satuan (5)', isCorrect: false, explanationIfChosen: 'Angka satuan adalah angka paling kanan, yaitu 5.' },
    ],
    correctAnswer: 'Puluhan (70)',
    explanation: '4 = Ratusan (400), 7 = Puluhan (70), 5 = Satuan (5).',
    hints: ['Ingat urutan dari kanan ke kiri: Satuan ➔ Puluhan ➔ Ratusan.'],
    mistakeTags: {
      'opt1': 'place_value_error',
      'opt3': 'place_value_error'
    }
  },

  // ==========================================
  // KELAS 3
  // ==========================================
  {
    id: 'q_g3_1',
    objectiveId: 'g3_konsep_perkalian',
    grade: 3,
    domain: 'operasi_hitung',
    topic: 'Perkalian sebagai Penjumlahan Berulang',
    difficulty: 'medium',
    type: 'multiple_choice',
    prompt: 'Bentuk penjumlahan berulang dari 4 × 5 adalah ...',
    options: [
      { id: 'opt1', text: '4 + 4 + 4 + 4 + 4', isCorrect: false, explanationIfChosen: '4 + 4 + 4 + 4 + 4 adalah bentuk dari 5 × 4. Untuk 4 × 5, angka 5 dijumlahkan sebanyak 4 kali.' },
      { id: 'opt2', text: '5 + 5 + 5 + 5', isCorrect: true, explanationIfChosen: 'Tepat sekali! 4 × 5 artinya ada 4 kelompok angka 5 (5 + 5 + 5 + 5 = 20).' },
      { id: 'opt3', text: '4 + 5', isCorrect: false, explanationIfChosen: 'Ini penjumlahan biasa, bukan perkalian.' },
      { id: 'opt4', text: '5 × 5 × 5 × 5', isCorrect: false, explanationIfChosen: 'Perkalian adalah penjumlahan berulang, bukan perkalian berulang.' }
    ],
    correctAnswer: '5 + 5 + 5 + 5',
    explanation: '4 × 5 artinya 4 kali angka 5 dijumlahkan = 5 + 5 + 5 + 5 = 20.',
    hints: ['Ingat: (Jumlah Wadah) × (Isi Wadah) = Isi + Isi + Isi + ...'],
    mistakeTags: {
      'opt1': 'pattern_misunderstanding',
      'opt3': 'wrong_operation',
      'opt4': 'misunderstood_concept'
    }
  },

  // ==========================================
  // KELAS 4
  // ==========================================
  {
    id: 'q_g4_1',
    objectiveId: 'g4_keliling_luas_persegi',
    grade: 4,
    domain: 'geometri',
    topic: 'Keliling & Luas Persegi / Persegi Panjang',
    difficulty: 'medium',
    type: 'multiple_choice',
    prompt: 'Sebuah lapangan berbentuk persegi panjang memiliki panjang 8 meter dan lebar 5 meter. Berapakah luas lapangan tersebut?',
    options: [
      { id: 'opt1', text: '26 meter²', isCorrect: false, explanationIfChosen: '26 meter adalah Keliling (2 × (8+5)), bukan Luas.' },
      { id: 'opt2', text: '40 meter²', isCorrect: true, explanationIfChosen: 'Benar sekali! Luas = Panjang × Lebar = 8 m × 5 m = 40 m².' },
      { id: 'opt3', text: '13 meter²', isCorrect: false, explanationIfChosen: '13 meter adalah hasil penjumlahan panjang dan lebar saja (8+5).' },
      { id: 'opt4', text: '80 meter²', isCorrect: false, explanationIfChosen: 'Perhitungan salah. Rumus Luas = p × l.' }
    ],
    correctAnswer: '40 meter²',
    explanation: 'Luas persegi panjang = Panjang × Lebar = 8 × 5 = 40 m².',
    hints: ['Rumus Luas persegi panjang adalah p × l (panjang dikali lebar).'],
    mistakeTags: {
      'opt1': 'geometry_formula_misconception',
      'opt3': 'multi_step_reasoning_failure',
      'opt4': 'calculation_error'
    }
  },

  // ==========================================
  // KELAS 5
  // ==========================================
  {
    id: 'q_g5_1',
    objectiveId: 'g5_operasi_pecahan_beda_penyebut',
    grade: 5,
    domain: 'pecahan',
    topic: 'Penjumlahan Pecahan Berbeda Penyebut',
    difficulty: 'medium',
    type: 'multiple_choice',
    prompt: 'Hitunglah hasil dari: 1/2 + 1/4 = ...',
    options: [
      { id: 'opt1', text: '2/6', isCorrect: false, explanationIfChosen: 'MISKONSEPSI! Jangan menjumlahkan pembilang dan penyebut langsung (1+1)/(2+4). Samakan dulu penyebutnya.' },
      { id: 'opt2', text: '3/4', isCorrect: true, explanationIfChosen: 'Luar biasa! 1/2 diubah menjadi 2/4. Lalu 2/4 + 1/4 = 3/4.' },
      { id: 'opt3', text: '2/4', isCorrect: false, explanationIfChosen: '2/4 sama dengan 1/2. Kamu belum menambahkan 1/4.' },
      { id: 'opt4', text: '1/4', isCorrect: false, explanationIfChosen: 'Hasil tidak mungkin lebih kecil dari pecahan semula.' }
    ],
    correctAnswer: '3/4',
    explanation: 'KPK(2, 4) = 4. Ubah 1/2 = 2/4. Maka 2/4 + 1/4 = 3/4.',
    hints: ['Cari KPK dari 2 dan 4 untuk menyamakan penyebut.'],
    mistakeTags: {
      'opt1': 'fraction_denominator_misconception',
      'opt3': 'multi_step_reasoning_failure',
      'opt4': 'calculation_error'
    }
  },

  // ==========================================
  // KELAS 6
  // ==========================================
  {
    id: 'q_g6_1',
    objectiveId: 'g6_bilangan_bulat_negatif',
    grade: 6,
    domain: 'bilangan',
    topic: 'Operasi Bilangan Bulat Negatif',
    difficulty: 'medium',
    type: 'multiple_choice',
    prompt: 'Suhu di dalam lemari es mula-mula adalah -4°C. Ketika listrik padam, suhu naik sebesar 9°C. Berapakah suhu lemari es sekarang?',
    options: [
      { id: 'opt1', text: '-13°C', isCorrect: false, explanationIfChosen: 'Suhu naik artinya ditambah (+9), bukan dikurang.' },
      { id: 'opt2', text: '5°C', isCorrect: true, explanationIfChosen: 'Tepat sekali! -4 + 9 = 5°C.' },
      { id: 'opt3', text: '-5°C', isCorrect: false, explanationIfChosen: 'Hati-hati dengan tanda positif dan negatif. Karena +9 lebih besar dari 4, hasilnya positif.' },
      { id: 'opt4', text: '13°C', isCorrect: false, explanationIfChosen: 'Ingat suhu awal adalah minus 4 (-4), bukan plus 4.' }
    ],
    correctAnswer: '5°C',
    explanation: '-4 + 9 = 5°C.',
    hints: ['Bayangkan garis bilangan: mulai di -4 lalu maju ke kanan 9 langkah.'],
    mistakeTags: {
      'opt1': 'wrong_operation',
      'opt3': 'calculation_error',
      'opt4': 'place_value_error'
    }
  }
];

export class QuestionEngine {
  public static getQuestionsByObjective(objectiveId: string): Question[] {
    return STATIC_QUESTIONS.filter(q => q.objectiveId === objectiveId);
  }

  public static getQuestionsByGrade(grade: GradeLevel): Question[] {
    return STATIC_QUESTIONS.filter(q => q.grade === grade);
  }

  public static generateDynamicArithmetic(grade: GradeLevel, difficulty: DifficultyLevel): Question {
    const id = `dyn_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    if (grade === 1) {
      const a = Math.floor(Math.random() * 5) + 1;
      const b = Math.floor(Math.random() * 5) + 1;
      const ans = a + b;
      const d1 = ans + 1;
      const d2 = Math.max(1, ans - 1);
      const d3 = ans + 2;

      return {
        id,
        objectiveId: 'g1_penjumlahan_sampai_10',
        grade: 1,
        domain: 'operasi_hitung',
        topic: 'Penjumlahan Dinamis',
        difficulty,
        type: 'multiple_choice',
        prompt: `Berapakah hasil dari: ${a} + ${b} = ... ?`,
        options: [
          { id: 'opt_a', text: String(ans), isCorrect: true },
          { id: 'opt_b', text: String(d1), isCorrect: false, explanationIfChosen: 'Kurang tepat, coba hitung maju lagi.' },
          { id: 'opt_c', text: String(d2), isCorrect: false, explanationIfChosen: 'Sedikit kurang.' },
          { id: 'opt_d', text: String(d3), isCorrect: false, explanationIfChosen: 'Kelebihan.' }
        ].sort(() => Math.random() - 0.5),
        correctAnswer: String(ans),
        explanation: `${a} + ${b} = ${ans}`,
        hints: [`Mulai dari ${a}, lalu hitung maju ${b} langkah.`]
      };
    } else if (grade === 3) {
      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      const ans = a * b;
      const d1 = ans + a;
      const d2 = Math.max(1, ans - b);
      const d3 = a + b;

      return {
        id,
        objectiveId: 'g3_konsep_perkalian',
        grade: 3,
        domain: 'operasi_hitung',
        topic: 'Perkalian Bilangan Cacah',
        difficulty,
        type: 'multiple_choice',
        prompt: `Hitunglah hasil perkalian: ${a} × ${b} = ...`,
        options: [
          { id: 'opt_a', text: String(ans), isCorrect: true },
          { id: 'opt_b', text: String(d1), isCorrect: false, explanationIfChosen: 'Kelebihan satu kelipatan.' },
          { id: 'opt_c', text: String(d2), isCorrect: false, explanationIfChosen: 'Kurang tepat.' },
          { id: 'opt_d', text: String(d3), isCorrect: false, explanationIfChosen: 'Itu adalah hasil penjumlahan, bukan perkalian.' }
        ].sort(() => Math.random() - 0.5),
        correctAnswer: String(ans),
        explanation: `${a} × ${b} = ${ans}`,
        hints: [`Gunakan penjumlahan berulang angka ${b} sebanyak ${a} kali.`]
      };
    }

    // Default general math problem
    const x = Math.floor(Math.random() * 20) + 10;
    const y = Math.floor(Math.random() * 15) + 5;
    const ans = x + y;

    return {
      id,
      objectiveId: 'g2_penjumlahan_bersusun',
      grade,
      domain: 'operasi_hitung',
      topic: 'Latihan Hitung Cepat',
      difficulty,
      type: 'multiple_choice',
      prompt: `Berapakah hasil dari ${x} + ${y} = ... ?`,
      options: [
        { id: 'opt_a', text: String(ans), isCorrect: true },
        { id: 'opt_b', text: String(ans + 2), isCorrect: false },
        { id: 'opt_c', text: String(ans - 2), isCorrect: false },
        { id: 'opt_d', text: String(ans + 10), isCorrect: false }
      ].sort(() => Math.random() - 0.5),
      correctAnswer: String(ans),
      explanation: `${x} + ${y} = ${ans}`,
      hints: ['Jumlahkan satuan terlebih dahulu, lalu puluhan.']
    };
  }
}
