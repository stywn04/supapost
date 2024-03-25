import Link from "next/link";

interface PostUserProps {
  avatar: string;
  name: string;
  username: string;
}
export function PostUser({ avatar, name, username }: PostUserProps) {
  return (
    <Link href={`/profile/${username}`}>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={avatar} alt={name} className="w-full h-full object cover" />
        </div>
        <div className="flex flex-col ">
          <h3 className="text-slate-200 font-semibold">{name}</h3>
          <p className="text-slate-700 font-light -mt-1">@{username}</p>
        </div>
      </div>
    </Link>
  );
}
