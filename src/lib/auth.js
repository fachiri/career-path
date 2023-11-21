import prisma from '@/lib/prisma';
import { serialize } from 'cookie'

export async function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  })
}

export const setAuthTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Setel ke true di lingkungan produksi (HTTPS)
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // Contoh: Sesuaikan sesuai kebutuhan
    path: '/', // Sesuaikan sesuai dengan path aplikasi Anda
  }

  res.setHeader('Set-Cookie', serialize('authToken', token, cookieOptions))
}