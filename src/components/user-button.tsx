import { User } from "lucide-react";
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

export async function UserButton() {
  const session = await auth();

  const user = session?.user;

  user.role = "admin";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="user">
          <Avatar className="size-7">
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-semibold">{user?.name?.split(" ")[0]}</p>
          </div>
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col text-right">
            <p className="font-semibold text-sm">{user?.name}</p>
            <p className="text-muted-foreground text-sx">
              RA: {user?.username}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
