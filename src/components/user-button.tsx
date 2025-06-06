import { SettingsIcon, ShieldUserIcon, User } from "lucide-react";
import { auth } from "~/server/auth";
import { SignOut } from "./sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export async function UserButton() {
  const session = await auth();

  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Avatar className="size-7">
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-row items-center gap-2">
            <p className="font-semibold">{user?.name?.split(" ")[0]}</p>
            {user?.role === "admin" && (
              <div className="flex flex-row items-center gap-0.5">
                <ShieldUserIcon className="size-4 text-muted-foreground" />
                <p className="text-muted-foreground text-xs">Admin</p>
              </div>
            )}
          </div>
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1 text-right">
            <p className="font-semibold text-sm">{user?.name}</p>
            {user?.role === "admin" && (
              <p className="flex flex-row items-center justify-end gap-0.5 text-muted-foreground text-xs">
                <ShieldUserIcon className="size-4 text-muted-foreground" />
                Admin
              </p>
            )}
            {user?.role === "user" && (
              <>
                <p className="text-muted-foreground text-xs">Estagiário</p>
                <p className="text-muted-foreground text-xs">RA: {user?.ra}</p>
              </>
            )}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings" className="w-full">
            <SettingsIcon className="size-4" />
            Configurações
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
