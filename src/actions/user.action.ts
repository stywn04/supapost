"use server";

import { UpdateUserType, updateUserSchema } from "@/libs/schema/user";
import { createClient } from "@/libs/supabase/server";
import { revalidatePath } from "next/cache";
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

export async function updateUserAction(fields: UpdateUserType, avatar: string) {
  const validatedFields = updateUserSchema.safeParse(fields);
  if (!validatedFields.success) {
    return { isError: true, message: "Invalid fields" };
  }
  const supabase = createClient();
  const { id, username: currentUsername } = await getCurrentUser();
  const { username } = validatedFields.data;

  const usernameExist = await getUserByUsername(validatedFields.data.username);
  if (usernameExist && currentUsername !== username) {
    return { isError: true, message: "Username already exist!" };
  }
  const { error } = await supabase.auth.updateUser({
    data: { ...validatedFields.data, avatar },
  });
  const { error: updateUserError } = await supabase
    .from("user")
    .update({ ...validatedFields.data, avatar })
    .eq("id", id);

  if (error) {
    return { isError: true, message: error.message };
  }
  if (updateUserError) {
    return { isError: true, message: updateUserError.message };
  }
  revalidatePath("/profile");
}
