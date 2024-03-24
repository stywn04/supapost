"use client";

import { useEffect, useState } from "react";
import { UpdateProfileModal } from "@/components/auth";
interface UpdateUserProps {
  avatar: string;
  username: string;
  name: string;
  bio: string;
}
export function UpdateProfileButton({
  avatar,
  username,
  name,
  bio,
}: UpdateUserProps) {
  const [open, setOpen] = useState(false);
  function closeModal() {
    setOpen(false);
  }

  useEffect(() => {
    if (document) {
      document.body.style.overflow = open ? "hidden" : "auto";
    }
  }, [open]);
  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="w-full py-2 bg-zinc-900 rounded-md mt-10"
      >
        Edit Profile
      </button>
      {open && (
        <UpdateProfileModal
          avatar={avatar}
          name={name}
          username={username}
          bio={bio}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
