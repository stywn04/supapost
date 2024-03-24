"use client";

import { BookOpen, Edit, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavbarLink({ username }: { username: string }) {
  const navlinks = [
    { href: "/posts", icon: <BookOpen size={32} /> },
    { href: "/create", icon: <Edit size={32} /> },
    { href: "/search", icon: <Search size={32} /> },
    { href: `/profile/${username}`, icon: <User size={32} /> },
  ];
  const pathname = usePathname();
  return navlinks.map((link) => {
    const active = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        className={`py-2 px-8 rounded-md hover:bg-white/5 ${
          active ? "text-zinc-200" : "text-zinc-700"
        }`}
      >
        {link.icon}
      </Link>
    );
  });
}
