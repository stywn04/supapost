export default function NotFound() {
  return (
    <main className="py-20 text-center max-w-[400px] mx-auto">
      <h1 className="font-semibold text-xl">Post not found!</h1>
      <p className="text-zinc-500">
        sorry we can't find post you looking for, either it never been created
        or already deleted by user
      </p>
    </main>
  );
}
