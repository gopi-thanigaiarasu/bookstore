import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding database...");

  try {
    await prisma.book.deleteMany();
    await prisma.author.deleteMany();

    const authors = await Promise.all([
      prisma.author.create({
        data: { name: "Jiang Rong", bio: "Jiang Rong is a Chinese writer" },
      }),
      prisma.author.create({
        data: { name: "Alex Haley", bio: "Alex Haley is an American writer" },
      }),
    ]);

    const books = await Promise.all([
      prisma.book.create({
        data: {
          title: "Wolf Totem",
          authorId: authors[0].id,
          description:
            "Wolf Totem is a novel by Jiang Rong, published in 2004.",
          publishedYear: 2004,
        },
      }),
      prisma.book.create({
        data: {
          title: "Roots: The Saga of an American Family",
          authorId: authors[1].id,
          description: "Roots is a novel by Alex Haley, published in 1976.",
          publishedYear: 1976,
        },
      }),
    ]);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed();
