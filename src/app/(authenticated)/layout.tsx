import { AppHeader } from "~/components/app-header";
import { HydrateClient } from "~/trpc/server";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <HydrateClient>
      <AppHeader />
      <main className="flex h-full flex-1 flex-col items-center justify-center px-4 py-2">
        {children}
      </main>
    </HydrateClient>
  );
}
