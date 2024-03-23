import Link from "next/link";

interface AuthRedirectProps {
  href: string;
  desc: string;
}
export function AuthRedirect({ href, desc }: AuthRedirectProps) {
  return (
    <section>
      <Link href={href} className="text-zinc-700 hover:text-zinc-300">
        {desc}
      </Link>
    </section>
  );
}
