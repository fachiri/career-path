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

  const statements = [
    { code: 'D001', desc: 'Saya terampil menggunakan peralatan multimedia' },
    { code: 'D002', desc: 'Saya terampil menggunakan alat bantu fotografi' },
    { code: 'D003', desc: 'Saya mengenal alat bantu lighting dan fungsinya' },
    { code: 'D004', desc: 'Saya terampil mengoperasikan software dan periferal digital audio, digital video, dan visual effects' },
    { code: 'D005', desc: 'Saya terampil mengoperasikan software dan periferal digital illustration, digital imaging' },
    { code: 'D006', desc: 'Saya terampil dalam mengoperasikan software dan periferal multimedia, presentation, 2D animation, dan 3D animation' },
    { code: 'D007', desc: 'Saya terampil dalam pembuatan film pendek, dokumenter dan lainnya' },
    { code: 'D008', desc: 'Saya dapat membaca cetak biru gambar bangunan' },
    { code: 'D009', desc: 'Saya dapat memperbaiki perabot rumah tangga' },
    { code: 'D010', desc: 'Saya dapat menggambar teknik (proyeksi, perpektif)' },
    { code: 'D011', desc: 'Saya terampil dalam design grafis' },
    { code: 'D012', desc: 'Saya terampil dalam pembuatan logo, banner, iklan, baliho dan plakat lainnya' },
    { code: 'D013', desc: 'Saya mampu memperbaiki camera dan peralatan fotografi lainnya' },
    { code: 'D014', desc: 'Saya mempunyai keterampilan dalam proses pra produksi Produksi sampai pasca produksi bidang multimedia' },
    { code: 'D015', desc: 'Saya dapat menginstalasi administrasi server outentikasi' },
    { code: 'D016', desc: 'Saya dapat menyebutkan jenis makanan yang mengandung protein tinggi' },
    { code: 'D017', desc: 'Saya memahami tentang gelombang elektromagnetik' },
    { code: 'D018', desc: 'Saya mengerti arti waktu paroh (setengah umur) elemen radioaktif' },
    { code: 'D019', desc: 'Saya dapat memprogram computer' },
    { code: 'D020', desc: 'Saya dapat terampil membangun dan konfigurasi jaringan nirkabel' },
    { code: 'D021', desc: 'Saya dapat menjelaskan prosedur metode statistika' },
    { code: 'D022', desc: 'Saya dapat mengoperasikan router board mikrotik' },
    { code: 'D023', desc: 'Saya terampil dalam mengistalasi system keaman computer' },
    { code: 'D024', desc: 'Saya mampu mengatur band width dan file sharing' },
    { code: 'D025', desc: 'Saya mampu merancang bangun LAN dan WAN' },
    { code: 'D026', desc: 'Saya terampil dalam merancang web database untuk content server' },
    { code: 'D027', desc: 'Saya terampil dalam instalasi web server' },
    { code: 'D028', desc: 'Saya mahir merakit komputer dan itegrator komputer' },
    { code: 'D029', desc: 'Saya dapat memahami arti rumus kimia sederhana' },
    { code: 'D030', desc: 'Saya dapat menjelaskan kenapa satelit buatan tidak tauh ke bumi' },
    { code: 'D031', desc: 'Saya pernah berpartisipasi dalam lomba karya ilmiah' },
    { code: 'D032', desc: 'Saya dapat memainkan instrumen musik (guitar, piano, seruling, harmonika)' },
    { code: 'D033', desc: 'Saya mampu menyanyi dalam paduan suara' },
    { code: 'D034', desc: 'Saya pernah memimpin suatu organisasi (pelajar, mahasiswa, pemuda)' },
    { code: 'D035', desc: 'Saya dapat membimbing dan mengawasi karyawan (teman) bekerja' },
    { code: 'D036', desc: 'Saya memiliki semangat yang kuat untuk berusaha' },
    { code: 'D037', desc: 'Saya dapat mempengaruhi orang lain agar bekerja menurut yang saya ingini' },
    { code: 'D038', desc: 'Saya mampu menjadi penjual barang yang sukses' },
    { code: 'D039', desc: 'Saya pernah memimpin delegasi perundingan' },
    { code: 'D040', desc: 'Saya pernah memimpin suatu kelompok usaha' },
    { code: 'D041', desc: 'Saya terampil meyakinkan orang agar membeli suatu barang' },
    { code: 'D042', desc: 'Saya dapat hidup mandiri (tanpa bantuan orang lain)' },
    { code: 'D043', desc: 'Saya dapat mengetik kata per menit' },
    { code: 'D044', desc: 'Saya dapat mengoperasikan mesin stensil atau mesin hitung' },
    { code: 'D045', desc: 'Saya dapat menulis dan membaca steno' },
    { code: 'D046', desc: 'Saya dapat mengarsipkan surat dan laporan dengan tertib' },
    { code: 'D047', desc: 'Saya pernah menjadi pegawai kantor (tukang ketik, pemegang buku)' },
    { code: 'D048', desc: 'Saya dapat menyusun buku neraca' },
    { code: 'D049', desc: 'Saya dapat memilih dan membalas surat dalam waktu yang singkat' },
    { code: 'D050', desc: 'Saya terampil memakai kalkulator' },
    { code: 'D051', desc: 'Saya terampil memakai komputer' },
    { code: 'D052', desc: 'Saya terampil membukukan hutang piutang' },
    { code: 'D053', desc: 'Saya cermat mencatat hasil penjualan atau pembayaran' },
    { code: 'D054', desc: 'Saya mampu menjadi tutor untuk pelatihan marketing' },
    { code: 'D055', desc: 'Saya mengerti tentang SQL Injection' },
    { code: 'D056', desc: 'Saya memiliki modal untuk membuka usaha' },
    { code: 'D057', desc: 'Saya dapat memahami prinsip-prinsip bisnis' },
    { code: 'D058', desc: 'Saya mampu melihat peluang' },
    { code: 'D059', desc: 'Saya mampu menata produk dengan baik' },
    { code: 'D060', desc: 'Saya mampu melakukan negosiasi dengan baik' },
    { code: 'D061', desc: 'Saya dapat melaksanakan konfirmasi keputusan pelanggan' },
    { code: 'D062', desc: 'Saya dapat melaksanakan proses administrasi transaksi' },
    { code: 'D063', desc: 'Saya mampu melakukan penyerahan/pengiriman produk' },
    { code: 'D064', desc: 'Saya mampu melaksanakan penagihan pembayaran' },
    { code: 'D065', desc: 'Saya mampu menemukan kesalahan dalam pembukuan suatu perusahaan' },
    { code: 'D066', desc: 'Saya bisa mengkonfigurasi printer wifi' },
    { code: 'D067', desc: 'Saya dapat melaksanakan pelayanan prima (Service excellent)' },
    { code: 'D068', desc: 'Saya mampu membuka usaha eceran/retail (Expansion store opening)' },
    { code: 'D069', desc: 'Saya dapat melakukan pemasaran barang dan jasa' },
    { code: 'D070', desc: 'Saya dapat menyusun buku neraca' },
    { code: 'D071', desc: 'Saya terampil memakai kalkulator' },
    { code: 'D072', desc: 'Saya terampil menganalisi dan mengaudit laporan keuangan perusahaan' },
    { code: 'D073', desc: 'Saya mampu menganalisis kesalahan pada aplikasi' },
    { code: 'D074', desc: 'Saya cermat mencatat hasil penjualan atau pembayaran' },
    { code: 'D075', desc: 'Saya dapat mengetik 10 jari dan steno' },
    { code: 'D076', desc: 'Saya dapat mengoperasikan Komputer' },
    { code: 'D077', desc: 'Saya memiliki kemampuan berkomunikasi dan mengelola informasi' },
    { code: 'D078', desc: 'Saya memiliki ketrampilan dalam surat menyurat (Korespondensi)' },
    { code: 'D079', desc: 'Saya terampil mengelola Arsip dan entry data' },
    { code: 'D080', desc: 'Saya memiliki kemampuan Manajerial' },
    { code: 'D081', desc: 'Saya dapat bekerja sama dengan Tim' },
    { code: 'D082', desc: 'Saya dapat menggunakan teknologi peralatan kantor' },
    { code: 'D083', desc: 'Saya memiliki penggandaan dokumen dan presentasi' },
    { code: 'D084', desc: 'Saya dapat menangani (Handle) Kegiatan Pimpinan' },
    { code: 'D085', desc: 'Saya mampu mengkonfigurasi database system' },
    { code: 'D086', desc: 'Saya terampil dalam pembuatan aplikasi web dan desktop' },
    { code: 'D087', desc: 'Saya terampil dalam menganalisis sebuah system' },
    { code: 'D088', desc: 'Saya memahami metode waterfall dan prototype' },
    { code: 'D089', desc: 'Saya memahami sistem komputer dan jaringan' },
    { code: 'D090', desc: 'Saya terampil dalam pembuatan robotic' }
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

  statements.forEach(async statement => {
    const data = await prisma.statement.upsert({
      where: { code: statement.code },
      update: {},
      create: {
        code: statement.code,
        desc: statement.desc
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