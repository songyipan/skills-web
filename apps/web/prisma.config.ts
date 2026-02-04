import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// 检测是否正在运行 push 或 migrate 命令
const isManagementCommand = process.argv.some(
  (arg) => arg.includes("push") || arg.includes("migrate")
);

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // 如果是 push/migrate，强制使用 DIRECT_URL，否则使用 DATABASE_URL
    url: isManagementCommand ? env("DIRECT_URL") : env("DATABASE_URL"),
  },
});
