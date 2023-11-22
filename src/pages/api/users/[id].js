import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: {
          clerkUserId: req.query.id
        }
      })

      return res.status(200).json({
        success: true,
        message: 'Data berhasil ditemukan',
        data: user
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