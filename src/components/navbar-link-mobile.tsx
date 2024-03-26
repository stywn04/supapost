import { NavbarLink } from "./navbar-link";

export function NavbarLinkMobile({ username }: { username: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 grid grid-cols-4 md:hidden px-5 py-2 bg-zinc-950/85 backdrop-blur-lg">
      <NavbarLink username={username} />
    </div>
  );
}
