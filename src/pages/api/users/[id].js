import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let school = null

      const user = await prisma.user.findUnique({
        where: {
          clerkUserId: req.query.id
        }
      })

      if (user) {
        school = await prisma.school.findUnique({
          where: {
            id: user.schoolId
          }
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Data berhasil ditemukan',
        data: {
          user,
          school
        }
      });
    } catch (error) {
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