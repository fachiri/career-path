const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const personalities = [
    {
      code: 'K01',
      name: 'Realistik',
      desc: `Preferensinya pada aktivitas-aktivitas yang memerlukan
      manipulasi eksplisit, teratur, atau sistematik terhadap objek-objek ,
      alat, mesin dan binatang. Karakteristik dari tipe kepribadian ini
      adalah kemampuan mekanikal, psikomotor, dan atletik yang baik,
      jujur, setia, suka kegiatan-kegiatan di luar, lebih suka bekerja
      dengan mesin, alat-alat,tumbuhan, dan hewan. Lebih menyukai
      kegiatan-kegiatan bersifat fisik, lebih menyukai tugas-tugas
      kongkrit, tidak terlalu suka bersosialisasi, dan tidak suka hal-hal
      yang kompleks (lebih menyukai kesederhanaan). Menyukai
      aktivitas-aktivitas kerja yang bersifat praktis, cepat menangkap
      masalah dan mencari solusinya.`
    },
    {
      code: 'K02',
      name: 'Investigatif',
      desc: `Memiliki preferensi untuk aktivitas-aktivitas yang memerlukan
      penyelidikan observasional, simbolik, sistematik dan kreatif
      terhadap fenomena fisik, biologis, kulturas agar dapat memahami
      dan mengontrol fenomena tersebut, dan tidak menyukai aktivitasaktivitas persuasif, sosial, dan repetitif. Karakteristik dari
      kepribadian ini adalah kemampuan memecahkan masalah dan
      analitis yang baik, cenderung berpikir matematis, suka
      mengobservasi, mempelajari, dan mengevaluasi, lebih suka
      bekerja sendiri, pemberi ide, hati-hati, kritis, dan selalu ingin tahu,
      suka kedisiplinan, berorientasi tugas dan sistematis.`
    },
    {
      code: 'K03',
      name: 'Artistik',
      desc: `Memiliki preferensi pada aktivitas-aktivitas yang beragam, bebas,
      dan tidak sistematis untuk menciptakan produk-produk artistik,
      seperti lukisan, drama, karangan. Tipe ini menyukai aktivitasaktivitas yang sistematik, teratur, dan rutin. Karakteristik
      kepribadian ini adalah berpikir abstrak, menyukai estetika
      (keindahan), kreatif, suka hal-hal kompleks, emosional, intuitif,
      ideal, lebih suka bekerja secara mandiri, suka menyanyi, menulis,
      berakting, melukis, imaginatif, tidak suka hal-hal yang
      konvensional, tidak dapat diduga dan tidak suka keteraturan`
    },
    {
      code: 'K04',
      name: 'Sosial',
      desc: `Memiliki preferensi pada aktivitas-aktivitas yang melibatkan
      orang-orang lain dengan penekanan pada membantu, mengajar,
      atau menyediakan bantuan. Tidak menyukai aktivitas-aktivitas
      rutin dan sistematik yang melibatkan objek dan materi.
      Karakteristik dari tipe kerpibadian ini adalah komunikatif,
      bersahabat, mudah bergaul, suka memberi dan membantu, baik,
      impulsive, bertanggung jawab, berjiwa kelompok, mempunyai
      toleransi yang cukup baik, dapat memahami dan memiliki
      kemampuan verbal dan personal yang baik.`
    },
    {
      code: 'K05',
      name: 'Enterprising',
      desc: `Memiliki preferensi pada aktivitas-aktivitas yang melibatkan
      manipulasi terhadap orang-orang lain untuk perolehan ekonomik
      atau tujuan-tujuan organisasi. Tidak menyukai aktivitas yang
      sistematik, abstrak dan ilmiah. Kompetensi kepemimpinan,
      persuasif dan yang bersifat supervisi dikembangkan, dan yang
      ilmiah diabaikan. Karakteristik dari tipe kepribadian ini adalah
      peraya diri, mudah beradaptasi, ambisius, kemampuan berbicara
      dan memimpin yang baik, suka pengaruh seseorang, kemampuan
      interpersonal yang cukup baik, penuh energi, optimis, persuasif,
      suka mengambil resiko, spontan dan suka mengontrol`
    },
    {
      code: 'K06',
      name: 'Konvensional',
      desc: `Memiliki preferensi pada aktivitas yang memerlukan manipulasi
      data yang eksplisit, teratur, dan sistematik guna memberikan
      konstribusi kepada tujuan organisasi. Tidak menyukai aktivitas
      yang tidak pasti, bebas dan tidak sistematik. Karakteristik dari tipe
      kerpibadian ini adalah tergantung kepada orang lain, tidak kreatif,
      suka kedisiplinan dan ketepatan, suka memperhatikan detail,
      efisien, melaksanakan tugas secara teratur, kemampuan numerical
      yang baik, terorganisir, stabil dan bersifat tradisional. Individu ini
      menunjukkan
      ketidaksukaan terhadap aktivitasyang tidak terstruktur. `
    }
  ]

  personalities.forEach(async personalitiy => {
    const data = await prisma.personality.upsert({
      where: { code: personalitiy.code },
      update: {},
      create: {
        code: personalitiy.code,
        name: personalitiy.name,
        desc: personalitiy.desc
      },
    })

    console.log(data)
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })