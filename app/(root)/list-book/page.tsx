import { redirect } from "next/navigation";

import { auth } from "@/auth";
import GiveawayForm from "@/components/ui/GiveawayForm";

export default async function ListBookPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return <GiveawayForm />;
}
