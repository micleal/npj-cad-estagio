"use client";

import { ArrowLeftIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { cn } from "~/lib/utils";

export function BackButton() {
  const pathname = usePathname();

  if (pathname === "/dashboard") {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: "link" }))}
        >
          <ArrowLeftIcon className="size-4" />
          Voltar
        </Link>
      </TooltipTrigger>
      <TooltipContent>Voltar para o dashboard</TooltipContent>
    </Tooltip>
  );
}
