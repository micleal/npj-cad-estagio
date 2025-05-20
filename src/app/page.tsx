import { AuthArea } from "~/components/auth-area";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background">
        {!session ? <AuthArea /> : "<Dashboard />"}
      </main>
    </HydrateClient>
  );
}
