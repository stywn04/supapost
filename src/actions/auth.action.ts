"use server";
import {
  LoginType,
  RegisterType,
  loginSchema,
  registerSchema,
} from "@/libs/schema/auth";
import { createClient } from "@/libs/supabase/server";
import { getUserByEmail, getUserByUsername } from "./user.action";
import { redirect } from "next/navigation";

export async function registerAction(fields: RegisterType) {
  const validatedFields = registerSchema.safeParse(fields);
  if (!validatedFields.success) {
    return { isError: true, message: "Invalid fields!" };
  }

  const s = createClient();
  const { username, name, email, password } = validatedFields.data;

  const usernameExist = await getUserByUsername(username);

  if (usernameExist) {
    return { isError: true, message: "Username already exist!" };
  }

  const emailExist = await getUserByEmail(email);

  if (emailExist) {
    return { isError: true, message: "Email already registered!" };
  }

  const {
    error,
    data: { user },
  } = await s.auth.signUp({
    email,
    password,
    options: {
      data: {
        email,
        username,
        name,
        bio: "no bio yet.",
        avatar: `https://ui-avatars.com/api/?name=${name}`,
      },
    },
  });

  if (error) {
    return { isError: true, message: error.message };
  }

  return {
    isError: false,
    message: "Account successfully registered!",
    redirectTo: `/profile/${user?.user_metadata.username}`,
  };
}

export async function loginAction(fields: LoginType) {
  const validatedFields = loginSchema.safeParse(fields);

  if (!validatedFields.success) {
    return { isError: true, message: "Invalid fields!" };
  }

  const s = createClient();
  const { email, password } = validatedFields.data;

  const { error } = await s.auth.signInWithPassword({ email, password });
  if (error) {
    return { isError: true, message: error.message };
  }

  return { isError: false, message: "Login Succes!" };
}

export async function logoutAction() {
  const s = createClient();
  const { error } = await s.auth.signOut();

  if (error) {
    throw Error(error.message);
  }

  redirect("/auth/login");
}
