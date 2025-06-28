import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

export default async function main() {
  await prisma.user.createMany({
    data: Array.from({ length: 25 }, () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      isEmailVerified: faker.datatype.boolean(),
      provider: faker.helpers.arrayElement([
        'EMAIL_PASSWORD',
        'GOOGLE',
        'GITHUB',
      ]),
    })),
  });

  await prisma.todo.createMany({
    data: Array.from({ length: 100 }, () => ({
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      completed: faker.datatype.boolean(),
      priority: faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH']),
      userId: faker.helpers.arrayElement([
        // TODO: after migration you should get users ids from db
        'cmcgfxeko0000td0ok4o13dj4',
        'cmcgfxekp0001td0oam42137b',
      ]),
    })),
  });
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
