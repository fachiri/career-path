import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // try {
    //   const statements = await prisma.statement.findMany();

    //   res.status(200).json({
    //     success: true,
    //     message: 'Fetch data berhasil',
    //     data: statements
    //   });
    // } catch (error) {
    //   console.log(error)
    //   res.status(500).json({
    //     success: false,
    //     message: 'Internal Server Error',
    //     error
    //   });
    // }
  } else if (req.method === 'POST') {
    try {
      const { careerId, statementId } = req.body

      const rule = await prisma.rule.create({
        data: {
          careerId: +careerId,
          statementId: +statementId,
        }
      });

      res.status(200).json({
        success: true,
        message: `Rule berhasil ditambahkan`,
        data: rule
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