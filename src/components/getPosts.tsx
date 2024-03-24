import { PostCard } from "@/components/post";
import { Pagination } from "./pagination";
import { getAllPostsAction } from "@/actions/post.action";
export async function GetPosts({ page }: { page: number }) {
  const { totalPages, data: posts } = await getAllPostsAction(page);
  return (
    <main>
      <section className="flex flex-col gap-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
      <Pagination page={Number(page)} totalPages={Number(totalPages)} />
    </main>
  );
}
