import { LogOut, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { logoutUser } from "@/app/actions";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import ListingGrid from "@/components/ui/ListingGrid";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const prisma = getPrisma();
  const listings = await prisma.bookListing.findMany({
    where: { ownerId: session.user.id },
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">My Giveaways</h1>
          <p className="text-muted-foreground">
            Mark books as finished, then delete the listing when pickup is done.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/list-book">
              <Plus />
              New listing
            </Link>
          </Button>
          <form action={logoutUser}>
            <Button type="submit" variant="outline">
              <LogOut />
              Logout
            </Button>
          </form>
        </div>
      </div>
      <ListingGrid listings={listings} viewerId={session.user.id} />
    </div>
  );
}
