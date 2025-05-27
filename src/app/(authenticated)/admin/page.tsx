import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { SignUp } from "~/components/sign-up";

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
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Adicionar usuário</CardTitle>
              <CardDescription>
                Adicione um novo usuário ao sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignUp />
            </CardContent>
          </Card>
        </section>
      </div>
    </HydrateClient>
  );
}
