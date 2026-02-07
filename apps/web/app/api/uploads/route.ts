import { NextRequest, NextResponse } from "next/server";
import { uploadSkills } from "@/services/uploads";
import { uploadSchema } from "@/modules/uploads/uploads.schema";
import type { UploadResponseDto } from "@/modules/uploads/types/uploads.res";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // ... 你的校验逻辑 ...
    const parsed = uploadSchema.safeParse({
      fileName: formData.get("fileName") ?? undefined,
      file: formData.get("file") ?? undefined,
      apiKey: formData.get("apiKey") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.message },
        { status: 400 },
      );
    }

    // 调用 Service 获取 URL
    const url = await uploadSkills(formData);

    // ✨ 关键点：这里必须返回 NextResponse
    return NextResponse.json<UploadResponseDto>({
      url: url,
      message: "Success",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 },
    );
  }
}
