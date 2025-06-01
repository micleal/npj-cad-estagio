import { DateTimePicker } from "./datetime-picker";
import { ShowByAgeDropdown } from "./show-by-age-dropdown";
import { auth } from "~/server/auth";
import { PrintReportButton } from "./print-report-button";
import { UpdateAppointmentsButton } from "./update-appointments-button";

export async function AppointmentsDataTableToolbar() {
  const session = await auth();

  if (!session) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-2">
      {session.user.role === "user" && <DateTimePicker />}
      {session.user.role === "admin" && (
        <div className="flex items-center gap-2">
          <PrintReportButton />
        </div>
      )}
      <div className="flex items-center gap-2">
        <UpdateAppointmentsButton />  
        <ShowByAgeDropdown />
      </div>
    </div>
  );
}
