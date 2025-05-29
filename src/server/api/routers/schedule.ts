import { eq } from "drizzle-orm";
import { z } from "zod";
import { attendanceSchedule, dailyScheduleLimit } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const scheduleRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        description: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, startDate, endDate, description, userId } = input;

      const startDateString = new Date(startDate).toDateString();

      const studentInfo = await ctx.db.query.studentInfo.findFirst({
        where: (studentInfo, { eq }) => eq(studentInfo.userId, userId),
      });

      if (!studentInfo) {
        throw new Error("Student not found");
      }

      const verifySchedule = await ctx.db.query.dailyScheduleLimit.findFirst({
        where: (dailyScheduleLimit, { eq }) =>
          eq(dailyScheduleLimit.date, startDateString),
      });

      if (
        verifySchedule &&
        verifySchedule.currentRegistrations < verifySchedule.maxRegistrations
      ) {
        await ctx.db
          .update(dailyScheduleLimit)
          .set({
            currentRegistrations: verifySchedule.currentRegistrations + 1,
          })
          .where(eq(dailyScheduleLimit.id, verifySchedule.id));

        const attendanceScheduleInfo = await ctx.db
          .insert(attendanceSchedule)
          .values({
            studentId: studentInfo.id,
            scheduledDate: startDate,
            dailyScheduleId: verifySchedule.id,
            status: "scheduled",
            attendanceType: "registration",
            notes: description,
          });

        return {
          studentInfo,
          attendanceScheduleInfo,
        };
      }

      if (
        verifySchedule &&
        verifySchedule.currentRegistrations >= verifySchedule.maxRegistrations
      ) {
        throw new Error("Schedule is full");
      }

      const schedule = await ctx.db
        .insert(dailyScheduleLimit)
        .values({
          date: startDateString,
          currentRegistrations: 1,
        })
        .returning();

      if (!schedule[0]) {
        throw new Error("Schedule not found");
      }

      const attendanceScheduleInfo = await ctx.db
        .insert(attendanceSchedule)
        .values({
          studentId: studentInfo.id,
          scheduledDate: startDate,
          attendanceType: "registration",
          dailyScheduleId: schedule[0].id,
          notes: description,
        });

      return {
        studentInfo,
        attendanceScheduleInfo,
      };
    }),
  getUnavailableDates: protectedProcedure.query(async ({ ctx }) => {
    const dates = await ctx.db.query.dailyScheduleLimit.findMany({
      where: (dailyScheduleLimit, { eq }) =>
        eq(dailyScheduleLimit.currentRegistrations, dailyScheduleLimit.maxRegistrations),
    });

    console.log("dates", dates);

    return dates;
  }),
});
