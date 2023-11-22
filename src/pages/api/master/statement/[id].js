import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // try {
    //   let school = null

    //   const user = await prisma.user.findUnique({
    //     where: {
    //       clerkUserId: req.query.id
    //     }
    //   })
      
    //   if (user?.schoolId) {
    //     school = await prisma.school.findUnique({
    //       where: {
    //         id: user.schoolId
    //       }
    //     })

    //     return res.status(200).json({
    //       success: true,
    //       message: 'Data berhasil ditemukan',
    //       data: {
    //         school,
    //         user
    //       }
    //     });
    //   }

    //   res.status(404).json({
    //     success: false,
    //     message: 'Data tidak ditemukan',
    //     error: {}
    //   });
    // } catch (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Internal Server Error',
    //     error
    //   });
    // }
  } else if (req.method === 'PUT') {
    try {
      const { code, desc } = req.body

      const statement = await prisma.statement.update({
        where: {
          id: +req.query.id
        },
        data: {
          code, desc,
        }
      })

      return res.status(200).json({
        success: true,
        message: 'Data berhasil diupdate',
        data: statement
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error
      });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.statement.delete({ where: { id: +req.query.id } })

      return res.status(200).json({
        success: true,
        message: 'Data berhasil dihapus',
        data: {}
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