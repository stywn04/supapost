import { AuthHeader, RegisterForm, AuthRedirect } from "@/components/auth";
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
