"use client";
import { RegisterType, registerSchema } from "@/libs/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorField } from "@/components/auth";
export function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterType>({ resolver: zodResolver(registerSchema) });

  async function registerHandler(fields: RegisterType) {
    console.log(fields);
  }
  return (
    <form onSubmit={handleSubmit(registerHandler)} className="py-5">
      <fieldset className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-lg font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Johan Liebert"
            className="w-full py-2 px-4 rounded-md bg-transparent border border-zinc-900"
            {...register("name")}
          />
          <ErrorField error={errors.name} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-lg font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="liebert"
            className="w-full py-2 px-4 rounded-md bg-transparent border border-zinc-900"
            {...register("username")}
          />
          <ErrorField error={errors.username} />
        </div>
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
          Register
        </button>
      </fieldset>
    </form>
  );
}
