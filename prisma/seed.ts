import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insert 100 random users
  const users = Array.from({ length: 100 }).map(() => ({
    email: faker.internet.email(),
    name: faker.person.fullName(), // Updated from faker.name.fullName() to faker.person.fullName()
    posts: {
      create: [
        {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
          published: faker.datatype.boolean(),
        },
      ],
    },
  }));

  await Promise.all(
    users.map((user) =>
      prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      }),
    ),
  );

  console.log('Inserted 100 random users');
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
