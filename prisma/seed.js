const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const isDevelopment = process.env.NODE_ENV === 'development';

async function main() {
  if (isDevelopment) {
    await prisma.user.upsert({
      where: {
        email: 'john.doe@prisma.io',
      },
      update: {},
      create: {
        username: 'john.doe',
        password: '$2a$07$FGBp3ilWdjWKiFGZEaFun.QD.VvBHuQ79t8hf6gzgNsBy510pf/iy', //123456Abc
        name: 'John Doe',
        email: 'john.doe@prisma.io',
        image: null,
      },
    });

    await prisma.user.upsert({
      where: {
        email: 'mary.jane@prisma.io',
      },
      update: {},
      create: {
        username: 'mary.jane',
        password: '$2a$07$RpN5otfwBAO6GVUmxq8X/e7Hh14PjtmMhGaAMFODNnrNsgc4vFBfW', //Abc123456
        name: 'Mary Jane',
        email: 'mary.jane@prisma.io',
        image: null,
      },
    });
  }

  await prisma.category.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Action', slug: 'action' },
      { name: 'Adventure', slug: 'adventure' },
      { name: 'Comedy', slug: 'comedy' },
      { name: 'Drama', slug: 'drama' },
      { name: 'Fantasy', slug: 'fantasy' },
      { name: 'Horror', slug: 'horror' },
      { name: 'Historical', slug: 'historical' },
      { name: 'Mystery', slug: 'mystery' },
      { name: 'Shounen', slug: 'shounen' },
      { name: 'Shoujo', slug: 'shoujo' },
      { name: 'Romantic', slug: 'romantic' },
    ],
  });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect;
    process.exit;
  });
