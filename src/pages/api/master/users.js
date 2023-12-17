import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.$queryRaw`
        SELECT u.*, s.name AS schoolName, s.npsn
        FROM User AS u
        LEFT JOIN School AS s ON u.schoolId = s.id
        WHERE u.role != 'ADMIN' AND u.schoolId IS NOT NULL;
      `;

      res.status(200).json({
        success: true,
        message: 'Fetch data berhasil',
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
  } else if (req.method === 'POST') {
    // try {
    //   const { code, name, personalityId, expertiseId } = req.body

    //   const career = await prisma.career.create({
    //     data: {
    //       code, name,
    //       personalityId: +personalityId,
    //       expertiseId: +expertiseId
    //     }
    //   });

    //   res.status(200).json({
    //     success: true,
    //     message: `Data <b>${career.name}</b> berhasil ditambahkan`,
    //     data: career
    //   });
    // } catch (error) {
    //   console.log(error)
    //   res.status(500).json({
    //     success: false,
    //     message: 'Internal Server Error',
    //     error
    //   });
    // }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}