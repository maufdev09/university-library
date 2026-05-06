import Link from "next/link";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import BookSearch from "@/components/ui/BookSearch";
import ListingGrid from "@/components/ui/ListingGrid";
import { getPrisma } from "@/lib/prisma";
import { bookCategories } from "@/lib/categories";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const category = bookCategories.includes(params.category as never)
    ? params.category ?? ""
    : "";
  const listings = await (async () => {
    try {
      const prisma = getPrisma();
      const searchFilters = query
        ? [
            { title: { contains: query, mode: "insensitive" as const } },
            { author: { contains: query, mode: "insensitive" as const } },
            { description: { contains: query, mode: "insensitive" as const } },
            { condition: { contains: query, mode: "insensitive" as const } },
            { category: { contains: query, mode: "insensitive" as const } },
            { classLevel: { contains: query, mode: "insensitive" as const } },
            { subject: { contains: query, mode: "insensitive" as const } },
          ]
        : undefined;

      return await prisma.bookListing.findMany({
        where: {
          status: "AVAILABLE",
          ...(category ? { category } : {}),
          ...(searchFilters ? { OR: searchFilters } : {}),
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
              facebookUrl: true,
              phone: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      return [];
    }
  })();

  return (
    <div className="space-y-10">
      <section className="relative min-h-[64vh] overflow-hidden rounded-lg bg-foreground text-background">
        <img
          src="/librery1.jpg"
          alt="Books on library shelves"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative flex min-h-[64vh] max-w-3xl flex-col justify-center gap-6 p-6 md:p-12">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Community book sharing
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Give books you no longer need to someone who does.
          </h1>
          <p className="max-w-2xl text-lg text-white/80">
            List an unwanted book, share your email, phone, or Facebook link,
            and let another reader contact you for pickup.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/list-book">List a book</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#available-books">Browse books</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="available-books" className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold">Available Giveaways</h2>
            <p className="text-muted-foreground">
              Contact the owner directly to arrange pickup.
              {query || category ? " Results are filtered below." : ""}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard">Manage my listings</Link>
          </Button>
        </div>
        <BookSearch query={query} category={category} />
        <ListingGrid
          listings={listings}
          viewerId={session?.user?.id}
          isAdmin={session?.user?.role === "ADMIN"}
        />
      </section>
    </div>
  );
}
