"use client";
import { Edit, MessageSquare, Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { LikePost } from "./like";

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
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex items-center gap-2 text-zinc-300">
      <LikePost
        post_id={post_id}
        current_user_id={current_user_id}
        like={like}
      />
      <button
        onClick={() => {
          router.push(`/post/${post_id}`);
        }}
      >
        <MessageSquare />
      </button>
      <button>
        <Edit />
      </button>
      <button>
        <Trash />
      </button>
    </div>
  );
}
