import { LessonContent } from '@/types/math-os';

export const LESSON_CONTENTS: Record<string, LessonContent> = {
  g1_bilangan_cacah_10: {
    id: 'lesson_g1_bilangan_10',
    objectiveId: 'g1_bilangan_cacah_10',
    grade: 1,
    title: 'Mengenal Angka 1 sampai 10 dengan Buah-buahan',
    explanation: {
      hook: 'Berapa banyak buah apel merah manis yang ada di keranjang?',
      concept: 'Setiap benda yang kita hitung memiliki lambang angka. Kita membilang mulai dari 1 (satu), 2 (dua), 3 (tiga), sampai 10 (sepuluh)!',
      visualType: 'apples',
      visualData: { count: 5, emoji: '🍎' },
      examples: [
        {
          problem: 'Ada 3 buah apel di piring dan 2 buah apel di meja. Berapa total apel?',
          stepByStep: [
            '1. Hitung apel di piring: 🍎 🍎 🍎 (ada 3)',
            '2. Lanjutkan hitung apel di meja: 🍎 🍎 (empat, lima)',
            '3. Jadi total semuanya ada 5 apel!'
          ],
          conclusion: '3 apel ditambah 2 apel sama dengan 5 apel (3 + 2 = 5).'
        }
      ]
    },
    remediationTip: 'Gunakan jari tangan atau kancing baju untuk menyentuh dan membilang satu per satu.'
  },

  g1_penjumlahan_sampai_10: {
    id: 'lesson_g1_penjumlahan_10',
    objectiveId: 'g1_penjumlahan_sampai_10',
    grade: 1,
    title: 'Menjumlahkan Benda Menggabung',
    explanation: {
      hook: 'Kelinci punya 4 wortel 🥕, lalu Ibu Kelinci memberi 3 wortel lagi. Sekarang berapa wortelnya?',
      concept: 'Penjumlahan adalah menggabungkan dua kumpulan benda menjadi satu kesatuan yang lebih banyak.',
      visualType: 'blocks',
      visualData: { left: 4, right: 3, total: 7 },
      examples: [
        {
          problem: 'Hitung: 4 + 3 = ...',
          stepByStep: [
            '1. Mulai dari angka yang lebih besar: 4',
            '2. Hitung maju sebanyak 3 langkah: 5, 6, 7',
            '3. Kita sampai di angka 7!'
          ],
          conclusion: '4 + 3 = 7'
        }
      ]
    },
    remediationTip: 'Ingat trik menyimpan angka besar di kepala, lalu buka jari sebanyak angka kecil untuk hitung maju.'
  },

  g2_nilai_tempat_ratusan: {
    id: 'lesson_g2_nilai_tempat',
    objectiveId: 'g2_nilai_tempat_ratusan',
    grade: 2,
    title: 'Memahami Ratusan, Puluhan, dan Satuan',
    explanation: {
      hook: 'Mengapa angka 2 pada bilangan 25 berbeda nilainya dengan angka 2 pada bilangan 250?',
      concept: 'Nilai angka ditentukan oleh posisinya! Angka di paling kanan adalah Satuan (1), di tengah adalah Puluhan (10), dan di kiri adalah Ratusan (100).',
      visualType: 'grid',
      visualData: { ratusan: 3, puluhan: 4, satuan: 5 },
      examples: [
        {
          problem: 'Bilangan 345 terdiri dari:',
          stepByStep: [
            '1. Angka 3 di tempat ratusan bernilai 300',
            '2. Angka 4 di tempat puluhan bernilai 40',
            '3. Angka 5 di tempat satuan bernilai 5',
            '4. 300 + 40 + 5 = 345'
          ],
          conclusion: '345 = 3 Ratusan + 4 Puluhan + 5 Satuan.'
        }
      ]
    },
    remediationTip: 'Selalu baca nilai tempat dari kiri ke kanan: Ratusan ➔ Puluhan ➔ Satuan.'
  },

  g3_konsep_perkalian: {
    id: 'lesson_g3_perkalian',
    objectiveId: 'g3_konsep_perkalian',
    grade: 3,
    title: 'Perkalian adalah Penjumlahan Berulang',
    explanation: {
      hook: 'Ada 4 piring donat 🍩. Setiap piring berisi 3 donat. Bagaimana cara cepat menghitung seluruh donat?',
      concept: 'Daripada menjumlahkan satu per satu, kita bisa mengalikan: Jumlah Wadah × Isi Tiap Wadah (4 × 3 = 3 + 3 + 3 + 3 = 12).',
      visualType: 'blocks',
      visualData: { groups: 4, itemsPerGroup: 3 },
      examples: [
        {
          problem: 'Berapa hasil dari 5 × 4?',
          stepByStep: [
            '1. Artinya ada 5 kelompok angka 4',
            '2. Tulis penjumlahan: 4 + 4 + 4 + 4 + 4',
            '3. 4 + 4 = 8; 8 + 4 = 12; 12 + 4 = 16; 16 + 4 = 20',
            '4. Hasilnya adalah 20'
          ],
          conclusion: '5 × 4 = 20'
        }
      ]
    },
    remediationTip: 'Hati-hati: 4 × 3 artinya 3-nya ada 4 kali (3+3+3+3), bukan 4+4+4.'
  },

  g4_keliling_luas_persegi: {
    id: 'lesson_g4_keliling_luas',
    objectiveId: 'g4_keliling_luas_persegi',
    grade: 4,
    title: 'Membedakan Keliling dan Luas',
    explanation: {
      hook: 'Jika kita memasang pagar di sekeliling taman, apakah itu menghitung keliling atau luas?',
      concept: 'Keliling adalah panjang garis tepi yang mengelilingi bangun (seperti pagar). Luas adalah besar area permukaan di dalam bangun (seperti rumput taman).',
      visualType: 'grid',
      visualData: { panjang: 6, lebar: 4 },
      examples: [
        {
          problem: 'Persegi panjang memiliki panjang 6 cm dan lebar 4 cm. Hitung keliling dan luasnya!',
          stepByStep: [
            '1. Keliling = 2 × (Panjang + Lebar) = 2 × (6 + 4) = 2 × 10 = 20 cm',
            '2. Luas = Panjang × Lebar = 6 × 4 = 24 cm²'
          ],
          conclusion: 'Keliling = 20 cm, Luas = 24 cm² (ingat satuan luas ada tanda pangkat 2 / cm²).'
        }
      ]
    },
    remediationTip: 'Keliling = Pagar (tambah semua sisi tepi), Luas = Karpet (kalikan panjang dengan lebar).'
  },

  g5_operasi_pecahan_beda_penyebut: {
    id: 'lesson_g5_pecahan_beda_penyebut',
    objectiveId: 'g5_operasi_pecahan_beda_penyebut',
    grade: 5,
    title: 'Menjumlahkan Pecahan Berbeda Penyebut',
    explanation: {
      hook: 'Bolehkah kita menghitung 1/2 pizza + 1/4 pizza menjadi 2/6 pizza? Mengapa salah?',
      concept: 'Ukuran potongan pizza berbeda! 1/2 adalah potongan besar, 1/4 potongan kecil. Sebelum dijumlahkan, kita wajib menyamakan ukuran potongan (penyebut) dengan mencari KPK!',
      visualType: 'pizza',
      visualData: { fractionA: '1/2', fractionB: '1/4', commonDenominator: 4 },
      examples: [
        {
          problem: 'Hitung: 1/2 + 1/4 = ...',
          stepByStep: [
            '1. Cari KPK dari penyebut 2 dan 4. KPK(2, 4) = 4.',
            '2. Ubah 1/2 menjadi pecahan senilai dengan penyebut 4: (1×2)/(2×2) = 2/4.',
            '3. Sekarang jumlahkan pembilangnya: 2/4 + 1/4 = (2 + 1)/4 = 3/4.'
          ],
          conclusion: '1/2 + 1/4 = 3/4'
        }
      ]
    },
    remediationTip: 'JANGAN PERNAH menambahkan penyebut! Penyebut hanya disamakan, yang dijumlahkan HANYA pembilangnya.'
  },

  g6_bilangan_bulat_negatif: {
    id: 'lesson_g6_bilangan_negatif',
    objectiveId: 'g6_bilangan_bulat_negatif',
    grade: 6,
    title: 'Memahami Bilangan Bulat Negatif dengan Garis Bilangan',
    explanation: {
      hook: 'Suhu di kutub adalah 5 derajat di bawah nol (-5°C). Jika suhu naik 8°C, berapakah suhu sekarang?',
      concept: 'Garis bilangan memiliki titik nol di tengah. Ke kanan bernilai POSITIF (+), ke kiri bernilai NEGATIF (-). Menambah artinya bergerak ke kanan, mengurang artinya bergerak ke kiri.',
      visualType: 'bar',
      visualData: { start: -5, jump: 8, result: 3 },
      examples: [
        {
          problem: 'Hitung: -5 + 8 = ...',
          stepByStep: [
            '1. Berdiri di titik -5 pada garis bilangan.',
            '2. Karena ditambah (+8), melangkah maju ke kanan sebanyak 8 langkah.',
            '3. Melangkah 5 langkah sampai di 0, sisa 3 langkah lagi sampai di +3.'
          ],
          conclusion: '-5 + 8 = 3'
        }
      ]
    },
    remediationTip: 'Bayangkan hutang dan uang saku: Hutang 5 ribu (-5), dibayar 8 ribu (+8), sisa uang saku 3 ribu (+3).'
  }
};
