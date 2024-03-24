"use client";
import { Heart, MessageSquare } from "lucide-react";
import { useTransition } from "react";
import { SubmitLoading } from "../submit-loading";
import { usePathname, useRouter } from "next/navigation";
import { likePostAction } from "@/actions/post.action";

interface PostActivityProps {
  post_id: string;
  user_id: string;
  like: { id: string; user_id: string }[];
}
export function PostActivity({ post_id, user_id, like }: PostActivityProps) {
  const [isPending, setTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  async function likeHandler() {
    setTransition(async () => {
      await likePostAction({ post_id, like, pathname });
    });
  }
  return (
    <div className="flex items-center gap-2">
      {isPending ? (
        <SubmitLoading />
      ) : (
        <button disabled={isPending} onClick={likeHandler}>
          {like.find((l) => l.user_id === user_id) ? (
            <Heart fill="red" color="red" />
          ) : (
            <Heart />
          )}
        </button>
      )}
      <button
        onClick={() => {
          router.push(`/post/${post_id}`);
        }}
      >
        <MessageSquare />
      </button>
    </div>
  );
}
