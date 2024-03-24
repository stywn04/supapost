"use client";
import { LoginType, loginSchema } from "@/libs/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorField } from "@/components/auth";
import { useTransition } from "react";
import { loginAction } from "@/actions/auth.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SubmitLoading } from "../submit-loading";
export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginType>({ resolver: zodResolver(loginSchema) });

  const [isPending, setTransition] = useTransition();
  const router = useRouter();

  async function loginHandler(fields: LoginType) {
    setTransition(async () => {
      const status = await loginAction(fields);
      if (status.isError) {
        toast.error(status.message);
        return;
      }

      toast.success(status.message);
      reset();

      router.push(redirectTo);
    });
  }
  return (
    <form onSubmit={handleSubmit(loginHandler)} className="py-5">
      <fieldset disabled={isPending} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-lg font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="johan@email.com"
            className="w-full py-2 px-4 rounded-md bg-transparent border border-zinc-900"
            {...register("email")}
          />
          <ErrorField error={errors.email} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-lg font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="*******"
            className="w-full py-2 px-4 rounded-md bg-transparent border border-zinc-900"
            {...register("password")}
          />
          <ErrorField error={errors.password} />
        </div>
        <button className="w-full py-2  border border-zinc-900 bg-zinc-900 hover:bg-zinc-950 rounded-md transition-all duration-400">
          {isPending ? <SubmitLoading /> : "Login"}
        </button>
      </fieldset>
    </form>
  );
}
