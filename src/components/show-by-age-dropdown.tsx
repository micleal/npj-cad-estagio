"use client";

import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSelectedDate } from "~/hooks/use-selected-date";
import { cn } from "~/lib/utils";

export function ShowByAgeDropdown() {
  const { selectedDate, setSelectedDate } = useSelectedDate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <CalendarIcon className="size-4" />
          {selectedDate === "today"
            ? "Hoje"
            : selectedDate === "week"
              ? "Semana"
              : "Mês"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setSelectedDate("today")}
          className={cn(
            selectedDate === "today" &&
              "border border-primary bg-primary/50 text-primary-foreground",
          )}
        >
          <CalendarIcon className="size-4" />
          Hoje
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setSelectedDate("week")}
          className={cn(
            selectedDate === "week" &&
              "border border-primary bg-primary/50 text-primary-foreground",
          )}
        >
          <CalendarIcon className="size-4" />
          Semana
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setSelectedDate("month")}
          className={cn(
            selectedDate === "month" &&
              "border border-primary bg-primary/50 text-primary-foreground",
          )}
        >
          <CalendarIcon className="size-4" />
          Mês
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
