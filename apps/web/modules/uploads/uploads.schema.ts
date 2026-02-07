import { z } from "zod";

/**
 * 上传请求 DTO 的运行时校验 Schema
 *
 * 对应的 TS 类型为 `UploadDto`（见 `types/uploads.dto.ts`）
 */
export const uploadSchema = z.object({
  fileName: z
    .string()
    .min(1, "File name cannot be empty")
    .max(100, "File name cannot be longer than 100 characters")
    .nonempty("File name is required."),
  file: z.any().refine(
    (file) => {
      if (!file) return false;
      return file instanceof File;
    },
    {
      message: "Please select a file",
    },
  ),
  apiKey: z.string().nonempty("API Key is required."),
});

export type UploadSchemaInput = z.infer<typeof uploadSchema>;
