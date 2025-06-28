import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

export default async function main() {
  await prisma.user.createMany({
    data: Array.from({ length: 50 }, () => ({
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
        'cmcgk14vu0000tdvoqsx2cwv3',
        'cmcgk14w40001tdvo2l2tyohs',
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
