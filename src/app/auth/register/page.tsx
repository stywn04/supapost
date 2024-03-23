import { AuthHeader } from "@/components/auth/header";
import { AuthRedirect } from "@/components/auth/redirect";
import { RegisterForm } from "@/components/auth/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <main>
      <AuthHeader title="Register" desc="Create your account to continue" />
      <RegisterForm />
      <AuthRedirect href="/auth/login" desc="already have account ?" />
    </main>
  );
}
