interface AuthHeaderProps {
  title: string;
  desc: string;
}
export function AuthHeader({ title, desc }: AuthHeaderProps) {
  return (
    <section>
      <h1 className="font-bold text-3xl tracking-wide">{title}</h1>
      <p className="text-zinc-700 text-lg">{desc}</p>
    </section>
  );
}
