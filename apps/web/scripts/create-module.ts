#!/usr/bin/env node
import { mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

function toPascalCase(str: string): string {
  return str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toUpperCase());
}

function toCamelCase(str: string): string {
  return str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toLowerCase());
}

async function createModule(name: string) {
  if (!name) {
    console.error("❌ 请提供模块名称，例如: pnpm mkmod --name user");
    process.exit(1);
  }

  const baseDir = path.join(process.cwd(), "modules", name);
  const typesDir = path.join(baseDir, "types");

  if (existsSync(baseDir)) {
    console.error(`❌ 模块 "${name}" 已存在`);
    process.exit(1);
  }

  const pascalName = toPascalCase(name);
  const camelName = toCamelCase(name);

  // 创建目录
  await mkdir(typesDir, { recursive: true });

  // 创建 dto 文件
  const dtoContent = `export type Create${pascalName}Dto = {
  // 添加你的字段
};
`;

  // 创建 scheme 文件
  const schemeContent = `import { z } from "zod";

export const create${pascalName}Schema = z.object({
  // 添加你的校验规则
});
`;

  // 创建 repository 文件
  const repositoryContent = `import { prisma } from "@/lib/db";
import { Create${pascalName}Dto } from "./types/${name}.dto";

export const create${pascalName} = async (data: Create${pascalName}Dto) => {
  // 实现数据库操作
};
`;

  // 创建 service 文件
  const serviceContent = `import { create${pascalName} } from "./${name}.repository";
import { Create${pascalName}Dto } from "./types/${name}.dto";
import { create${pascalName}Schema } from "./${name}.scheme";

export const create${pascalName}Service = async (data: Create${pascalName}Dto) => {
  // 1. 先用 Zod 做校验
  const result = create${pascalName}Schema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.message);
  }

  await create${pascalName}(data);
};
`;

  // 写入文件
  await writeFile(path.join(typesDir, `${name}.dto.ts`), dtoContent);
  await writeFile(path.join(baseDir, `${name}.scheme.ts`), schemeContent);
  await writeFile(path.join(baseDir, `${name}.repository.ts`), repositoryContent);
  await writeFile(path.join(baseDir, `${name}.service.ts`), serviceContent);

  console.log(`✅ 模块 "${name}" 创建成功！`);
  console.log(`📁 位置: ${baseDir}`);
  console.log(`\n生成的文件:`);
  console.log(`  - types/${name}.dto.ts`);
  console.log(`  - ${name}.scheme.ts`);
  console.log(`  - ${name}.repository.ts`);
  console.log(`  - ${name}.service.ts`);
}

// 解析命令行参数
const args = process.argv.slice(2);
const nameIndex = args.indexOf("--name");
const name = nameIndex !== -1 ? args[nameIndex + 1] : null;

createModule(name);
