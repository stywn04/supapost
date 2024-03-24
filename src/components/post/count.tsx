interface PostCountProps {
  like: number;
  comment: number;
}
export function PostCount({ like, comment }: PostCountProps) {
  return (
    <div>
      {like > 0 && <span>{like} likes</span>}
      {like > 0 && comment > 0 && <span>&nbsp;&bull;&nbsp;</span>}
      {comment > 0 && <span>{comment} comments</span>}
    </div>
  );
}
