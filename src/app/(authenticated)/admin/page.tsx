import { redirect } from "next/navigation";
import { SignUpForm } from "~/components/signup-form";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <HydrateClient>
      <div className="flex w-full flex-1 flex-col">
        <h1 className="font-bold text-2xl">Admin</h1>
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SignUpForm />
        </section>
      </div>
    </HydrateClient>
  );
}
