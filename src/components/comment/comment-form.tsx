"use client";

import { commentAction } from "@/actions/post.action";
import { useTransition, useRef } from "react";
import { SubmitLoading } from "../submit-loading";
import toast from "react-hot-toast";

export function CommentForm({ post_id }: { post_id: string }) {
  const [isPending, setTransition] = useTransition();
  const formRef = useRef<HTMLFormElement | null>(null);

  async function submitComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = String(formData.get("content"));
    setTransition(async () => {
      try {
        if (content.length < 1) {
          throw Error("Cannot submit empty comment!");
        }
        const status = await commentAction(post_id, content);
        if (status?.isError) {
          toast.error(status.message);
          return;
        }
        formRef.current?.reset();
        toast.success("Comment submitted!");
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    });
  }
  return (
    <form onSubmit={submitComment} ref={formRef}>
      <fieldset disabled={isPending}>
        <textarea
          name="content"
          placeholder="wanna say something ?"
          className="w-full h-20 resize-none bg-transparent border-none outline-none"
        />
        <div className="flex justify-end">
          <button className="py-1 px-4 rounded bg-zinc-900">
            {isPending ? <SubmitLoading /> : "Submit"}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
