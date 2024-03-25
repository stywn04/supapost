"use client";
import { Trash } from "lucide-react";
import { LikePost } from "./like";
import { CommentPost } from "./comment";
import { EditPost } from "./edit";
import { DeletePost } from "./delete";

interface PostActivityProps {
  post_id: string;
  user_id: string;
  current_user_id: string;
  like: { id: string; user_id: string }[];
  content: string;
}
export function PostActivity({
  current_user_id,
  post_id,
  user_id,
  like,
  content,
}: PostActivityProps) {
  const isAllowed = user_id === current_user_id;
  return (
    <div className="flex items-center gap-3 text-zinc-500">
      <LikePost
        post_id={post_id}
        current_user_id={current_user_id}
        like={like}
      />
      <CommentPost post_id={post_id} />
      {isAllowed && (
        <>
          <EditPost content={content} post_id={post_id} />
          <DeletePost post_id={post_id} />
        </>
      )}
    </div>
  );
}
