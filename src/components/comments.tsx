import { getAllPostCommentAction } from "@/actions/post.action";
import { CommentCard } from "@/components/comment";
import { Pagination } from "./pagination";

interface CommentsProps {
  id: string;
  page: number;
}
export async function Comments({ id, page }: CommentsProps) {
  const { totalPages, data: comments } = await getAllPostCommentAction(
    id,
    page
  );
  return (
    <div>
      {comments.length < 1 && (
        <div className="py-10">
          <span className="text-zinc-700">no comments found.</span>
        </div>
      )}
      {comments.length > 0 &&
        comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      <Pagination page={Number(page)} totalPages={Number(totalPages)} />
    </div>
  );
}
