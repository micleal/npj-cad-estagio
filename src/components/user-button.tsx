import { ShieldUserIcon, User } from "lucide-react";
import { auth } from "~/server/auth";
import { SignOut } from "./sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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
          <div className="flex flex-col text-right">
            <p className="font-semibold text-sm">{user?.name}</p>
            <p className="text-muted-foreground text-sx">RA: {user?.ra}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
