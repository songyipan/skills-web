import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "..", "..", ".env") });

import { defineConfig } from "prisma/config";

const isManagement = process.argv.some(
  (arg) =>
    arg.includes("push") || arg.includes("migrate") || arg.includes("studio"),
);

const dbUrl = isManagement
  ? process.env.DIRECT_URL || process.env.DATABASE_URL || ""
  : process.env.DATABASE_URL || "";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: dbUrl,
  },
});
