import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '@/lib/auth'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body

      if (email && password) {
        const user = await getUserByEmail(email)
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '7d' });

          return res.status(200).json({
            success: true,
            message: 'Login berhasil',
            data: {
              user,
              token
            }
          });
        }
      }

      return res.status(400).json({
        success: false,
        message: 'Email atau Password salah',
        error: {}
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