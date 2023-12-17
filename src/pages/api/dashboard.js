import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const siswaCount = await prisma.user.count({
        where: {
          role: 'SISWA',
        },
      });
      const guruCount = await prisma.user.count({
        where: {
          role: 'GURU',
        },
      });
      const kepsekCount = await prisma.user.count({
        where: {
          role: 'KEPSEK',
        },
      });
      const sekolahCount = await prisma.school.count();

      res.status(200).json({
        success: true,
        message: 'Fetch data berhasil',
        data: {
          siswaCount,
          guruCount,
          kepsekCount,
          sekolahCount
        }
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { userId, careerIds } = req.body

      const history = await prisma.history.create({
        data: {
          userId,
          date: new Date()
        }
      });

      for (const careerId of careerIds) {
        await prisma.historyCareer.create({
          data: {
            historyId: history.id,
            careerId,
          },
        });
      }

      res.status(200).json({
        success: true,
        message: `Data berhasil disimpan`,
        data: history
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error
      });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}