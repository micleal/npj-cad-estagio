import { redirect } from "next/navigation";
import { ModeToggle } from "~/components/mode-toggle";
import { UserButton } from "~/components/user-button";
import { auth } from "~/server/auth";
import { BackButton } from "./back-button";

export async function AppHeader() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const user = session.user;

  return (
    <header className="flex">
      <div className="container mx-auto flex w-full items-center justify-between py-2">
        <h1 className="font-bold text-2xl">Núcleo de Prática Jurídica - FMU</h1>
        <div className="flex items-center gap-2">
          <BackButton />
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
