import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ''); // Remove all non-word characters
}

async function main() {
  console.log('Seeding Database...');
  const defaultPassword = await hash('123');
  const users = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
    password: defaultPassword,
  }));

  await prisma.user.createMany({
    data: users,
  });

  const posts = Array.from({ length: 400 }).map(() => ({
    title: faker.lorem.sentence(),
    slug: generateSlug(faker.lorem.sentence()),
    content: faker.lorem.paragraphs(3).slice(0, 180), // max 180 chars,
    thumbnail: faker.image.urlLoremFlickr({ height: 240, width: 320 }),
    authorId: faker.number.int({ min: 1, max: 10 }),
    published: true,
  }));

  for (const post of posts) {
    await prisma.post.create({
      data: {
        ...post,
        comments: {
          createMany: {
            data: Array.from({ length: 20 }).map(() => ({
              content: faker.lorem.sentence(),
              authorId: faker.number.int({ min: 1, max: 10 }),
            })),
          },
        },
      },
    });
  }

  console.log('Seeding Completed!');
}

main()
  .then(() => {
    prisma.$disconnect();
    process.exit(0);
  })
  .catch((e) => {
    prisma.$disconnect();
    console.error(e);
    process.exit(1);
  });
