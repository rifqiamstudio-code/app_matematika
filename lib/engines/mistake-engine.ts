import { MistakeCategory } from '@/types/math-os';

export interface MistakeDiagnosis {
  category: MistakeCategory;
  title: string;
  description: string;
  socraticHint: string;
  remediationVisual: 'pizza' | 'apples' | 'blocks' | 'coins' | 'grid' | 'bar';
}

export class MistakeAnalysisEngine {
  private static DIAGNOSIS_MAP: Record<MistakeCategory, MistakeDiagnosis> = {
    fraction_denominator_misconception: {
      category: 'fraction_denominator_misconception',
      title: 'Miskonsepsi Penjumlahan Penyebut Pecahan',
      description: 'Anak menjumlahkan angka pembilang dan angka penyebut secara langsung (misal: 1/2 + 1/4 = 2/6).',
      socraticHint: 'Bayangkan 1 potong pizza besar 🍕 dan 1 potong pizza kecil. Apakah ukurannya sama jika langsung digabung tanpa menyamakan potongan terlebih dahulu?',
      remediationVisual: 'pizza'
    },
    place_value_error: {
      category: 'place_value_error',
      title: 'Kekeliruan Nilai Tempat',
      description: 'Anak tertukar antara nilai Satuan, Puluhan, dan Ratusan.',
      socraticHint: 'Perhatikan posisi angkanya: angka paling kanan adalah Satuan, di tengah Puluhan, dan di kiri Ratusan.',
      remediationVisual: 'blocks'
    },
    calculation_error: {
      category: 'calculation_error',
      title: 'Salah Hitung Aritmatika Dasar',
      description: 'Konsep sudah dipahami, namun ada kekeliruan perhitungan maju/mundur sederhana.',
      socraticHint: 'Coba simpan angka yang lebih besar di kepala, lalu gunakan jari untuk menghitung maju perlahan-lahan.',
      remediationVisual: 'apples'
    },
    wrong_operation: {
      category: 'wrong_operation',
      title: 'Salah Memilih Operasi Matematika',
      description: 'Menggunakan pengurangan padahal soal meminta penjumlahan, atau sebaliknya.',
      socraticHint: 'Perhatikan kata kuncinya: "diberi lagi / membeli lagi" artinya DITAMBAH, sedangkan "hilang / dimakan / diberikan" artinya DIKURANG.',
      remediationVisual: 'blocks'
    },
    geometry_formula_misconception: {
      category: 'geometry_formula_misconception',
      title: 'Tertukar Rumus Keliling & Luas',
      description: 'Menghitung keliling saat ditanya luas bangun datar.',
      socraticHint: 'Ingat kuncinya: Keliling itu seperti PAGAR di tepi luar, sedangkan Luas itu seperti KARPET yang menutupi seluruh lantai.',
      remediationVisual: 'grid'
    },
    unit_confusion: {
      category: 'unit_confusion',
      title: 'Kekeliruan Satuan Ukur',
      description: 'Lupa mengubah satuan (misal: meter ke centimeter atau jam ke menit).',
      socraticHint: 'Periksa satuannya: 1 meter = 100 cm, 1 jam = 60 menit. Samakan satuan terlebih dahulu sebelum berhitung!',
      remediationVisual: 'bar'
    },
    misread_question: {
      category: 'misread_question',
      title: 'Kurang Teliti Membaca Soal Cerita',
      description: 'Melewatkan informasi kunci atau pertanyaan akhir pada soal cerita.',
      socraticHint: 'Yuk baca kalimat terakhir soalnya sekali lagi: apa yang sebenarnya diminta untuk dicari?',
      remediationVisual: 'coins'
    },
    multi_step_reasoning_failure: {
      category: 'multi_step_reasoning_failure',
      title: 'Langkah Bertingkat Terlewat',
      description: 'Menyelesaikan langkah pertama tetapi lupa menyelesaikan langkah kedua pada soal HOTS.',
      socraticHint: 'Langkah pertamamu sudah tepat! Sekarang gunakan hasil tersebut untuk menjawab pertanyaan akhirnya.',
      remediationVisual: 'bar'
    },
    pattern_misunderstanding: {
      category: 'pattern_misunderstanding',
      title: 'Kekeliruan Pola Bilangan',
      description: 'Salah menebak aturan penambahan atau pengurangan antar suku pola.',
      socraticHint: 'Hitung selisih antara suku pertama dan kedua. Berapa loncatan angkanya?',
      remediationVisual: 'blocks'
    },
    misunderstood_concept: {
      category: 'misunderstood_concept',
      title: 'Miskonsepsi Pemahaman Dasar',
      description: 'Perlu memperkuat kembali pemahaman definisi dan konsep matematika dasar.',
      socraticHint: 'Yuk kita baca kembali definisi dan contoh konkretnya bersama-sama.',
      remediationVisual: 'blocks'
    },
    careless_error: {
      category: 'careless_error',
      title: 'Terburu-buru / Typo',
      description: 'Kesalahan memilih jawaban yang sangat dekat akibat kurang teliti.',
      socraticHint: 'Jangan terburu-buru, periksa kembali jawabanmu sebelum menekan tombol kirim.',
      remediationVisual: 'apples'
    }
  };

  public static diagnose(mistakeCategory: MistakeCategory): MistakeDiagnosis {
    return this.DIAGNOSIS_MAP[mistakeCategory] || this.DIAGNOSIS_MAP.calculation_error;
  }
}
