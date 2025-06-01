import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { attendanceSchedule } from "~/server/db/schema";
import type { Report } from "~/@types";

export const printRouter = createTRPCRouter({
  report: protectedProcedure
    .input(
      z.object({
        studentId: z.string().optional(),
        period: z.string().default("all"),
        year: z.number().optional(),
        semester: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { studentId, period, year, semester } = input;

      if (period === "year") {
      }

      const report: Report[] = [
        {
          student: {
            name: "John Doe",
            ra: "1234567890",
            course: "Engenharia de Software",
            period: "2024.1",
          },
          scheduledDates: [
            {
              date: new Date("2025-01-01"),
              status: "present",
            },
            {
              date: new Date("2025-01-02"),
              status: "absent",
            },
            {
              date: new Date("2025-01-03"),
              status: "present",
            },
          ],
          reportPeriod: {
            semester: 1,
            year: 2025,
            type: "year",
            all: true,
          },
          attendance: {
            total: 3,
            present: 2,
            absent: 1,
            scheduled: 0,
            cancelled: 0,
          },
        },
      ];

      return report;
    }),
});
