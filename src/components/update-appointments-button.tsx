"use client";

import { Button } from "./ui/button";
import { RefreshCwIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useRouter } from "next/navigation";

export function UpdateAppointmentsButton() {
  const router = useRouter();

  const handleUpdateAppointments = async () => {
    router.refresh();
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={handleUpdateAppointments}
        >
          <RefreshCwIcon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Atualizar agendamentos</TooltipContent>
    </Tooltip>
  );
}
