import { CommentUser, CommentDate, CommentContent } from "@/components/comment";
interface CommentCardProps {
  comment: {
    id: string;
    content: string;
    post_id: string;
    user_id: string;
    created_at: string;
    user: {
      username: string;
      name: string;
      avatar: string;
    } | null;
  };
}
export function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="p-5 border-b-[1px] border-zinc-900">
      <CommentUser
        avatar={comment.user?.avatar as string}
        username={comment.user?.username as string}
        name={comment.user?.name as string}
      />
      <CommentContent content={comment.content} />
      <CommentDate created_at={comment.created_at} />
    </div>
  );
}
