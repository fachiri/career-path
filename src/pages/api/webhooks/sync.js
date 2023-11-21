import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { data, type } = req.body
      
      if (type == 'user.created') {
        console.log('--- User created')
        await prisma.user.create({
          data: {
            clerkUserId: data.id,
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email_addresses[0].email_address,
            role: 'SISWA',
            schoolId: null
          }
        })
      }      

      return res.status(200).json({
        success: true,
        message: 'Sinkronisasi berhasil',
        error: {}
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