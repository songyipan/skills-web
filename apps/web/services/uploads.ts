"use server";
import { createClient } from "@supabase/supabase-js";
import { findUserByApiKeyService } from "@/modules/apiKey/apiKey.service";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
export async function uploadSkills(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided"); // 抛出错误或返回 null

  const user = await findUserByApiKeyService(formData.get("apiKey") as string);
  if (!user) throw new Error("Invalid API Key"); // 抛出错误或返回 null

  const { data, error } = await supabase.storage
    .from("upload") // 确保 Bucket 名字和你创建的一致（你代码里写了 upload 和 uploads 两个）
    .upload(`${Date.now()}-${file.name}`, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("uploads").getPublicUrl(data.path);

  return publicUrl;
}
