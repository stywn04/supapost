"use server";

import { createClient } from "@/libs/supabase/server";
import { getCurrentUser } from "./user.action";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

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

export async function getAllPostsAction(page: number) {
  const supabase = createClient();
  const { count, error: countError } = await supabase
    .from("post")
    .select("*", { count: "exact", head: true });

  if (countError) {
    throw Error(countError.message);
  }
  const totalPages = Math.ceil((count ?? 0) / 8);
  const from = (page - 1) * 8;
  const to = from + 7;

  const { data, error } = await supabase
    .from("post")
    .select(
      `
    *,
    user(name,username,avatar),
    like(id,user_id),
    comment(content,user(name,username,avatar))
  `
    )
    .range(from, to)
    .order("created_at", { ascending: false });

  if (!data) {
    throw error.message;
  }
  return { totalPages, data };
}
export async function getPostByIdAction(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("post")
    .select(
      `
      *,
      user(name,username,avatar),
      like(id,user_id),
      comment(content,user(name,username,avatar))
    `
    )
    .eq("id", id)
    .limit(1)
    .single();

  if (error) {
    throw Error(error.message);
  }

  if (!data) {
    return notFound();
  }

  return data;
}

export type PostType = Awaited<ReturnType<typeof getPostByIdAction>>;

interface LikePostActionArgs {
  post_id: string;
  like: { id: string; user_id: string }[];
  pathname: string;
}
export async function likePostAction({
  post_id,
  like,
  pathname,
}: LikePostActionArgs) {
  const supabase = createClient();
  const { id } = await getCurrentUser();

  const userExist = like.find((l) => l.user_id === id);

  userExist
    ? await supabase.from("like").delete().eq("id", userExist.id)
    : await supabase.from("like").insert({ user_id: id, post_id });

  revalidatePath(pathname);
}

export async function commentAction(post_id: string, content: string) {
  const supabase = createClient();
  const { id } = await getCurrentUser();

  if (content.length < 1) {
    return { isError: true, message: "Cannot submit empty comment" };
  }

  const { error } = await supabase.from("comment").insert({
    content,
    post_id,
    user_id: id,
  });
  if (error) {
    return { isError: true, message: error.message };
  }
  revalidatePath(`/post/${post_id}`);
}

export async function getAllPostCommentAction(post_id: string, page: number) {
  const supabase = createClient();

  const { count, error: countError } = await supabase
    .from("comment")
    .select("*", { count: "exact", head: true })
    .eq("post_id", post_id);
  if (countError) {
    throw Error(countError.message);
  }

  const totalPages = Math.ceil((count ?? 0) / 5);
  const from = (page - 1) * 5;
  const to = from + 4;
  const { data, error } = await supabase
    .from("comment")
    .select(`*,user(username,name,avatar)`)
    .eq("post_id", post_id)
    .range(from, to)
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }

  return { totalPages, data };
}
