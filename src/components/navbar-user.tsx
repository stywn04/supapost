"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { SubmitLoading } from "./submit-loading";
import { logoutAction } from "@/actions/auth.action";

interface NavbarUserProps {
  avatar: string;
  username: string;
  name: string;
}
export function NavbarUser({ avatar, username, name }: NavbarUserProps) {
  const [open, setOpen] = useState(false);
  const triggsRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function closeDropdown(e: any) {
      if (
        !triggsRef.current?.contains(e.target) &&
        !dropdownRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="relative">
      <div
        ref={triggsRef}
        onClick={() => {
          setOpen(!open);
        }}
        className="w-10 h-10 rounded-full bg-white/5 overflow-hidden cursor-pointer"
      >
        <img src={avatar} className="w-full h-full object-cover" />
      </div>
      {open && (
        <div className="absolute -bottom-28 right-0" ref={dropdownRef}>
          <NavbarUserDropdown name={name} username={username} avatar={avatar} />
        </div>
      )}
    </div>
  );
}
interface NavbarUserDropdownProps extends NavbarUserProps {}
function NavbarUserDropdown({
  username,
  name,
  avatar,
}: NavbarUserDropdownProps) {
  const [isPending, setTransition] = useTransition();
  async function logoutHandler() {
    setTransition(async () => {
      await logoutAction();
    });
  }
  return (
    <div className="w-48 bg-zinc-950 border border-zinc-900 rounded-md  p-2 animate-down">
      <div className="flex items-center gap-2 mb-2 hover:bg-white/5 rounded-md px-1 cursor-pointer ">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img src={avatar} alt="user" className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm font-light text-zinc-700">@{username}</p>
        </div>
      </div>
      <button
        onClick={logoutHandler}
        disabled={isPending}
        className="w-full py-1 bg-transparent border border-zinc-700 rounded-md text-red-600 hover:bg-white/5"
      >
        {isPending ? <SubmitLoading /> : "Log out"}
      </button>
    </div>
  );
}
