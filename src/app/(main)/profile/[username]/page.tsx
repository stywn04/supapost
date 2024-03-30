import { getCurrentUser, getUserByUsername } from "@/actions/user.action";
import { UpdateProfileButton } from "@/components/auth";
import { LoadingSkeleton } from "@/components/loading";
import { UserPosts } from "@/components/user-posts";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }: ProfilePageProps) {
  const { username } = params;
  const user = await getUserByUsername(username);

  return {
    title: `${user?.name} • @${user?.username}`,
  };
}

interface ProfilePageProps {
  params: { username: string };
  searchParams: { page: number | undefined };
}

export default async function SearchPage({
  params,
  searchParams,
}: ProfilePageProps) {
  const page = searchParams.page ?? 1;
  const { username } = params;
  const user = await getUserByUsername(username);
  if (!user) {
    return notFound();
  }
  const { id } = await getCurrentUser();
  const isCurrentUser = id === user?.id;
  return (
    <main>
      <section className="grid grid-cols-12 gap-4 justify-between items-start">
        <div className="col-span-8">
          <h1 className="font-bold text-xl">{user?.name}</h1>
          <p className="text-slate-700">@{user?.username}</p>
          <div className="whitespace-pre-line mt-10">
            <span>{user?.bio}</span>
          </div>
        </div>
        <div className="col-span-4 flex justify-end ">
          <div className="w-28 w-28 rounded-full overflow-hidden">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      {isCurrentUser ? (
        <UpdateProfileButton
          avatar={user.avatar}
          username={user.username}
          bio={user.bio}
          name={user.name}
        />
      ) : (
        <div className="w-full h-[1px] bg-zinc-900 mt-10" />
      )}

      <Suspense key={page} fallback={<LoadingSkeleton />}>
        <UserPosts
          page={Number(page)}
          user_id={user.id}
          username={user.username}
        />
      </Suspense>
    </main>
  );
}
