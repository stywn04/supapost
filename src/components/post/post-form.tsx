"use client";

import { Camera, X } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";

export function CreatePostForm() {
  const [imagePick, setImagePick] = useState<File | null>(null);
  const [isPending, setTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

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

        formRef.current?.reset();
        setImagePick(null);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    });
  }

  return (
    <form onSubmit={submitHandler} ref={formRef}>
      <fieldset className="flex flex-col gap-3">
        <label htmlFor="content" hidden>
          Content
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="share your thoughts"
          className="w-full h-40 resize-none p-4 rounded-md bg-transparent border border-zinc-900"
        />
        <div className="flex flex-col gap-2">
          {imagePick && (
            <div className="w-6/12 relative">
              <img
                src={URL.createObjectURL(imagePick)}
                alt="image"
                className="w-full h-full object-cover rounded-md"
              />
              <button
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
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  );
}
