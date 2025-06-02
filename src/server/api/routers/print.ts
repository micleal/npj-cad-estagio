import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { attendanceSchedule, studentInfo } from "~/server/db/schema";
import type { Report, ScheduledDateStatus } from "~/@types";
import { eq, and } from "drizzle-orm";

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

      if (studentId) {
        const studentInfoData = await ctx.db
          .select()
          .from(studentInfo)
          .where(eq(studentInfo.id, studentId));

        const attendanceScheduleData = await ctx.db
          .select()
          .from(attendanceSchedule)
          .where(eq(attendanceSchedule.studentId, studentId));

        console.log(studentInfoData);

        const report: Report[] = [
          {
            student: {
              name: studentInfoData[0]?.name ?? "",
              ra: studentInfoData[0]?.ra ?? "",
              course: studentInfoData[0]?.course ?? "",
              period: studentInfoData[0]?.semester?.toString() ?? "",
            },
            scheduledDates: attendanceScheduleData.map((date) => ({
              date: date.scheduledDate,
              status: date.status as ScheduledDateStatus,
            })),
            reportPeriod: {
              year: year,
              semester: semester,
              type: "semester",
              all: period === "all",
            },
            attendance: {
              total: attendanceScheduleData.length,
              present: attendanceScheduleData.filter(
                (date) => date.status === "attended",
              ).length,
              absent: attendanceScheduleData.filter(
                (date) => date.status === "absent",
              ).length,
              scheduled: attendanceScheduleData.filter(
                (date) => date.status === "scheduled",
              ).length,
              cancelled: attendanceScheduleData.filter(
                (date) => date.status === "cancelled",
              ).length,
            },
          },
        ];

        return report;
      }

      const studentsInfoData = await ctx.db.query.studentInfo.findMany();

      const attendanceScheduleData =
        await ctx.db.query.attendanceSchedule.findMany({
          where: (attendanceSchedule, { eq, not }) =>
            not(eq(attendanceSchedule.status, "cancelled")),
        });

      const report: Report[] = studentsInfoData.map((student) => ({
        student: {
          name: student.name ?? "",
          ra: student.ra ?? "",
          course: student.course ?? "",
          period: student.semester?.toString() ?? "",
        },
        scheduledDates:
          attendanceScheduleData.map((date) => {
            if (date.studentId === student.id) {
              return {
                date: date.scheduledDate,
                status: date.status as ScheduledDateStatus,
              };
            }
          }) ?? [],
        reportPeriod: {
          year: year,
          semester: semester,
          type: "semester",
          all: period === "all",
        },
        attendance: {
          total: attendanceScheduleData.filter(
            (date) => date.studentId === student.id,
          ).length,
          present: attendanceScheduleData.filter(
            (date) =>
              date.status === "attended" && date.studentId === student.id,
          ).length,
          absent: attendanceScheduleData.filter(
            (date) => date.status === "absent" && date.studentId === student.id,
          ).length,
          scheduled: attendanceScheduleData.filter(
            (date) =>
              date.status === "scheduled" && date.studentId === student.id,
          ).length,
          cancelled: attendanceScheduleData.filter(
            (date) =>
              date.status === "cancelled" && date.studentId === student.id,
          ).length,
        },
      }));

      return report;
    }),
});
