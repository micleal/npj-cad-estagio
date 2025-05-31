import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";
import { auth } from "~/server/auth";
import { DateTimePicker } from "~/components/datetime-picker";
import { CalendarIcon, PrinterIcon } from "lucide-react";
import { AppointmentsDataTable } from "~/components/appointments-datatable";
import { appointmentColumns } from "./_components/appointment-columns";
import type { Metadata } from "next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { PrintReportButton } from "~/components/print-report-button";
import { ShowByAgeDropdown } from "~/components/show-by-age-dropdown";

type UserScheduledDates = {
  id: string;
  scheduledDate: Date;
  status: string;
  attendanceType: string;
  student: {
    id: string;
    name: string;
    ra: string;
  };
};

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard do NPJ - FMU",
};

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const student = await api.student.getStudentByUserId({
    userId: session?.user.id,
  });

  if (!student) {
    return (
      <div className="container mx-auto my-2 flex w-full flex-1">
        Informações do estudante não encontradas
      </div>
    );
  }

  let appointments: UserScheduledDates[] = [];

  if (session.user.role === "admin") {
    appointments = await api.schedule.getAllUsersScheduledDates();
  } else {
    appointments = await api.schedule.getUserScheduledDates();
  }

  console.log(appointments);

  return (
    <div className="container mx-auto my-2 flex w-full flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <p className="text-base text-muted-foreground italic">
          Bem-vindo, {session.user.name.split(" ")[0]}!
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <section id="appointments" className="flex flex-col gap-4">
          <h2 className="font-medium text-lg">Agendamentos</h2>
          <div className="flex items-center justify-between gap-2">
            {session.user.role === "user" && <DateTimePicker />}
            {session.user.role === "admin" && (
              <div className="flex items-center gap-2">
                <PrintReportButton />
              </div>
            )}
            <div className="flex items-center gap-2">
              <ShowByAgeDropdown />
            </div>
          </div>
          <div className="flex gap-2">
            <AppointmentsDataTable
              columns={appointmentColumns}
              data={appointments}
            />
          </div>
        </section>
        {session.user.role === "admin" && (
          <section className="mt-2 flex w-full gap-4">
            <div className="flex w-full flex-1 flex-col gap-4">
              <h2 className="font-medium text-lg">Cadastrar estagiário</h2>
              <div className="flex flex-col gap-2"></div>
            </div>
            <div className="flex w-full flex-1 flex-col gap-4">
              <h2 className="font-medium text-lg">Cadastrar administrador</h2>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
