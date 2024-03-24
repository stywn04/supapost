import { getPostByIdAction } from "@/actions/post.action";
import { PostUser, PostCount, PostActivity, PostDate } from "@/components/post";
import { getCurrentUser } from "@/actions/user.action";

export async function generateMetadata({ params }: PostPageProps) {
  const { id } = params;
  const { user, content } = await getPostByIdAction(id);
  return {
    title: `@${user?.username} : ${content}`,
  };
}

interface PostPageProps {
  params: { id: string };
  searchParams: { page: number | undefined };
}
export default async function PostPage({
  params,
  searchParams,
}: PostPageProps) {
  const { id } = params;
  const { id: user_id } = await getCurrentUser();
  const page = searchParams.page ?? 1;
  const post = await getPostByIdAction(id);
  return (
    <main>
      <div key={post.id} className="pb-5 border-b-[1px] border-zinc-900">
        <section className="flex items-start justify-between ">
          <PostUser
            avatar={post.user?.avatar as string}
            name={post.user?.name as string}
            username={post.user?.username as string}
          />
        </section>
        <section className="my-2">
          <div className="py-5 whitespace-pre-line">
            {post.image ? (
              <img
                src={post.image}
                alt={post.content}
                className="w-full h-full rounded-md mb-2"
              />
            ) : null}
            <p>{post.content}</p>
          </div>
          <PostActivity user_id={user_id} post_id={post.id} like={post.like} />
        </section>
        <section className="flex items-center justify-between text-sm text-zinc-700 ">
          <PostCount like={post.like.length} comment={post.comment.length} />
          <PostDate created_at={post.created_at} />
        </section>
      </div>
    </main>
  );
}
