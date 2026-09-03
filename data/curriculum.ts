import { LearningObjective, GradeLevel, MathDomain } from '@/types/math-os';

export const CURRICULUM_OBJECTIVES: LearningObjective[] = [
  // ==========================================
  // KELAS 1 (Fase A)
  // ==========================================
  {
    id: 'g1_bilangan_cacah_10',
    grade: 1,
    domain: 'bilangan',
    topic: 'Mengenal Bilangan 1-10',
    title: 'Menghitung Benda 1 sampai 10',
    description: 'Mampu membilang secara urut, memasangkan jumlah benda dengan simbol angka 1-10.',
    prerequisites: [],
    masteryTargetPercentage: 85,
    estimatedMinutes: 10,
    tags: ['angka_dasar', 'konkret', 'menghitung']
  },
  {
    id: 'g1_penjumlahan_sampai_10',
    grade: 1,
    domain: 'operasi_hitung',
    topic: 'Penjumlahan Sampai 10',
    title: 'Menjumlahkan Benda Menggabung',
    description: 'Memahami konsep penggabungan dua kelompok benda dengan hasil maksimal 10.',
    prerequisites: ['g1_bilangan_cacah_10'],
    masteryTargetPercentage: 85,
    estimatedMinutes: 12,
    tags: ['tambah_dasar', 'visual_apel']
  },
  {
    id: 'g1_pengurangan_sampai_10',
    grade: 1,
    domain: 'operasi_hitung',
    topic: 'Pengurangan Sampai 10',
    title: 'Pengurangan Benda Mengambil/Memisahkan',
    description: 'Memahami konsep sisa benda setelah diambil sebagian hingga bilangan 10.',
    prerequisites: ['g1_penjumlahan_sampai_10'],
    masteryTargetPercentage: 80,
    estimatedMinutes: 12,
    tags: ['kurang_dasar', 'visual_benda']
  },
  {
    id: 'g1_bangun_datar_dasar',
    grade: 1,
    domain: 'geometri',
    topic: 'Bentuk Bangun Datar',
    title: 'Mengenal Segitiga, Segiempat, Lingkaran',
    description: 'Mengidentifikasi benda-benda di sekitar yang berbentuk segitiga, segiempat, dan lingkaran.',
    prerequisites: [],
    masteryTargetPercentage: 80,
    estimatedMinutes: 10,
    tags: ['geometri_dasar', 'visual_bentuk']
  },
  {
    id: 'g1_pola_gambar',
    grade: 1,
    domain: 'aljabar_pola',
    topic: 'Pola Gambar Sederhana',
    title: 'Melanjutkan Pola Warna & Bentuk',
    description: 'Menemukan aturan pola berulang (misal: 🍎 🍌 🍎 🍌 ...) dan melanjutkannya.',
    prerequisites: ['g1_bangun_datar_dasar'],
    masteryTargetPercentage: 80,
    estimatedMinutes: 10,
    tags: ['pola_gambar', 'logika_anak']
  },

  // ==========================================
  // KELAS 2 (Fase A)
  // ==========================================
  {
    id: 'g2_nilai_tempat_ratusan',
    grade: 2,
    domain: 'bilangan',
    topic: 'Nilai Tempat Bilangan hingga 1000',
    title: 'Ratusan, Puluhan, dan Satuan',
    description: 'Menentukan nilai tempat dari bilangan 3 angka (contoh: 245 = 2 ratusan, 4 puluhan, 5 satuan).',
    prerequisites: ['g1_bilangan_cacah_10'],
    masteryTargetPercentage: 85,
    estimatedMinutes: 15,
    tags: ['nilai_tempat', 'ratusan_puluhan_satuan']
  },
  {
    id: 'g2_penjumlahan_bersusun',
    grade: 2,
    domain: 'operasi_hitung',
    topic: 'Penjumlahan Bersusun dengan Menyimpan',
    title: 'Penjumlahan Bersusun Hingga 100',
    description: 'Menyelesaikan penjumlahan 2 digit bersusun dengan teknik menyimpan 1 ke puluhan.',
    prerequisites: ['g2_nilai_tempat_ratusan', 'g1_penjumlahan_sampai_10'],
    masteryTargetPercentage: 80,
    estimatedMinutes: 15,
    tags: ['bersusun_simpan', 'operasi_hitung']
  },
  {
    id: 'g2_pengukuran_panjang_cm',
    grade: 2,
    domain: 'pengukuran',
    topic: 'Satuan Baku Panjang (cm & m)',
    title: 'Mengukur Benda dengan Penggaris',
    description: 'Membaca skala mistar/penggaris dalam centimeter dan membandingkan panjang benda.',
    prerequisites: [],
    masteryTargetPercentage: 80,
    estimatedMinutes: 12,
    tags: ['penggaris', 'cm_dan_m']
  },
  {
    id: 'g2_waktu_jam_analog',
    grade: 2,
    domain: 'pengukuran',
    topic: 'Membaca Jam Analog',
    title: 'Menentukan Waktu Tepat & Setengah Jam',
    description: 'Membaca jarum panjang dan pendek jam analog (pukul 07.00, pukul 08.30).',
    prerequisites: [],
    masteryTargetPercentage: 85,
    estimatedMinutes: 12,
    tags: ['jam_analog', 'waktu']
  },

  // ==========================================
  // KELAS 3 (Fase B)
  // ==========================================
  {
    id: 'g3_konsep_perkalian',
    grade: 3,
    domain: 'operasi_hitung',
    topic: 'Perkalian sebagai Penjumlahan Berulang',
    title: 'Konsep Dasar Perkalian',
    description: 'Memahami bahwa 4 × 3 = 3 + 3 + 3 + 3 = 12 menggunakan kelompok benda nyata.',
    prerequisites: ['g2_penjumlahan_bersusun'],
    masteryTargetPercentage: 90,
    estimatedMinutes: 15,
    tags: ['perkalian_dasar', 'tabel_perkalian']
  },
  {
    id: 'g3_konsep_pembagian',
    grade: 3,
    domain: 'operasi_hitung',
    topic: 'Pembagian sebagai Pengurangan Berulang',
    title: 'Konsep Dasar Pembagian',
    description: 'Memahami pembagian sebagai pembagian sama rata dan kebalikan perkalian (12 ÷ 3 = 4).',
    prerequisites: ['g3_konsep_perkalian'],
    masteryTargetPercentage: 85,
    estimatedMinutes: 15,
    tags: ['pembagian_dasar', 'berulang']
  },
  {
    id: 'g3_pecahan_sederhana',
    grade: 3,
    domain: 'pecahan',
    topic: 'Mengenal Pecahan Sederhana (1/2, 1/3, 1/4)',
    title: 'Konsep Pecahan Pembagi Benda Utuh',
    description: 'Mengenal pembilang dan penyebut pada bagian pizza/kue yang dibagi sama besar.',
    prerequisites: ['g3_konsep_pembagian'],
    masteryTargetPercentage: 85,
    estimatedMinutes: 15,
    tags: ['pecahan_visual', 'pembilang_penyebut']
  },
  {
    id: 'g3_mata_uang_rupiah',
    grade: 3,
    domain: 'pengukuran',
    topic: 'Nilai dan Kesetaraan Pecahan Uang',
    title: 'Menghitung Uang & Uang Kembalian',
    description: 'Menjumlahkan pecahan uang Rupiah dan menghitung uang kembalian saat berbelanja.',
    prerequisites: ['g2_penjumlahan_bersusun'],
    masteryTargetPercentage: 85,
    estimatedMinutes: 15,
    tags: ['uang_rupiah', 'belanja_kembalian']
  },

  // ==========================================
  // KELAS 4 (Fase B)
  // ==========================================
  {
    id: 'g4_keliling_luas_persegi',
    grade: 4,
    domain: 'geometri',
    topic: 'Keliling & Luas Persegi / Persegi Panjang',
    title: 'Menghitung Keliling dan Luas',
    description: 'Menerapkan rumus Keliling = 2×(p+l) dan Luas = p×l pada masalah kontekstual.',
    prerequisites: ['g3_konsep_perkalian'],
    masteryTargetPercentage: 85,
    estimatedMinutes: 18,
    tags: ['luas_persegi', 'keliling']
  },
  {
    id: 'g4_pecahan_senilai',
    grade: 4,
    domain: 'pecahan',
    topic: 'Pecahan Senilai & Membandingkan Pecahan',
    title: 'Menemukan Pecahan Senilai',
    description: 'Memahami bahwa 1/2 = 2/4 = 4/8 melalui perkalian/pembagian pembilang dan penyebut.',
    prerequisites: ['g3_pecahan_sederhana'],
    masteryTargetPercentage: 85,
    estimatedMinutes: 18,
    tags: ['pecahan_senilai', 'membandingkan_pecahan']
  },
  {
    id: 'g4_fpb_kpk_dasar',
    grade: 4,
    domain: 'operasi_hitung',
    topic: 'Faktor & Kelipatan (FPB & KPK)',
    title: 'Menentukan FPB dan KPK Sederhana',
    description: 'Menentukan faktor persekutuan terbesar dan kelipatan persekutuan terkecil dua bilangan.',
    prerequisites: ['g3_konsep_perkalian', 'g3_konsep_pembagian'],
    masteryTargetPercentage: 80,
    estimatedMinutes: 20,
    tags: ['fpb_kpk', 'pohon_faktor']
  },
  {
    id: 'g4_diagram_batang',
    grade: 4,
    domain: 'analisis_data',
    topic: 'Membaca & Menyajikan Diagram Batang',
    title: 'Membaca Data Diagram Batang',
    description: 'Menginterpretasikan informasi tabel frekuensi dan membaca diagram batang vertikal/horizontal.',
    prerequisites: [],
    masteryTargetPercentage: 85,
    estimatedMinutes: 15,
    tags: ['diagram_batang', 'membaca_data']
  },

  // ==========================================
  // KELAS 5 (Fase C)
  // ==========================================
  {
    id: 'g5_operasi_pecahan_beda_penyebut',
    grade: 5,
    domain: 'pecahan',
    topic: 'Penjumlahan & Pengurangan Pecahan Berbeda Penyebut',
    title: 'Menyamakan Penyebut Pecahan',
    description: 'Menyamakan penyebut menggunakan KPK sebelum menjumlahkan/mengurangkan pecahan (1/2 + 1/4 = 3/4).',
    prerequisites: ['g4_pecahan_senilai', 'g4_fpb_kpk_dasar'],
    masteryTargetPercentage: 85,
    estimatedMinutes: 20,
    tags: ['samakan_penyebut', 'kpk_pecahan']
  },
  {
    id: 'g5_desimal_dan_persen',
    grade: 5,
    domain: 'pecahan',
    topic: 'Konversi Pecahan, Desimal, dan Persen',
    title: 'Hubungan Pecahan, Desimal, dan Persentase',
    description: 'Mengubah 1/4 menjadi 0,25 dan 25% serta menerapkannya dalam diskon dan perbandingan.',
    prerequisites: ['g5_operasi_pecahan_beda_penyebut'],
    masteryTargetPercentage: 85,
    estimatedMinutes: 20,
    tags: ['desimal', 'persentase', 'diskon']
  },
  {
    id: 'g5_kecepatan_dan_debit',
    grade: 5,
    domain: 'pengukuran',
    topic: 'Perbandingan Besaran (Kecepatan & Debit)',
    title: 'Menghitung Kecepatan (Jarak / Waktu)',
    description: 'Memahami rumus Kecepatan = Jarak / Waktu dan Debit = Volume / Waktu.',
    prerequisites: ['g4_keliling_luas_persegi'],
    masteryTargetPercentage: 80,
    estimatedMinutes: 20,
    tags: ['kecepatan', 'jarak_waktu', 'debit']
  },
  {
    id: 'g5_volume_kubus_balok',
    grade: 5,
    domain: 'geometri',
    topic: 'Volume Bangun Ruang Kubus & Balok',
    title: 'Menghitung Volume Kubus dan Balok',
    description: 'Menghitung volume menggunakan kubus satuan dan rumus V = s³ atau V = p×l×t.',
    prerequisites: ['g4_keliling_luas_persegi'],
    masteryTargetPercentage: 85,
    estimatedMinutes: 18,
    tags: ['volume_balok', 'kubus_satuan']
  },

  // ==========================================
  // KELAS 6 (Fase C)
  // ==========================================
  {
    id: 'g6_bilangan_bulat_negatif',
    grade: 6,
    domain: 'bilangan',
    topic: 'Operasi Bilangan Bulat Negatif',
    title: 'Penjumlahan & Pengurangan Bilangan Bulat Negatif',
    description: 'Menggunakan garis bilangan untuk menyelesaikan operasi seperti -5 + 8 = 3 atau 4 - (-2) = 6.',
    prerequisites: ['g2_nilai_tempat_ratusan'],
    masteryTargetPercentage: 85,
    estimatedMinutes: 20,
    tags: ['bilangan_negatif', 'garis_bilangan']
  },
  {
    id: 'g6_lingkaran_keliling_luas',
    grade: 6,
    domain: 'geometri',
    topic: 'Unsur, Keliling, dan Luas Lingkaran',
    title: 'Menghitung Keliling dan Luas Lingkaran (πr²)',
    description: 'Menerapkan nilai π (22/7 atau 3,14) untuk menghitung keliling 2πr dan luas πr².',
    prerequisites: ['g4_keliling_luas_persegi', 'g5_desimal_dan_persen'],
    masteryTargetPercentage: 80,
    estimatedMinutes: 22,
    tags: ['lingkaran', 'pi_r_kuadrat', 'jari_jari']
  },
  {
    id: 'g6_statistika_mean_median_modus',
    grade: 6,
    domain: 'analisis_data',
    topic: 'Statistika Data (Mean, Median, Modus)',
    title: 'Menghitung Rata-rata, Nilai Tengah, & Nilai Terbanyak',
    description: 'Mencari Mean (rata-rata), Median (nilai tengah setelah diurutkan), dan Modus dari sekumpulan data.',
    prerequisites: ['g4_diagram_batang', 'g3_konsep_pembagian'],
    masteryTargetPercentage: 85,
    estimatedMinutes: 20,
    tags: ['mean', 'median', 'modus', 'statistika']
  },
  {
    id: 'g6_skala_dan_denah',
    grade: 6,
    domain: 'aljabar_pola',
    topic: 'Skala Peta dan Perbandingan Senilai',
    title: 'Menghitung Jarak Sebenarnya dari Skala Peta',
    description: 'Menggunakan rumus Skala = Jarak Peta : Jarak Sebenarnya untuk menyelesaikan soal cerita kontekstual.',
    prerequisites: ['g5_desimal_dan_persen'],
    masteryTargetPercentage: 80,
    estimatedMinutes: 20,
    tags: ['skala_peta', 'perbandingan_senilai']
  }
];

export class CurriculumEngine {
  public static getObjectivesByGrade(grade: GradeLevel): LearningObjective[] {
    return CURRICULUM_OBJECTIVES.filter((obj) => obj.grade === grade);
  }

  public static getObjectiveById(id: string): LearningObjective | undefined {
    return CURRICULUM_OBJECTIVES.find((obj) => obj.id === id);
  }

  public static getPrerequisites(objectiveId: string): LearningObjective[] {
    const obj = this.getObjectiveById(objectiveId);
    if (!obj) return [];
    return obj.prerequisites
      .map((id) => this.getObjectiveById(id))
      .filter((o): o is LearningObjective => o !== undefined);
  }

  public static checkPrerequisitesMet(
    objectiveId: string,
    masteries: Record<string, { score: number }>
  ): { ready: boolean; missingPrerequisites: LearningObjective[] } {
    const prereqs = this.getPrerequisites(objectiveId);
    const missing = prereqs.filter((p) => {
      const mastery = masteries[p.id];
      return !mastery || mastery.score < 60; // minimum 60% developing
    });

    return {
      ready: missing.length === 0,
      missingPrerequisites: missing
    };
  }
}
