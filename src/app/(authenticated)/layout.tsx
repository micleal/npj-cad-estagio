import { redirect } from "next/navigation";
import { AppHeader } from "~/components/app-header";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <HydrateClient>
      <AppHeader />
      <main className="flex flex-col items-center justify-center">
        {children}
      </main>
    </HydrateClient>
  );
}
