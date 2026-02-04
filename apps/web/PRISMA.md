# Prisma 使用指南

> Prisma 已迁移到共享包 `@workspace/db`，所有应用共享同一套 Prisma 配置。

## 1. 项目结构

```
packages/db/
├── prisma/
│   ├── schema.prisma      # 数据模型定义
│   └── config.ts          # Prisma 配置
├── src/
│   └── client.ts          # Prisma Client 实例
└── package.json
```

## 2. 在应用中使用

```typescript
import { prisma } from "@/lib/db";
```

## 3. Prisma 命令

所有 Prisma 命令需要在 `packages/db` 目录下执行：

```bash
# 生成 Prisma Client
cd packages/db && pnpm prisma:generate

# 数据库迁移
cd packages/db && pnpm prisma:migrate

# 打开 Prisma Studio
cd packages/db && pnpm prisma:studio

# 推送 schema 到数据库
cd packages/db && pnpm prisma:push
```

## 4. 常用查询示例

```typescript
// 查询所有用户
const users = await prisma.user.findMany();

// 按条件查询
const user = await prisma.user.findUnique({
  where: { id: "xxx" },
});

// 创建数据
await prisma.user.create({
  data: {
    email: "test@example.com",
    name: "Test User",
  },
});

// 更新数据
await prisma.user.update({
  where: { id: "xxx" },
  data: { name: "New Name" },
});
```

## 5. 注意事项

1. **环境变量**：确保 `.env` 中的 `DATABASE_URL` 和 `DIRECT_URL` 正确
2. **Prisma Client**：使用 `@/lib/db` 导出，单例模式无需担心连接泄漏
3. **数据库迁移**：修改 schema 后运行 `pnpm prisma:migrate`
