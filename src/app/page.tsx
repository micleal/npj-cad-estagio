import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthArea } from "~/components/auth-area";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { buttonVariants } from "~/components/ui/button";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background">
        {!session ? (
          <AuthArea />
        ) : (
          <Link
            href="/dashboard"
            className={buttonVariants({ variant: "default" })}
          >
            Dashboard
          </Link>
        )}
      </main>
    </HydrateClient>
  );
}
