"use server";

import { createClient } from "@/libs/supabase/server";

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
