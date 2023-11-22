import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const expertices = await prisma.expertise.findMany();

      res.status(200).json({
        success: true,
        message: 'Fetch data berhasil',
        data: expertices
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { name } = req.body;

      const expertise = await prisma.expertise.create({ data: { name } });

      res.status(200).json({
        success: true,
        message: `Data <b>${expertise.name}</b> berhasil ditambahkan`,
        data: expertise
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