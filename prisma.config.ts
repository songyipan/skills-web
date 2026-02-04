import "dotenv/config";
import { defineConfig } from "prisma/config";

const isManagementCommand = process.argv.some(
  (arg) => arg.includes("push") || arg.includes("migrate")
);

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: isManagementCommand
      ? process.env.DIRECT_URL || process.env.DATABASE_URL
      : process.env.DATABASE_URL,
  },
});
