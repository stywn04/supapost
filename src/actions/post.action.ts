"use server";

import { createClient } from "@/libs/supabase/server";
import { getCurrentUser } from "./user.action";
import { revalidatePath } from "next/cache";

export async function submitPostAction(content: string, image: string | null) {
  const { id } = await getCurrentUser();
  const s = createClient();

  const { error } = await s
    .from("post")
    .insert({ content, image, user_id: id });

  if (error) {
    return { isError: true, message: error.message };
  }

  revalidatePath("/posts");
  return { isError: false, message: "Post submitted!" };
}
