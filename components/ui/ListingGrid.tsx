import {
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Mail,
  Phone,
  Trash2,
} from "lucide-react";

import { deleteListing, markGivenAway } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Listing = {
  id: string;
  title: string;
  author: string;
  category: string;
  classLevel: string | null;
  subject: string | null;
  condition: string;
  description: string;
  imageUrl: string;
  contactNote: string | null;
  status: "AVAILABLE" | "GIVEN_AWAY";
  createdAt: Date;
  owner: {
    id: string;
    name: string;
    email: string;
    facebookUrl: string | null;
    phone: string | null;
  };
};

export default function ListingGrid({
  listings,
  viewerId,
  isAdmin = false,
}: {
  listings: Listing[];
  viewerId?: string;
  isAdmin?: boolean;
}) {
  if (listings.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
        No giveaway books are listed yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => {
        const canManage = viewerId === listing.owner.id || isAdmin;
        const isOwner = viewerId === listing.owner.id;

        return (
          <Card key={listing.id} className="rounded-lg">
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="aspect-[4/3] w-full object-cover"
            />
            <CardHeader>
              <CardTitle>{listing.title}</CardTitle>
              <CardDescription>
                by {listing.author} · {listing.category}
              </CardDescription>
              <CardAction>
                <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {listing.status === "AVAILABLE" ? "Available" : "Given away"}
                </span>
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{listing.description}</p>
              <div className="grid gap-2 text-sm">
                {listing.category === "Academic" ? (
                  <span className="font-medium">
                    {listing.classLevel ? `${listing.classLevel}` : "Academic"}
                    {listing.subject ? ` · ${listing.subject}` : ""}
                  </span>
                ) : null}
                <span className="font-medium">Condition: {listing.condition}</span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="size-4" />
                  {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
                    listing.createdAt,
                  )}
                </span>
              </div>
              <div className="rounded-lg bg-muted p-3 text-sm">
                <p className="font-medium">{listing.owner.name}</p>
                {listing.contactNote ? (
                  <p className="text-muted-foreground">{listing.contactNote}</p>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a href={`mailto:${listing.owner.email}`}>
                      <Mail />
                      Email
                    </a>
                  </Button>
                  {listing.owner.facebookUrl ? (
                    <Button asChild variant="outline" size="sm">
                      <a href={listing.owner.facebookUrl} target="_blank" rel="noreferrer">
                        <ExternalLink />
                        Facebook
                      </a>
                    </Button>
                  ) : null}
                  {listing.owner.phone ? (
                    <Button asChild variant="outline" size="sm">
                      <a href={`tel:${listing.owner.phone}`}>
                        <Phone />
                        Phone
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            </CardContent>
            {canManage ? (
              <CardFooter className="gap-2">
                {isOwner && listing.status === "AVAILABLE" ? (
                  <form action={markGivenAway}>
                    <input type="hidden" name="listingId" value={listing.id} />
                    <Button type="submit" variant="outline" size="sm">
                      <CheckCircle2 />
                      Finished
                    </Button>
                  </form>
                ) : null}
                <form action={deleteListing}>
                  <input type="hidden" name="listingId" value={listing.id} />
                  <Button type="submit" variant="destructive" size="sm">
                    <Trash2 />
                    Delete
                  </Button>
                </form>
              </CardFooter>
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}
