import { deletePostAction } from "@/actions/post.action";
import { Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { SubmitLoading } from "../submit-loading";

export function DeletePost({ post_id }: { post_id: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
        <Trash />
      </button>
      {open && <ModalDeletePost post_id={post_id} closeModal={closeModal} />}
    </>
  );
}

interface ModalDeletePostProps {
  post_id: string;
  closeModal: () => void;
}

function ModalDeletePost({ post_id, closeModal }: ModalDeletePostProps) {
  const [isPending, setTransition] = useTransition();
  const pathname = usePathname();
  async function deleteHandler() {
    setTransition(async () => {
      try {
        const status = await deletePostAction(post_id, pathname);
        if (status?.isError) {
          throw Error(status.message);
        }
        toast.success("Post deleted!");
        closeModal();
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    });
  }
  return (
    <div
      onClick={() => {
        if (!isPending) {
          closeModal();
        }
      }}
      className="min-h-screen bg-zinc-950/85 backdrop-blur-lg fixed inset-0 z-50 flex items-center justify-center text-white"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-10/12 md:w-8/12 lg:w-5/12 bg-zinc-950 border border-zinc-900 p-5 rounded-md animate-in"
      >
        <h1 className="font-semibold text-lg text-zinc-300">
          Are you sure delete this post ?
        </h1>
        <div className="flex items-center justify-end gap-5 mt-5">
          <button
            disabled={isPending}
            className="text-zinc-700 hover:text-zinc-300"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            disabled={isPending}
            onClick={deleteHandler}
            className="py-1 px-4 rounded bg-transparent border border-red-700 text-red-700 hover:bg-white/5"
          >
            {isPending ? <SubmitLoading /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
