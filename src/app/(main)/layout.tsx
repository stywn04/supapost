import { getCurrentUser } from "@/actions/user.action";
import { Navbar } from "@/components/navbar";
import { NavbarLinkMobile } from "@/components/navbar-link-mobile";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username } = await getCurrentUser();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <NavbarLinkMobile username={username} />
      <div className="max-w-xl mx-auto px-5 md:px-0 py-20 md:py-28">
        {children}
      </div>
    </div>
  );
}
