import { Search } from "lucide-react";
import { redirect } from "next/navigation";
import { SearchPosts } from "@/components/search-posts";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
};

interface SearchPageProps {
  searchParams: { query: string | undefined };
}
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.query ?? "";
  async function searchQuery(formData: FormData) {
    "use server";
    const query = String(formData.get("query"));
    if (query.length < 1) {
      return;
    }
    redirect(`/search?query=${query}`);
  }
  return (
    <main>
      <form action={searchQuery} className="border border-zinc-700 rounded-md ">
        <fieldset className="px-5 flex items-center justify-between">
          <input
            name="query"
            placeholder="search"
            type="text"
            className="w-full py-2 bg-transparent outline-none"
          />
          <button>
            <Search />
          </button>
        </fieldset>
      </form>
      {query.length > 0 && (
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-10 animate-pulse">
              <p>searching for {query}....</p>
            </div>
          }
          key={query}
        >
          <SearchPosts query={query} />
        </Suspense>
      )}
    </main>
  );
}
