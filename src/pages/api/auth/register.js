import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { npsn, firstName, lastName, email, role, password } = req.body;

    try {
      const school = await prisma.school.upsert({
        where: { npsn },
        update: {},
        create: {
          npsn,
          name: npsn
        }
      });

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          role,
          password: await bcrypt.hash(password, 10),
          schoolId: school.id
        }
      })

      res.status(200).json({
        success: true,
        message: 'Registrasi berhasil',
        data: user
      });
    } catch (error) {
      if (error.code == 'P2002' && error.meta.target == 'User_email_key') {
        return res.status(422).json({
          success: false,
          message: 'Email sudah dipakai',
          error
        });
      }

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