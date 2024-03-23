import { AuthHeader, LoginForm, AuthRedirect } from "@/components/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main>
      <AuthHeader title="Login" desc="Login use your account to continue" />
      <LoginForm />
      <AuthRedirect href="/auth/register" desc="doesn't have account ?" />
    </main>
  );
}
