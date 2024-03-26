import { getCurrentUser } from "@/actions/user.action";
import { NavbarLink } from "./navbar-link";
import { NavbarUser } from "./navbar-user";
import Link from "next/link";

export async function Navbar() {
  const user = await getCurrentUser();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 md:px-0 px-5 py-2 bg-zinc-950/85 backdrop-blur-xl">
      <nav className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-12 items-center justify-between">
        <section>
          <Link href={"/"}>
            <h1 className="font-bold text-2xl">sP</h1>
          </Link>
        </section>
        <section className="hidden col-span-10 md:flex items-center justify-center gap-4">
          <NavbarLink username={user.username} />
        </section>
        <section className="flex items-center justify-end">
          <NavbarUser
            avatar={user.avatar}
            name={user.name}
            username={user.username}
          />
        </section>
      </nav>
    </header>
  );
}
