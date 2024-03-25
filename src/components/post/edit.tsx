import { editPostAction } from "@/actions/post.action";
import { postSchema, postType } from "@/libs/schema/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Edit } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ErrorField } from "../auth";
import { usePathname } from "next/navigation";
import { SubmitLoading } from "../submit-loading";
import toast from "react-hot-toast";

interface EditPostProps {
  post_id: string;
  content: string;
}
export function EditPost({ post_id, content }: EditPostProps) {
  const [open, setOpen] = useState(false);
  function closeModal() {
    setOpen(false);
  }

  useEffect(() => {
    if (document) {
      document.body.style.overflow = open ? "hidden" : "auto";
    }
  }, [open]);
  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        <Edit />
      </button>
      {open && (
        <ModalEditPost
          post_id={post_id}
          content={content}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

interface ModalEditPostProps {
  post_id: string;
  content: string;
  closeModal: () => void;
}
function ModalEditPost({ post_id, content, closeModal }: ModalEditPostProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<postType>({ resolver: zodResolver(postSchema) });
  const [isPending, setTransition] = useTransition();
  const pathname = usePathname();

  async function editPostHandler(field: postType) {
    setTransition(async () => {
      try {
        const status = await editPostAction(field, post_id, pathname);
        if (status.error) {
          throw Error(status.message);
        }
        toast.success(status.message);
        closeModal();
        reset();
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    });
  }

  useEffect(() => {
    reset({ content });
  }, [content]);
  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 min-h-screen bg-zinc-950/80 backdrop-blur-lg  flex items-center justify-center text-white"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-10/12 md:w-8/12 lg:w-5/12 bg-zinc-950 p-5 rounded-md border border-zinc-900 animate-in"
      >
        <section className="flex items-center justify-between">
          <h1 className="font-semibold text-xl">Edit Post</h1>
          <button type="button" onClick={closeModal}>
            <X />
          </button>
        </section>
        <form onSubmit={handleSubmit(editPostHandler)} className="mt-5 mb-2">
          <fieldset disabled={isPending}>
            <textarea
              className="w-full h-32 p-4 resize-none rounded bg-transparent border border-zinc-900 "
              {...register("content")}
            />
            <ErrorField error={errors.content} />
            <div className="flex justify-end">
              <button className="py-1 px-4 rounded bg-transparent border border-zinc-900">
                {isPending ? <SubmitLoading /> : "Edit"}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
