"use client";

import { PrinterIcon } from "lucide-react";
import { useSession } from "~/lib/auth-client";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function PrintReportButton() {
  const { data: session } = useSession();

  if (session?.user.role !== "admin") {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          title="Imprimir relatório"
          className="border border-primary bg-primary/50 text-foreground transition-none hover:bg-primary/70"
        >
          <PrinterIcon className="size-4" />
          Imprimir
        </Button>
      </TooltipTrigger>
      <TooltipContent>Imprimir relatório</TooltipContent>
    </Tooltip>
  );
}
