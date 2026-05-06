import { ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { deleteListing } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const prisma = getPrisma();
  const [users, listings, activities] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { listings: true, activities: true } } },
    }),
    prisma.bookListing.findMany({
      orderBy: { createdAt: "desc" },
      include: { owner: true },
    }),
    prisma.activity.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
      include: { actor: true },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ShieldCheck className="size-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, listings, and recent activity.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{users.length}</CardTitle>
            <CardDescription>Total users</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{listings.length}</CardTitle>
            <CardDescription>Total listings</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              {listings.filter((listing) => listing.status === "AVAILABLE").length}
            </CardTitle>
            <CardDescription>Available books</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>People registered in the giveaway site.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b text-muted-foreground">
              <tr>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">Listings</th>
                <th className="py-2 pr-4">Activities</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b last:border-0">
                  <td className="py-3 pr-4 font-medium">{user.name}</td>
                  <td className="py-3 pr-4">{user.email}</td>
                  <td className="py-3 pr-4">{user.role}</td>
                  <td className="py-3 pr-4">{user._count.listings}</td>
                  <td className="py-3 pr-4">{user._count.activities}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Listings</CardTitle>
          <CardDescription>Admins can delete any listing.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">{listing.title}</p>
                <p className="text-sm text-muted-foreground">
                  {listing.owner.name} · {listing.status}
                </p>
              </div>
              <form action={deleteListing}>
                <input type="hidden" name="listingId" value={listing.id} />
                <Button type="submit" variant="destructive" size="sm">
                  Delete
                </Button>
              </form>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest account and listing events.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="rounded-lg border p-3 text-sm">
              <p className="font-medium">{activity.message}</p>
              <p className="text-muted-foreground">
                {activity.actor?.email ?? "System"} ·{" "}
                {new Intl.DateTimeFormat("en", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(activity.createdAt)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
