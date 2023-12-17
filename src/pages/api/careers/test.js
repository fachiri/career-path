import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { facts, index } = req.body

      const careers = await prisma.career.findMany({
        include: {
          personality: {
            select: {
              id: true,
              name: true,
              desc: true
            }
          },
          expertise: {
            select: {
              id: true,
              name: true
            }
          },
          rules: {
            select: {
              statement: true,
            }
          }
        }
      });

      let data = {
        statements: [],
        careers: []
      }

      let uniqueCodes = new Set();

      careers.forEach(career => {
        if (career.rules[index]?.statement) {
          const code = career.rules[index].statement.code;

          if (!uniqueCodes.has(code)) {
            uniqueCodes.add(code);

            data.statements.push({
              code: code,
              desc: career.rules[index].statement.desc
            });
          }
        }

        if (facts && Object.keys(facts).length > 0 && career.rules.length > 0) {
          const allCodesInFacts = career.rules.every(rule => {
            const statementCode = rule.statement.code;
            return facts[statementCode] === 'true';
          });

          if (allCodesInFacts) {
            data.careers.push({
              id: career.id,
              code: career.code,
              name: career.name,
              expertise: career.expertise.name,
              personality: career.personality.name,
              personalityDesc: career.personality.desc,
            });
          }
        }
      });

      res.status(200).json({
        success: true,
        message: 'Fetch data berhasil',
        data
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