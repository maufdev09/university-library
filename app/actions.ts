"use server";

import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth, signIn, signOut } from "@/auth";
import { getPrisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { SignUpSchema, giveawaySchema, signInSchema } from "@/lib/validation";

export type ActionResult = {
  success: boolean;
  error?: string;
};

async function getRequiredSession() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  return session;
}

function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export async function registerUser(data: unknown): Promise<ActionResult> {
  const parsed = SignUpSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Please check your signup details." };
  }

  if (!isDatabaseConfigured()) {
    return {
      success: false,
      error: "DATABASE_URL is missing. Add your MongoDB connection string to .env.local and restart the dev server.",
    };
  }

  const prisma = getPrisma();
  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });

  if (existingUser) {
    return { success: false, error: "An account with this email already exists." };
  }

  const role =
    process.env.ADMIN_EMAIL?.toLowerCase() === parsed.data.email.toLowerCase()
      ? "ADMIN"
      : "USER";

  const user = await prisma.user.create({
    data: {
      name: parsed.data.fullName,
      email: parsed.data.email,
      facebookUrl: parsed.data.facebookUrl || null,
      phone: parsed.data.phone || null,
      passwordHash: await hashPassword(parsed.data.password),
      role,
    },
  });

  await prisma.activity.create({
    data: {
      actorId: user.id,
      type: "USER_SIGNED_UP",
      message: `${user.name} created an account.`,
    },
  });

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirect: false,
  });

  revalidatePath("/");

  return { success: true };
}

export async function loginUser(data: unknown): Promise<ActionResult> {
  const parsed = signInSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Enter a valid email and password." };
  }

  if (!isDatabaseConfigured()) {
    return {
      success: false,
      error: "DATABASE_URL is missing. Add your MongoDB connection string to .env.local and restart the dev server.",
    };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: "Invalid email or password." };
    }

    throw error;
  }

  return { success: true };
}

export async function logoutUser() {
  await signOut({ redirectTo: "/" });
}

export async function createGiveaway(formData: FormData) {
  const session = await getRequiredSession();
  const parsed = giveawaySchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    category: formData.get("category"),
    classLevel: formData.get("classLevel"),
    subject: formData.get("subject"),
    condition: formData.get("condition"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl"),
    contactNote: formData.get("contactNote"),
  });

  if (!parsed.success) {
    redirect("/list-book?error=invalid");
  }

  if (!isDatabaseConfigured()) {
    redirect("/list-book?error=database");
  }

  const prisma = getPrisma();
  const listing = await prisma.bookListing.create({
    data: {
      ...parsed.data,
      contactNote: parsed.data.contactNote || null,
      ownerId: session.user.id,
    },
  });

  await prisma.activity.create({
    data: {
      actorId: session.user.id,
      listingId: listing.id,
      type: "LISTING_CREATED",
      message: `${session.user.name ?? "A user"} listed "${listing.title}".`,
    },
  });

  revalidatePath("/");
  redirect("/dashboard");
}

export async function markGivenAway(formData: FormData) {
  const session = await getRequiredSession();
  const listingId = String(formData.get("listingId") ?? "");

  if (!isDatabaseConfigured()) {
    redirect("/dashboard?error=database");
  }

  const prisma = getPrisma();
  const listing = await prisma.bookListing.findUnique({ where: { id: listingId } });

  if (!listing || listing.ownerId !== session.user.id) {
    redirect("/dashboard");
  }

  await prisma.bookListing.update({
    where: { id: listing.id },
    data: { status: "GIVEN_AWAY", givenAwayAt: new Date() },
  });

  await prisma.activity.create({
    data: {
      actorId: session.user.id,
      listingId: listing.id,
      type: "LISTING_GIVEN_AWAY",
      message: `"${listing.title}" was marked as given away.`,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard");
}

export async function deleteListing(formData: FormData) {
  const session = await getRequiredSession();
  const listingId = String(formData.get("listingId") ?? "");

  if (!isDatabaseConfigured()) {
    redirect("/dashboard?error=database");
  }

  const prisma = getPrisma();
  const listing = await prisma.bookListing.findUnique({ where: { id: listingId } });

  if (!listing) {
    return;
  }

  const canDelete = listing.ownerId === session.user.id || session.user.role === "ADMIN";

  if (!canDelete) {
    redirect("/dashboard");
  }

  await prisma.activity.create({
    data: {
      actorId: session.user.id,
      listingId: listing.id,
      type: "LISTING_DELETED",
      message: `"${listing.title}" was deleted.`,
    },
  });

  await prisma.activity.updateMany({
    where: { listingId: listing.id },
    data: { listingId: null },
  });
  await prisma.bookListing.delete({ where: { id: listing.id } });

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/admin");
}
