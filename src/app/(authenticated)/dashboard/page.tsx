import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { auth } from "~/server/auth";
import { AppointmentsDataTable } from "~/components/appointments-datatable";
import { appointmentColumns } from "./_components/appointment-columns";
import type { Metadata } from "next";
import { AppointmentsDataTableToolbar } from "~/components/appointments-datatable-toolbar";
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

  let appointments: UserScheduledDates[] = [];

  if (session.user.role === "admin") {
    appointments = await api.schedule.getAllUsersScheduledDates();
  } else {
    appointments = await api.schedule.getUserScheduledDates();
  }

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
          <AppointmentsDataTableToolbar />
          <div className="flex gap-2">
            <AppointmentsDataTable
              columns={appointmentColumns}
              data={appointments}
            />
          </div>
        </section>
        {/* {session.user.role === "admin" && (
          <section className="mt-2 flex w-full gap-4">
            <div className="flex w-full flex-1 flex-col gap-4">
              <h2 className="font-medium text-lg">Cadastrar estagiário</h2>
              <div className="flex flex-col gap-2">
                <p>
                  Cadastre um estagiário para que ele possa agendar consultas no
                  sistema.
                </p>
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col gap-4">
              <h2 className="font-medium text-lg">Cadastrar administrador</h2>
            </div>
          </section>
        )} */}
      </div>
    </div>
  );
}
