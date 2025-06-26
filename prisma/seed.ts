import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export default async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: 'john@example.com',
        name: 'john doe',
        password: 'password',
      },
      {
        email: 'jane@example.com',
        name: 'jane doe',
        password: 'password',
      },
    ],
  });
  console.log('Seeding database...');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
