import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="text-center lg:w-6/12 md:px-0 px-5">
        <h1 className="font-bold text-5xl">Supapost</h1>
        <h4 className="font-semibold text-xl mb-5 text-zinc-300">
          Share your moment with others.
        </h4>
        <p className="text-zinc-500">
          Posting app created with Nextjs and Supabase. Lorem ipsum dolor sit,
          amet consectetur adipisicing elit. Quaerat accusamus cumque voluptas
          in numquam nulla.
        </p>
        <div className="flex items-center justify-center gap-5 mt-5">
          <Link
            href={"/auth/login"}
            className="py-2 px-4 text-zinc-700 hover:text-zinc-200"
          >
            Login
          </Link>
          <Link
            href={"/auth/register"}
            className="py-2 px-4 rounded-md bg-transparent text-zinc-500 border border-zinc-700 hover:bg-white/5 hover:text-zinc-200"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
