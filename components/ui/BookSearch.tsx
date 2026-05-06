import { Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bookCategories } from "@/lib/categories";

export default function BookSearch({
  query,
  category,
}: {
  query: string;
  category: string;
}) {
  return (
    <form
      action="/"
      className="grid gap-3 rounded-lg border bg-card p-3 sm:grid-cols-[1fr_220px_auto_auto] sm:items-center"
    >
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          name="q"
          defaultValue={query}
          placeholder="Search title, author, condition..."
          className="pl-9"
        />
      </div>
      <select
        name="category"
        defaultValue={category}
        className="h-8 rounded-lg border border-input bg-background px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <option value="">All categories</option>
        {bookCategories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <Button type="submit">
        <Search />
        Search
      </Button>
      {(query || category) ? (
        <Button asChild type="button" variant="outline">
          <Link href="/#available-books">Clear</Link>
        </Button>
      ) : null}
    </form>
  );
}
