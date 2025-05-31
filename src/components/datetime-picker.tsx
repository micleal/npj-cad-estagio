"use client";

import { CalendarIcon, CalendarPlusIcon } from "lucide-react";
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
import { cn } from "~/lib/utils";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "./ui/form";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  date: z.date(),
});

export function DateTimePicker() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  const { data: session } = useSession();

  const { data: unavailableDates } =
    api.schedule.getUnavailableDates.useQuery();

  const scheduleMutation = api.schedule.create.useMutation({
    onSuccess: ({ studentInfo, attendanceScheduleInfo }) => {
      const msg = `${studentInfo}, seu atendimento foi agendado com sucesso para o dia ${format(
        attendanceScheduleInfo[0]?.scheduledDate ?? new Date(),
        "dd/MM/yyyy",
      )}.`;
      toast.success(msg);
      form.reset();
      setOpen(false);
      setDay(undefined);
      setMonth(new Date().getMonth());
      router.refresh();
    },
    onError: ({ shape }) => {
      toast.error("Erro ao agendar atendimento", {
        id: "error-toast",
        description: `Código do erro: ${shape?.code}`,
        action: {
          label: "Fechar",
          onClick: () => {
            toast.dismiss("error-toast");
          },
        },
      });
    },
  });

  const [open, setOpen] = useState(false);
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

  const onSubmit = async ({ date }: z.infer<typeof formSchema>) => {
    console.log(date);
    if (date) {
      scheduleMutation.mutate({
        name: session?.user.name ?? "",
        userId: session?.user.id ?? "",
        description: "teste",
        startDate: date,
        endDate: date,
      });
    } else {
      toast.error("Data inválida", {
        id: "date-error-toast",
        description:
          "A data selecionada é inválida, data deve ser maior que a data atual",
        action: {
          label: "Fechar",
          onClick: () => {
            toast.dismiss("date-error-toast");
          },
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full gap-2">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex w-full flex-1 flex-row">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Escolha uma data</span>
                      )}
                      <CalendarIcon className="ml-auto size-4 text-muted-foreground opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
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
                        defaultMonth={field.value}
                        month={
                          new Date(new Date().getFullYear(), month ?? 0, 1)
                        }
                        selected={day || field.value}
                        components={{
                          Caption: ({ ...props }) => (
                            <Select
                              defaultValue={String(month + 1)}
                              onValueChange={(e) => setMonth(Number(e) - 1)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Escolha o mês" />
                              </SelectTrigger>
                              <SelectContent className="h-64">
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
                        onDayClick={(e) => setOpen(false)}
                        onSelect={(e) => {
                          e?.setHours(0, 0);
                          setDay(e);
                          field.onChange(e);
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="border border-primary bg-primary/50 text-foreground transition-none hover:bg-primary/70"
          >
            <CalendarPlusIcon className="size-4" />
            Agendar
          </Button>
        </div>
      </form>
    </Form>
  );
}
