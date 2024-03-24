export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-xl mx-auto py-28">{children}</div>
    </div>
  );
}
