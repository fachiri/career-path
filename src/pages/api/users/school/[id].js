import prisma from '@/lib/prisma';
import multer from 'multer';

export const config = {
  api: {
    bodyParser: false,
  },
};

const randomFilename = (originalname) => {
  const extension = originalname.split('.').pop()
  const uniqueSuffix = `${Date.now()}${Math.round(Math.random() * 1E9)}`

  return `${uniqueSuffix}.${extension}`
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/sk/'); 
  },
  filename: function (req, file, cb) {
    cb(null, randomFilename(file.originalname))
  }
})

const upload = multer({ storage: storage })

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let school = null

      const user = await prisma.user.findUnique({
        where: {
          clerkUserId: req.query.id
        }
      })

      if (user?.schoolId) {
        school = await prisma.school.findUnique({
          where: {
            id: user.schoolId
          }
        })

        return res.status(200).json({
          success: true,
          message: 'Data berhasil ditemukan',
          data: {
            school,
            user
          }
        });
      }

      res.status(404).json({
        success: false,
        message: 'Data tidak ditemukan',
        error: {}
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error
      });
    }
  } else if (req.method === 'PUT') {
    try {
      upload.single('file')(req, res, async function (err) {
        const { name, npsn, role } = req.body

        if (err) {
          console.error(err);
          return res.status(500).json({
            success: false,
            message: 'Error handling file',
            error: err,
          });
        }

        const school = await prisma.school.upsert({
          where: { npsn },
          update: {},
          create: {
            npsn,
            name
          }
        });

        const user = await prisma.user.update({
          where: {
            clerkUserId: req.query.id
          },
          data: {
            schoolId: school.id,
            schoolStatus: 'PENDING',
            pendingRole: role,
            sk: req.file.filename
          }
        })

        return res.status(200).json({
          success: true,
          message: 'Data berhasil diupdate',
          data: user
        });

      })
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