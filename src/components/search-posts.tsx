import { searchPostByQueryAction } from "@/actions/post.action";
import { PostCard } from "@/components/post";
export async function SearchPosts({ query }: { query: string }) {
  const posts = await searchPostByQueryAction(query);
  return (
    <>
      <section className="py-5">
        {posts.length < 1 && (
          <span>sorry can't find what you looking for.</span>
        )}
      </section>

      <section className="flex flex-col gap-5 py-5">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </section>
    </>
  );
}
