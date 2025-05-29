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
        <Button variant="ghost" size="icon" title="Imprimir relatório">
          <PrinterIcon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="border border-border bg-background">
        Imprimir relatório
      </TooltipContent>
    </Tooltip>
  );
}
