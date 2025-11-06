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
  console.log('🌱 Seeding Database...');
  const defaultPassword = await hash('123');

  // Create 10 users
  const users = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
    password: defaultPassword,
  }));

  await prisma.user.createMany({ data: users });

  // Create 40 posts, each with 3 comments
  const posts = Array.from({ length: 40 }).map(() => ({
    title: faker.lorem.sentence(),
    slug: generateSlug(faker.lorem.sentence()),
    content: faker.lorem.paragraphs(2).slice(0, 150),
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
            data: Array.from({ length: 3 }).map(() => ({
              content: faker.lorem.paragraphs(2).slice(0, 150),
              authorId: faker.number.int({ min: 1, max: 10 }),
            })),
          },
        },
      },
    });
  }

  console.log('✅ Seeding Completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
