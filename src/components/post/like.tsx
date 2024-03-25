import { useTransition } from "react";
import { usePathname } from "next/navigation";
import { likePostAction } from "@/actions/post.action";
import { SubmitLoading } from "../submit-loading";
import { Heart } from "lucide-react";

interface LikePostProps {
  post_id: string;
  current_user_id: string;
  like: { id: string; user_id: string }[];
}
export function LikePost({ post_id, like, current_user_id }: LikePostProps) {
  const [isPending, setTransition] = useTransition();
  const pathname = usePathname();
  async function likeHandler() {
    setTransition(async () => {
      await likePostAction({ post_id, like, pathname });
    });
  }
  return isPending ? (
    <SubmitLoading />
  ) : (
    <button disabled={isPending} onClick={likeHandler}>
      {like.find((l) => l.user_id === current_user_id) ? (
        <Heart fill="red" color="red" />
      ) : (
        <Heart />
      )}
    </button>
  );
}
