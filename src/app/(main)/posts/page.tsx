import { GetPosts } from "@/components/getPosts";
import { LoadingSkeleton } from "@/components/loading";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Posts",
};

interface PostsPageProps {
  searchParams: { page: number | undefined };
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const page = searchParams.page ?? 1;
  return (
    <main>
      <Suspense fallback={<LoadingSkeleton />} key={page}>
        <GetPosts page={Number(page)} />
      </Suspense>
    </main>
  );
}
