import { auth } from "~/server/auth";

import { redirect } from "next/navigation";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { ShieldUserIcon } from "lucide-react";
import { ChangePasswordForm } from "~/components/change-password-form";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="container mx-auto my-2 flex w-full flex-1 flex-col gap-4">
      <h1 className="font-bold text-2xl">Configurações</h1>
      <div className="flex md:grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Dados do usuário</CardTitle>
            <CardDescription>
              Aqui você pode alterar seus dados do usuário.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <p>Nome: {session.user.name}</p>
                {session.user.role === "admin" && (
                  <Badge variant="outline">
                    <ShieldUserIcon className="size-4" /> Admin
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <p>Email: {session.user.email}</p>
                {session.user.emailVerified && (
                  <Badge variant="outline">Verificado</Badge>
                )}
              </div>
              {session.user.role !== "admin" && (
                <div className="flex gap-2">
                  <p>RA: {session.user.ra}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
