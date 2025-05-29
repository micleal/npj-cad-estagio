"use client";

import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { useState } from "react";
import { useSession } from "~/lib/auth-client";
import { api } from "~/trpc/react";

export function DateTimePicker() {
  const { data: session } = useSession();

  const { data: unavailableDates } =
    api.schedule.getUnavailableDates.useQuery();

  console.log("unavailableDates", unavailableDates);

  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [day, setDay] = useState<Date>();

  const currentMonthIndex = new Date().getMonth(); // 0-indexed
  const currentMonthValue = currentMonthIndex + 1; // 1-indexed

  const months = [
    { value: 1, name: "Janeiro" },
    { value: 2, name: "Fevereiro" },
    { value: 3, name: "Março" },
    { value: 4, name: "Abril" },
    { value: 5, name: "Maio" },
    { value: 6, name: "Junho" },
    { value: 7, name: "Julho" },
    { value: 8, name: "Agosto" },
    { value: 9, name: "Setembro" },
    { value: 10, name: "Outubro" },
    { value: 11, name: "Novembro" },
    { value: 12, name: "Dezembro" },
  ];

  return (
    <div className="flex flex-row gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <CalendarIcon className="size-4" />
            <span className="text-muted-foreground text-sm">
              Escolha uma data
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="flex w-full flex-col items-center justify-center gap-2"
        >
          <div className="mb-2">
            <Calendar
              mode="single"
              disabled={[
                { before: new Date() },
                ...(unavailableDates?.map(
                  (d: { date: string }) => new Date(d.date),
                ) ?? []),
              ]}
              disableNavigation={false}
              month={new Date(new Date().getFullYear(), month ?? 0, 1)}
              selected={day}
              components={{
                Caption: ({ ...props }) => (
                  <Select onValueChange={(e) => setMonth(Number(e) - 1)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Escolha o mês" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem
                          key={month.value}
                          value={String(month.value)}
                          disabled={month.value < currentMonthValue}
                        >
                          {month.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ),
              }}
              onDayClick={(e) => setDay(e)}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button>
        <span>Agendar</span>
      </Button>
    </div>
  );
}
