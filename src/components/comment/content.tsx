export function CommentContent({ content }: { content: string }) {
  return (
    <section className="pl-10 py-2 whitespace-pre-line">
      <p>{content}</p>
    </section>
  );
}
