import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const personalities = await prisma.personality.findMany();

      res.status(200).json({
        success: true,
        message: 'Fetch data berhasil',
        data: personalities
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