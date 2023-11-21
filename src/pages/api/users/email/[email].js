import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const userEmail = req.query.email;

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json({ success: true, user });
      }
    } catch (error) {
      console.error('Error fetching user by email:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
