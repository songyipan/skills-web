"use server";
import { createClient } from "@supabase/supabase-js";
import { findUserByApiKeyService } from "@/modules/apiKey/apiKey.service";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required. " +
      "Please add them to your environment variables.",
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);
export async function uploadSkills(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided"); // 抛出错误或返回 null

  const user = await findUserByApiKeyService(formData.get("apiKey") as string);
  if (!user) throw new Error("Invalid API Key"); // 抛出错误或返回 null

  const { data, error } = await supabase.storage
    .from("upload") // 确保 Bucket 名字和你创建的一致（你代码里写了 upload 和 uploads 两个）
    .upload(`${Date.now()}-${file.name}`, file);

  console.log(error, "error-----------upload");

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("uploads").getPublicUrl(data.path);

  return publicUrl;
}

// 删除上传的文件
export async function deleteUploadedFile(filePath: string) {
  const { error } = await supabase.storage
    .from("uploads") // 确保 Bucket 名字和你创建的一致（你代码里写了 upload 和 uploads 两个）
    .remove([filePath]);

  if (error) throw error;
}
