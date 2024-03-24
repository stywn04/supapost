import { CreatePostForm } from "@/components/post/post-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create",
};

export default function CreatePage() {
  return (
    <main>
      <section className="mb-5">
        <h1 className="font-semibold text-xl">Create your post</h1>
      </section>
      <CreatePostForm />
    </main>
  );
}
