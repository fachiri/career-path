import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      console.log(req.query.id)
      const user = await prisma.user.update({
        where: {
          id: +req.query.id,
        },
        data: {
          role: req.body.role,
          schoolStatus: 'VERIFIED'
        }
      })

      return res.status(200).json({
        success: true,
        message: 'Data berhasil diupdate',
        data: user
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