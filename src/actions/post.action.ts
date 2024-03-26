"use server";

import { createClient } from "@/libs/supabase/server";
import { getCurrentUser } from "./user.action";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { postSchema, postType } from "@/libs/schema/post";

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
  `,
    )
    .range(from, to)
    .order("created_at", { ascending: false });

  if (!data) {
    throw error.message;
  }
  if (data.length < 1 && page !== 1) {
    if (page === 2) {
      redirect(`/posts`);
    }
    redirect(`/posts?page=${page - 1}`);
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
    `,
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

  const totalPages = Math.ceil((count ?? 0) / 8);
  const from = (page - 1) * 8;
  const to = from + 7;
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

export async function searchPostByQueryAction(query: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("post")
    .select(
      `
      *,
      user(name,username,avatar),
      like(id,user_id),
      comment(content,user(name,username,avatar))
    `,
    )
    .textSearch("content", query)
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }

  return data;
}

export async function getUserPosts(user_id: string, page: number) {
  const { username } = await getCurrentUser();
  const supabase = createClient();
  const { count, error: countError } = await supabase
    .from("post")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user_id);

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
  `,
    )
    .eq("user_id", user_id)
    .range(from, to)
    .order("created_at", { ascending: false });

  if (!data) {
    throw error.message;
  }
  // only for current loged in user
  if (data.length < 1 && page !== 1) {
    if (page === 2) {
      redirect(`/profile/${username}`);
    }
    redirect(`/profile/${username}?page=${page - 1}`);
  }
  return { totalPages, data };
}

export async function editPostAction(
  field: postType,
  post_id: string,
  pathname: string,
) {
  const validatedField = postSchema.safeParse(field);
  if (!validatedField.success) {
    return { error: true, message: "Invalid field!" };
  }
  const { content } = validatedField.data;
  const supabase = createClient();
  const { error } = await supabase
    .from("post")
    .update({ content })
    .eq("id", post_id);

  if (error) {
    return { error: true, message: error.message };
  }

  revalidatePath(pathname);
  return { error: false, message: "Post edited!" };
}

export async function deletePostAction(post_id: string, pathname: string) {
  const supabase = createClient();

  const { error } = await supabase.from("post").delete().eq("id", post_id);
  if (error) {
    return { isError: true, message: error.message };
  }

  if (!pathname.startsWith("/post/")) {
    console.log("triggs!");
    revalidatePath(pathname);
  }
  return { error: false, message: "Post deleted!" };
}
