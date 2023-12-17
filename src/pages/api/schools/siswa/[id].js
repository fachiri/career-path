import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let users = await prisma.user.findMany({
        where: {
          schoolId: +req.query.id,
          pendingRole: 'SISWA'
        },
      })

      const fetchLatestHistory = async (user) => {
        return await prisma.history.findFirst({
          where: {
            userId: user.id,
          },
          orderBy: { date: 'desc' },
          take: 1,
          include: {
            historyCareers: {
              include: {
                career: {
                  select: {
                    name: true,
                    personality: true,
                    expertise: true,
                  }
                },
              },
            },
          },
        });
      };

      for (const user of users) {
        const latestHistory = await fetchLatestHistory(user);
        user['careers'] = latestHistory?.historyCareers || [];
      }

      console.log(users)

      return res.status(200).json({
        success: true,
        message: 'Data berhasil ditemukan',
        data: users
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