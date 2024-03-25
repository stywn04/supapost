import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export function CommentPost({ post_id }: { post_id: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(`/post/${post_id}`);
      }}
    >
      <MessageSquare />
    </button>
  );
}
