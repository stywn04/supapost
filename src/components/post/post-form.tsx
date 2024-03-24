"use client";

import { submitPostAction } from "@/actions/post.action";
import { uploadImage } from "@/libs/upload-image";
import { Camera, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { SubmitLoading } from "../submit-loading";
import toast from "react-hot-toast";

export function CreatePostForm() {
  const [imagePick, setImagePick] = useState<File | null>(null);
  const [isPending, setTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  function imagePickHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      setImagePick(e.target.files[0]);
    }
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setTransition(async () => {
      try {
        const content = String(formData.get("content"));
        if (content.length < 1) throw Error("Can't submit empty content!");

        if (!imagePick) {
          const status = await submitPostAction(content, imagePick);
          if (status.isError) {
            throw Error(status.message);
          }
          formRef.current?.reset();
          setImagePick(null);
          toast.success(status.message);
          router.push("/posts");
          return;
        }

        const image = await uploadImage(imagePick);
        const status = await submitPostAction(content, image);
        if (status.isError) {
          throw Error(status.message);
        }

        toast.success(status.message);
        formRef.current?.reset();
        setImagePick(null);
        router.push("/posts");
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    });
  }

  return (
    <form onSubmit={submitHandler} ref={formRef}>
      <fieldset disabled={isPending} className="flex flex-col gap-3">
        <label htmlFor="content" hidden>
          Content
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="share your thoughts"
          className="w-full h-40 resize-none p-4 rounded-md bg-transparent border border-zinc-900"
        />
        <div className=" gap-2">
          {imagePick && (
            <div className="w-6/12 relative">
              <img
                src={URL.createObjectURL(imagePick)}
                alt="image"
                className="w-full h-full object-cover rounded-md"
              />
              <button
                disabled={isPending}
                type="button"
                onClick={() => {
                  setImagePick(null);
                }}
                className="bg-zinc-950 absolute top-2 right-2"
              >
                <X size={20} />
              </button>
            </div>
          )}
          <input type="file" hidden ref={fileRef} onChange={imagePickHandler} />
          <button
            className="inline"
            disabled={isPending}
            type="button"
            onClick={() => {
              fileRef.current?.click();
            }}
          >
            <span className="flex items-center gap-1  text-zinc-700 hover:text-zinc-300">
              <Camera size={18} />
              add image
            </span>
          </button>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-transparent py-2 px-6 rounded-md border border-zinc-700 "
          >
            {isPending ? <SubmitLoading /> : "Submit"}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
