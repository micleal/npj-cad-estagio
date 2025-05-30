"use client";

import { ArrowLeftIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/dashboard") {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          // size="icon"
          className="border border-border not-dark:bg-background not-dark:text-foreground not-dark:hover:border-primary/30 not-dark:hover:bg-primary/20 dark:border-transparent"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon className="size-4" />
          Voltar
        </Button>
      </TooltipTrigger>
      <TooltipContent>Voltar para o dashboard</TooltipContent>
    </Tooltip>
  );
}
