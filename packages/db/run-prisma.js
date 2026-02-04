#!/usr/bin/env node
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { spawn } from "child_process";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, "..", "..", ".env");
config({ path: envPath });

const args = process.argv.slice(2);
const cmd = spawn("pnpm", ["prisma", ...args], {
  stdio: "inherit",
  cwd: __dirname,
  env: { ...process.env },
});

cmd.on("exit", (code) => process.exit(code));
