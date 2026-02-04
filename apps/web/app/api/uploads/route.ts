import { NextRequest, NextResponse } from "next/server";
import { uploadSkills } from "@/services/uploads";
import { uploadSchema } from "@/modules/uploads/uploads.schema";
import type { UploadResponseDto } from "@/modules/uploads/types/uploads.res";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  // 从 FormData 中提取需要校验的字段
  const raw = {
    fileName: formData.get("fileName") ?? undefined,
    file: formData.get("file") ?? undefined,
  };

  const parsed = uploadSchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json<UploadResponseDto>(
      { error: "Please check your fileName and file" },
      { status: 400 }
    );
  }

  // 目前文件本身与 fileName 仍由 services/uploads.ts 处理
  // 如需更严格，可以将 parsed.data 传递给 service 分层使用
  console.log("POST /api/uploads/skills", parsed.data);

  // 将已经读取过的 formData 传给 service，避免重复读取 request.body
  return uploadSkills(formData);
}
