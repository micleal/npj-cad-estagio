import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";
import { auth } from "~/server/auth";
import { DateTimePicker } from "~/components/datetime-picker";
import { CalendarIcon } from "lucide-react";
import { AppointmentsDataTable } from "~/components/appointments-datatable";
import { appointmentColumns } from "./_components/appointment-columns";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const student = await api.student.getStudentByUserId({
    userId: session?.user.id,
  });

  if (!student) {
    return <div>Informações do estudante não encontradas</div>;
  }

  const appointments = await api.schedule.getUserScheduledDates();

  console.log("appointments", appointments);

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
            <DateTimePicker />
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <CalendarIcon className="size-4" />
                <span>Hoje</span>
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <AppointmentsDataTable columns={appointmentColumns} data={appointments} />
          </div>
        </section>
        {/* <section className="flex flex-col gap-4"></section> */}
      </div>
    </div>
  );
}
