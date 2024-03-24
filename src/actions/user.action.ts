"use server";

import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export async function getUserByUsername(username: string) {
  const s = createClient();
  const { data: user } = await s
    .from("user")
    .select("*")
    .eq("username", username)
    .limit(1)
    .single();

  return user;
}

export async function getUserByEmail(email: string) {
  const s = createClient();
  const { data: user } = await s
    .from("user")
    .select("*")
    .eq("email", email)
    .limit(1)
    .single();

  return user;
}

export async function getCurrentUser() {
  const s = createClient();
  const {
    data: { user },
  } = await s.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { error, data: currentUser } = await s
    .from("user")
    .select("*")
    .eq("id", user.id)
    .limit(1)
    .single();

  if (error) {
    throw Error(error.message);
  }

  return currentUser;
}
