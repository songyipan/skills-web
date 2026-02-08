import { z } from "zod";

/**
 * 上传请求 DTO 的运行时校验 Schema
 *
 * 对应的 TS 类型为 `UploadDto`（见 `types/uploads.dto.ts`）
 */
export const uploadSchema = z.object({
  fileName: z
    .string()
    .min(1, { message: "File name cannot be empty" })
    .max(100, { message: "File name cannot be longer than 100 characters" })
    .nonempty({ message: "File name is required." }),
  file: z.any().refine(
    (file) => {
      if (!file) return false;

      // 文件大小不能超过3m
      if (file.size > 3 * 1024 * 1024) {
        return false;
      }

      return file instanceof File;
    },
    {
      message: "Please select a file (max size: 3MB)",
    },
  ),
  apiKey: z.string().nonempty({ message: "API Key is required." }),
});

export type UploadSchemaInput = z.infer<typeof uploadSchema>;
