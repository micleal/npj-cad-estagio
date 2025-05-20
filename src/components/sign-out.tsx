"use client";

import { signOut } from "~/lib/auth-client";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TRPCError } from "@trpc/server";

export function SignOut() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={async () =>
        await signOut({
          fetchOptions: {
            onError(ctx) {
              toast.error(ctx.error.message);
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: ctx.error.message,
              });
            },
            onSuccess: () => {
              router.push("/"); // redireciona para a página inicial
            },
          },
        })
      }
    >
      <LogOut />
      Sair
    </Button>
  );
}
