import { getUserPosts } from "@/actions/post.action";
import { PostCard } from "@/components/post";
import { Pagination } from "./pagination";
import { getCurrentUser } from "@/actions/user.action";
import Link from "next/link";

interface UserPostsProps {
  user_id: string;
  page: number;
  username: string;
}

export async function UserPosts({ page, user_id, username }: UserPostsProps) {
  const { data: posts, totalPages } = await getUserPosts(user_id, page);
  const { id } = await getCurrentUser();
  return (
    <div>
      <section className="py-10 flex flex-col gap-5">
        {posts.length < 1 && (
          <div className="py-5 text-zinc-700">
            {id === user_id ? (
              <span>
                you don't have any post,{" "}
                <Link className="text-zinc-400" href={"/create"}>
                  create one
                </Link>
              </span>
            ) : (
              <span>@{username} don't have any post,</span>
            )}
          </div>
        )}
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </section>
      <Pagination page={Number(page)} totalPages={Number(totalPages)} />
    </div>
  );
}
