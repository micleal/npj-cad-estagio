"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "~/lib/auth-client";
import { api } from "~/trpc/react";

export default function CreateAttendanceSchedule() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  const userId = session.user.id;

  const router = useRouter();
  const { data, isPending, isError, error, mutate } =
    api.schedule.create.useMutation({
      onSuccess: ({ studentInfo, attendanceScheduleInfo }) => {
        toast.success("Attendance schedule created successfully");
        router.refresh();
      },
      onError: () => {
        toast.error("Failed to create attendance schedule");
        console.log(error);
      },
    });
  return (
    <div>
      <h1>Create Attendance Schedule</h1>
      <button
        type="button"
        onClick={() =>
          mutate({
            name: "Test",
            startDate: new Date(),
            endDate: new Date(),
            description: "Test",
            userId,
          })
        }
      >
        Create
      </button>
    </div>
  );
}
