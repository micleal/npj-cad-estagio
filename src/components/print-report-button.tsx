"use client";

import { PrinterIcon } from "lucide-react";
import { useSession } from "~/lib/auth-client";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { api } from "~/trpc/react";
import { useState } from "react";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import Link from "next/link";
import { cn } from "~/lib/utils";

export function PrintReportButton() {
  const { data: session } = useSession();
  const { data: students } = api.student.getAllStudents.useQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");

  if (session?.user.role !== "admin") {
    return null;
  }

  const handlePrintReport = async () => {
    setIsLoading(true);
    // await api.schedule.printReport();
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          title="Imprimir relatório"
          className="border border-primary bg-primary/50 text-foreground transition-none hover:bg-primary/70"
        >
          <PrinterIcon className="size-4" />
          Imprimir
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Imprimir relatório</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="flex flex-col gap-2">
            <Select
              onValueChange={(value) => setSelectedStudent(value)}
              value={selectedStudent ?? undefined}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o aluno" />
              </SelectTrigger>
              <SelectContent>
                {students?.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-between gap-2">
              <Input
                type="date"
                value={selectedPeriod ?? undefined}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              />
            </div>
          </div>
          <Link
            href={`/admin/print-report?studentId=${selectedStudent}&period=${selectedPeriod}`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full",
              isLoading && "cursor-not-allowed",
            )}
          >
            {isLoading ? "Imprimindo..." : "Imprimir"}
          </Link>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
