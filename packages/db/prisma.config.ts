import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "..", "..", ".env") });

import { defineConfig } from "prisma/config";

const dbUrl = process.env.DATABASE_URL || "";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: dbUrl,
  },
});
