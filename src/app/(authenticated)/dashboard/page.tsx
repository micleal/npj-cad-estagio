import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import {
  Calendar,
  CalendarPrevTrigger,
  CalendarMonthView,
  CalendarWeekView,
  CalendarDayView,
  CalendarNextTrigger,
  CalendarTodayTrigger,
  CalendarCurrentDate,
  CalendarViewTrigger,
  CalendarYearView,
} from "~/components/ui/full-calendar";
import { ChevronLeft } from "lucide-react";
import { ModeToggle } from "~/components/mode-toggle";
import { ChevronRight } from "lucide-react";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }
  
  return (
    <div className="flex w-full flex-1 flex-col gap-4">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-xl">Calendar</h2>
          
        </div>
      </div>
    </div>
  );
}
