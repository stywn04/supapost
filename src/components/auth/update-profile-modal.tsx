"use client";
import { UpdateUserType, updateUserSchema } from "@/libs/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ErrorField } from "./field-error";
import { updateUserAction } from "@/actions/user.action";
import { SubmitLoading } from "../submit-loading";
import { uploadImage } from "@/libs/upload-image";
import toast from "react-hot-toast";

interface ModalUpdateUserProps {
  avatar: string;
  username: string;
  name: string;
  bio: string;
  closeModal: () => void;
}
export function UpdateProfileModal({
  avatar,
  username,
  name,
  bio,
  closeModal,
}: ModalUpdateUserProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserType>({
    resolver: zodResolver(updateUserSchema),
  });
  const [imagePick, setImagePick] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [isPending, setTransition] = useTransition();

  function imagePickHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      setImagePick(e.target.files[0]);
    }
  }

  async function updateUserHandler(field: UpdateUserType) {
    setTransition(async () => {
      try {
        if (!imagePick) {
          const status = await updateUserAction(field, avatar);
          if (status?.isError) {
            toast.error(status.message);
            return;
          }
          closeModal();
          toast.success("Profile updated!");
          return;
        }
        const avatar_url = await uploadImage(imagePick);
        const status = await updateUserAction(field, avatar_url);
        if (status?.isError) {
          toast.error(status.message);
          return;
        }
        closeModal();
        toast.success("Profile updated!");
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    });
  }

  useEffect(() => {
    reset({
      username,
      name,
      bio,
    });
  }, [reset, username, name, bio]);
  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 min-h-screen z-50 bg-zinc-950/75 flex items-center justify-center backdrop-blur-lg"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-11/12 md:8/12 lg:w-5/12 bg-zinc-950 border border-zinc-900 p-8 rounded-md animate-in"
      >
        <section className="flex items-center justify-between pb-5">
          <h1 className="font-bold text-xl">Update account</h1>
          <button type="button" onClick={closeModal}>
            <X />
          </button>
        </section>
        <form onSubmit={handleSubmit(updateUserHandler)}>
          <fieldset disabled={isPending} className="flex flex-col gap-3 ">
            <section className="w-full mb-2">
              <div className="w-20 h-20 rounded-full border border-zinc-900 mb-2 overflow-hidden">
                {imagePick ? (
                  <img
                    src={URL.createObjectURL(imagePick)}
                    alt="user avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={avatar}
                    alt="user avatar"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <input
                ref={fileRef}
                onChange={imagePickHandler}
                type="file"
                hidden
              />
              {imagePick ? (
                <button
                  type="button"
                  onClick={() => {
                    setImagePick(null);
                  }}
                  className="bg-transparent py-1 px-4 rounded-md border border-zinc-900"
                >
                  Cancel
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    fileRef.current?.click();
                  }}
                  className="bg-transparent py-1 px-4 rounded-md border border-zinc-900"
                >
                  Update avatar
                </button>
              )}
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full py-2 px-4 rounded-md bg-transparent border border-zinc-900"
                  {...register("name")}
                />
                <ErrorField error={errors.name} />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Username</label>
                <input
                  type="text"
                  id="username"
                  className="w-full py-2 px-4 rounded-md bg-transparent border border-zinc-900"
                  {...register("username")}
                />
                <ErrorField error={errors.username} />
              </div>
            </section>
            <div>
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                className="w-full h-32 p-4 resize-none rounded-md bg-transparent border border-zinc-900"
                {...register("bio")}
              />
              <ErrorField error={errors.bio} />
            </div>
            <button className="w-full rounded-md py-2 bg-zinc-900">
              {isPending ? <SubmitLoading /> : "Update"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
