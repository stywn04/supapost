"use client";
import { Edit, Trash } from "lucide-react";
import { LikePost } from "./like";
import { CommentPost } from "./comment";

interface PostActivityProps {
  post_id: string;
  user_id: string;
  current_user_id: string;
  like: { id: string; user_id: string }[];
}
export function PostActivity({
  current_user_id,
  post_id,
  user_id,
  like,
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
          <button>
            <Edit />
          </button>
          <button>
            <Trash />
          </button>
        </>
      )}
    </div>
  );
}
