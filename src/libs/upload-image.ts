import { createClient } from "@/libs/supabase/client";

export async function uploadImage(image: File) {
  if (!image) {
    throw Error("no image found!");
  }
  const s = createClient();
  const { error } = await s.storage
    .from("supapost")
    .upload(`/images/${image.name}`, image, { upsert: true });

  if (error) {
    throw Error(error.message);
  }
  const {
    data: { publicUrl },
  } = s.storage.from("supapost").getPublicUrl(`/images/${image.name}`);

  return publicUrl;
}
