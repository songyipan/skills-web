# Prisma 使用指南

## 1. 环境配置

### 安装依赖

```bash
pnpm add prisma @prisma/client @prisma/adapter-pg pg -D
pnpm add @prisma/client @prisma/adapter-pg pg
```

### 配置环境变量

编辑 `.env` 文件：

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

## 2. 定义数据模型

编辑 `prisma/schema.prisma`：

```prisma
generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  authorId  Int
  author    User    @relation(fields: [authorId], references: [id])
}
```

## 3. 生成 Prisma Client

```bash
pnpm prisma:generate
```

## 4. 数据库迁移

### 开发环境

```bash
pnpm prisma:migrate
```

### 生产环境

```bash
pnpm prisma:migrate deploy
```

## 5. 在应用中使用

### 5.1 导入 Prisma Client

```typescript
import prisma from "@/lib/prisma";
```

### 5.2 查询数据

```typescript
// 查询所有用户
const users = await prisma.user.findMany();

// 查询所有帖子（包含作者）
const posts = await prisma.post.findMany({
  include: { author: true },
});

// 按条件查询
const user = await prisma.user.findUnique({
  where: { id: 1 },
});
```

### 5.3 创建数据

```typescript
// 创建用户
await prisma.user.create({
  data: {
    email: "test@example.com",
    name: "Test User",
  },
});

// 创建帖子（关联用户）
await prisma.post.create({
  data: {
    title: "New Post",
    content: "Content here",
    authorId: 1,
  },
});
```

### 5.4 更新数据

```typescript
await prisma.user.update({
  where: { id: 1 },
  data: { name: "New Name" },
});
```

### 5.5 删除数据

```typescript
await prisma.post.delete({
  where: { id: 1 },
});
```

## 6. 常用命令

| 命令                                  | 说明                               |
| ------------------------------------- | ---------------------------------- |
| `pnpm prisma:generate`                | 生成 Prisma Client                 |
| `pnpm prisma:migrate`                 | 创建/更新数据库表                  |
| `pnpm prisma:migrate dev --name init` | 创建新迁移                         |
| `pnpm prisma:studio`                  | 打开 Prisma Studio（可视化数据库） |
| `pnpm prisma:seed`                    | 播种测试数据                       |
| `pnpm prisma:migrate reset`           | 重置数据库（危险！）               |

## 7. Prisma Studio

启动可视化数据库管理界面：

```bash
pnpm prisma:studio
```

## 8. 种子数据

编辑 `prisma/seed.ts` 添加测试数据，然后运行：

```bash
pnpm prisma:seed
```

## 9. 注意事项

1. **数据库 URL**：确保 `.env` 中的 `DATABASE_URL` 正确
2. **热重载**：Prisma Client 使用单例模式，避免开发时重复连接
3. **迁移生产**：部署前确保运行 `prisma migrate deploy`
