import { PostType } from "@/actions/post.action";
import { getCurrentUser } from "@/actions/user.action";
import {
  PostUser,
  PostCount,
  PostActivity,
  PostDate,
  PostContent,
} from "@/components/post";
export async function PostCard({ post }: { post: PostType }) {
  const { id } = await getCurrentUser();
  return (
    <div key={post.id} className="p-5 border-b-[1px] border-zinc-900">
      <section className="flex items-start justify-between ">
        <PostUser
          avatar={post.user?.avatar as string}
          name={post.user?.name as string}
          username={post.user?.username as string}
        />
      </section>
      <section className="ml-5 pl-7 border-l-[1px] border-zinc-900 my-2">
        <PostContent
          post_id={post.id}
          image={post.image}
          content={post.content}
        />
        <PostActivity
          current_user_id={id}
          user_id={post.user_id}
          post_id={post.id}
          like={post.like}
          content={post.content}
        />
      </section>
      <section className="flex items-center justify-between text-sm text-zinc-700 ml-5">
        <PostCount like={post.like.length} comment={post.comment.length} />
        <PostDate created_at={post.created_at} />
      </section>
    </div>
  );
}
