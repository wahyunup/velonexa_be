import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userSeed = [
  {
    email: "wahyunup@gmail.com",
    username: "wahyunup",
    display_name: "wahyunup",
    password: "12345678",
  },
  {
    email: "akun_testfeature@velonexa.com",
    username: "akun_testfeature",
    display_name: "Akun Test Feature",
    password: "12345678",
  },
];

const keepaliveSeed = {
  id: 1,
  status : "alive",
  createdAt : new Date(),
}

async function main() {
  for (const seed of userSeed) {
    const hashedPassword = await bcrypt.hash(seed.password, 10);

    const user = await prisma.user.upsert({
      where: { email: seed.email },
      update: {
        username: seed.username,
        display_name: seed.display_name,
        password: hashedPassword,
      },
      create: {
        username: seed.username,
        display_name: seed.display_name,
        email: seed.email,
        password: hashedPassword,
      },
    });

    console.log(`Seeded user: ${user.email} (username: ${user.username})`);
  }

  const keepalive = await prisma.keepalive.upsert({
    where: { id: keepaliveSeed.id },
    update: {
      status: keepaliveSeed.status,
      createdAt: keepaliveSeed.createdAt,
    },
    create: {
      status: keepaliveSeed.status,
      createdAt: keepaliveSeed.createdAt,
    },
  });

  console.log(`Seeded keepalive with ID: ${keepalive.id}`);
}

main()
  .catch((error) => {
    console.error("User seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
