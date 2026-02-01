import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData = [
  {
    name: "Alice",
    email: "alice@prisma.io",
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
  },
];

async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
