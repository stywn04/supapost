import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

interface ProfilePageProps {
  params: { username: string };
}

export default function SearchPage({ params }: ProfilePageProps) {
  const { username } = params;
  return (
    <main>
      <h1>{username}'s profile</h1>
    </main>
  );
}
