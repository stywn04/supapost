import { AuthHeader, LoginForm, AuthRedirect } from "@/components/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};
interface LoginPageProps {
  searchParams: { redirectTo: string | undefined };
}
export default function LoginPage({ searchParams }: LoginPageProps) {
  const path = searchParams.redirectTo ?? "/posts";
  return (
    <main>
      <AuthHeader title="Login" desc="Login use your account to continue" />
      <LoginForm redirectTo={path} />
      <AuthRedirect href="/auth/register" desc="doesn't have account ?" />
    </main>
  );
}
