export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center py-10">
      <div className="w-10/12 md:w-8/12 lg:w-5/12">{children}</div>
    </div>
  );
}
