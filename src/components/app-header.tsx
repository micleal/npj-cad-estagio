import { redirect } from "next/navigation";
import { AdminArea } from "~/components/admin-area";
import { ModeToggle } from "~/components/mode-toggle";
import { UserButton } from "~/components/user-button";
import { auth } from "~/server/auth";

export async function AppHeader() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const user = session.user;

  return (
    <header className="flex">
      <div className="container mx-auto flex w-full items-center justify-between px-4 py-2">
        <h1 className="font-bold text-2xl">Núcleo de Prática Jurídica - FMU</h1>
        <div className="flex items-center gap-2">
          {/* {user.role === "admin" && <AdminArea />} */}
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
