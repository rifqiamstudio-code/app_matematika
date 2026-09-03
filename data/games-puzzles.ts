import { MiniGameMeta, MathPuzzle, GradeLevel } from '@/types/math-os';

export const MINI_GAMES: MiniGameMeta[] = [
  {
    id: 'balloon_math',
    title: 'Balon Angka Ajaib',
    description: 'Pecahkan balon dengan jawaban matematika yang tepat sebelum balon terbang ke langit!',
    icon: '🎈',
    color: 'from-amber-400 to-orange-500',
    domain: 'operasi_hitung',
    grades: [1, 2, 3, 4, 5, 6],
    category: 'speed'
  },
  {
    id: 'math_rocket',
    title: 'Roket Angkasa Matematika',
    description: 'Isi bahan bakar roket dengan menghitung operasi bilangan cepat untuk menjelajahi galaksi!',
    icon: '🚀',
    color: 'from-sky-400 to-blue-600',
    domain: 'operasi_hitung',
    grades: [1, 2, 3, 4, 5, 6],
    category: 'speed'
  },
  {
    id: 'fraction_pizza',
    title: 'Koki Pizza Pecahan',
    description: 'Bagi dan potong loyang pizza sesuai pesanan pecahan pelanggan toko pizza!',
    icon: '🍕',
    color: 'from-rose-400 to-red-600',
    domain: 'pecahan',
    grades: [3, 4, 5, 6],
    category: 'simulation'
  },
  {
    id: 'time_master',
    title: 'Master Jam & Waktu',
    description: 'Putar jarum jam analog sesuai jadwal kegiatan harian anak cerdas.',
    icon: '⏰',
    color: 'from-emerald-400 to-teal-600',
    domain: 'pengukuran',
    grades: [2, 3, 4],
    category: 'simulation'
  },
  {
    id: 'math_shop',
    title: 'Kasir Pintar Warung Ceria',
    description: 'Hitung total belanjaan barang dan berikan uang kembalian Rupiah yang pas.',
    icon: '🛒',
    color: 'from-purple-400 to-indigo-600',
    domain: 'pengukuran',
    grades: [2, 3, 4, 5],
    category: 'simulation'
  },
  {
    id: 'number_garden',
    title: 'Taman Pola Bilangan',
    description: 'Siram bunga yang memiliki urutan pola bilangan kelipatan yang benar agar mekar indah.',
    icon: '🐝',
    color: 'from-yellow-400 to-lime-500',
    domain: 'aljabar_pola',
    grades: [1, 2, 3, 4],
    category: 'puzzle'
  },
  {
    id: 'shape_builder',
    title: 'Arsitek Bangun Geometri',
    description: 'Rakit bangun datar dan bangun ruang untuk membangun istana impian yang kokoh.',
    icon: '🏰',
    color: 'from-cyan-400 to-blue-500',
    domain: 'geometri',
    grades: [1, 2, 4, 5, 6],
    category: 'strategy'
  },
  {
    id: 'math_race',
    title: 'Balap Mobil Juara Hitung',
    description: 'Jawab soal secepat kilat untuk menambah kecepatan mobil balapmu di sirkuit!',
    icon: '🏎️',
    color: 'from-red-500 to-pink-600',
    domain: 'operasi_hitung',
    grades: [1, 2, 3, 4, 5, 6],
    category: 'speed'
  },
  {
    id: 'logic_lab',
    title: 'Laboratorium Teka-teki Logika',
    description: 'Pecahkan teka-teki timbangan, pola rahasia, dan tebakan angka misterius.',
    icon: '🧠',
    color: 'from-violet-500 to-purple-700',
    domain: 'penalaran_logika',
    grades: [3, 4, 5, 6],
    category: 'strategy'
  },
  {
    id: 'math_castle',
    title: 'Benteng Penjaga Angka',
    description: 'Lindungi benteng dari monster matematika dengan menyelesaikan operasi hitung cepat!',
    icon: '🛡️',
    color: 'from-slate-600 to-zinc-800',
    domain: 'operasi_hitung',
    grades: [2, 3, 4, 5, 6],
    category: 'speed'
  }
];

export const MATH_PUZZLES: MathPuzzle[] = [
  {
    id: 'puz_1',
    grade: 1,
    domain: 'aljabar_pola',
    title: 'Teka-teki Buah Misterius',
    difficulty: 'easy',
    prompt: 'Berapakah nilai 1 buah apel 🍎 jika:\n🍎 + 🍎 = 6\n🍎 + 🍌 = 7\nMaka nilai 🍌 adalah ...',
    clues: ['Dua apel bernilai 6, artinya 1 apel bernilai 3.', 'Apel (3) + Pisang = 7, maka Pisang = 7 - 3.'],
    correctAnswer: 4,
    explanation: '1 apel = 3. Maka 3 + Pisang = 7, sehingga Pisang = 4.',
    hint: 'Cari tahu dulu nilai 1 buah apel dengan membagi 6 menjadi dua bagian sama rata.',
    rewardXp: 35
  },
  {
    id: 'puz_2',
    grade: 3,
    domain: 'penalaran_logika',
    title: 'Timbangan Hewan Ceria',
    difficulty: 'medium',
    prompt: 'Di kebun binatang:\n1 Gajah 🐘 = berat 2 Kuda 🐎\n1 Kuda 🐎 = berat 3 Kambing 🐐\nBerapa ekor kambing yang dibutuhkan untuk menyeimbangkan 1 Gajah 🐘?',
    clues: ['1 Kuda = 3 Kambing', '1 Gajah = 2 Kuda = 2 × (3 Kambing)'],
    correctAnswer: 6,
    explanation: '1 Gajah = 2 Kuda. Karena 1 Kuda = 3 Kambing, maka 1 Gajah = 2 × 3 = 6 Kambing.',
    hint: 'Ganti setiap gambar kuda dengan 3 ekor kambing.',
    rewardXp: 45
  },
  {
    id: 'puz_3',
    grade: 5,
    domain: 'pecahan',
    title: 'Pesta Kue Ulang Tahun',
    difficulty: 'hard',
    prompt: 'Sebuah kue tart dipotong menjadi 12 bagian sama besar. Budi memakan 1/3 bagian kue, sedangkan Siti memakan 1/4 bagian kue. Berapa potong kue yang masih tersisa?',
    clues: [
      'Total potongan = 12 potong.',
      'Budi memakan 1/3 × 12 = 4 potong.',
      'Siti memakan 1/4 × 12 = 3 potong.',
      'Sisa = 12 - (4 + 3) potong.'
    ],
    correctAnswer: 5,
    explanation: 'Budi makan 4 potong, Siti makan 3 potong. Total dimakan = 7 potong. Sisa kue = 12 - 7 = 5 potong.',
    hint: 'Hitung berapa banyak potongan yang dimakan Budi dan Siti masing-masing.',
    rewardXp: 60
  }
];
