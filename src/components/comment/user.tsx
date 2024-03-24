interface CommentUserProps {
  avatar: string;
  name: string;
  username: string;
}
export function CommentUser({ avatar, name, username }: CommentUserProps) {
  return (
    <section className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <img src={avatar} alt={username} />
      </div>
      <div className="flex items-center gap-2">
        <h4 className="font-semibold text-zinc-200">{name}</h4>
        &bull;
        <p className="font-light text-zinc-700">@{username}</p>
      </div>
    </section>
  );
}
