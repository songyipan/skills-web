import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

export async function uploadSkills(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const customFileName = formData.get("fileName") as string | null;

    if (!file) {
      return NextResponse.json({ error: "未发现文件" }, { status: 400 });
    }

    // 将文件转换为 Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 确保存储目录存在
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });

    // 构建唯一文件名，防止覆盖
    // 如果传了 fileName，则优先使用自定义名称（保留原始后缀）
    const originalName = file.name || "file";
    const ext = path.extname(originalName);
    const safeBaseName =
      (customFileName && customFileName.toString().trim()) ||
      path.basename(originalName, ext) ||
      "file";
    const uniqueName = `${Date.now()}-${safeBaseName}${ext}`;
    const filePath = path.join(uploadDir, uniqueName);

    // 写入文件到服务器磁盘
    await writeFile(filePath, buffer);

    console.log(`文件已保存至: ${filePath}`);

    // 返回可供前端访问的 URL
    return NextResponse.json({
      message: "上传成功",
      url: `/uploads/${uniqueName}`,
    });
  } catch (error) {
    console.error("上传出错:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
