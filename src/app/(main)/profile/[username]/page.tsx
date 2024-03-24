import { getUserByUsername } from "@/actions/user.action";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: ProfilePageProps) {
  const { username } = params;
  const user = await getUserByUsername(username);

  return {
    title: `${user?.name} • @${user?.username}`,
  };
}

interface ProfilePageProps {
  params: { username: string };
}

export default async function SearchPage({ params }: ProfilePageProps) {
  const { username } = params;
  const user = await getUserByUsername(username);
  if (!user) redirect("/auth/login");
  return (
    <main>
      <section className="grid grid-cols-12 gap-4 justify-between items-start">
        <div className="col-span-8">
          <h1 className="font-bold text-xl">{user.name}</h1>
          <p className="text-slate-700">@{user.username}</p>
          <div className="whitespace-pre-line mt-10">
            <span>{user.bio}</span>
          </div>
        </div>
        <div className="col-span-4 flex justify-end ">
          <div className="w-28 w-28 rounded-full overflow-hidden">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
