"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface PaginationProps {
  page: number;
  totalPages: number;
}
export function Pagination({ page, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  function prevHandler() {
    if (page <= 1) return;

    if (page === 2) {
      return router.push(pathname);
    }
    router.push(`${pathname}?page=${page - 1}`);
  }
  function nextHandler() {
    if (page >= totalPages) return;

    router.push(`${pathname}?page=${page + 1}`);
  }

  return totalPages > 1 ? (
    <section className="pt-8 flex items-center justify-between">
      <button
        onClick={prevHandler}
        disabled={page <= 1}
        className={`py-1 px-4 rounded-md bg-transparent border border-zinc-900 ${page <= 1 ? "text-zinc-700" : "text-zinc-200"
          }`}
      >
        <span className="flex items-center gap-1">
          <ChevronLeft size={18} /> Prev
        </span>
      </button>
      <div>
        <p className="text-zinc-700 tracking-wide">
          page <span className="text-zinc-200 ">{page}</span> of{" "}
          <span className="text-zinc-200">{totalPages}</span>
        </p>
      </div>
      <button
        onClick={nextHandler}
        disabled={page >= totalPages}
        className={`py-1 px-4 rounded-md bg-transparent border border-zinc-900 ${page >= totalPages ? "text-zinc-700" : "text-zinc-200"
          }`}
      >
        <span className="flex items-center gap-1">
          Next <ChevronRight size={18} />
        </span>
      </button>
    </section>
  ) : null;
}
