import { and, asc, desc, eq, not } from "drizzle-orm";
import { z } from "zod";
import {
  attendanceSchedule,
  dailyScheduleLimit,
  session,
  studentInfo,
} from "~/server/db/schema";
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

      const countScheduledDates = await ctx.db.$count(
        attendanceSchedule,
        and(
          eq(attendanceSchedule.studentId, studentInfo.id),
          not(eq(attendanceSchedule.status, "cancelled")),
        ),
      );

      console.log("countScheduledDates:", countScheduledDates);

      if (countScheduledDates >= 3) {
        throw new Error("Student has already scheduled 3 dates");
      }

      const verifySchedule = await ctx.db.query.dailyScheduleLimit.findFirst({
        where: (dailyScheduleLimit, { eq }) =>
          eq(dailyScheduleLimit.date, startDateString),
      });

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
        })
        .returning();

      return {
        studentInfo,
        attendanceScheduleInfo,
      };
    }),
  getAllUsersScheduledDates: protectedProcedure.query(async ({ ctx }) => {
    const scheduledDates = await ctx.db
      .select()
      .from(attendanceSchedule)
      .leftJoin(studentInfo, eq(attendanceSchedule.studentId, studentInfo.id))
      .orderBy(asc(attendanceSchedule.scheduledDate));

    const allUsersScheduledDates = scheduledDates.map((d) => {
      if (d.student_info) {
        return {
          id: d.attendance_schedule.id,
          scheduledDate: d.attendance_schedule.scheduledDate,
          status: d.attendance_schedule.status,
          attendanceType: d.attendance_schedule.attendanceType,
          student: {
            id: d.student_info.id,
            name: d.student_info.name,
            ra: d.student_info.ra,
          },
        };
      }

      return null;
    });

    return allUsersScheduledDates.filter((d) => d !== null);
  }),
  getUserScheduledDates: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;

    const student = await ctx.db.query.studentInfo.findFirst({
      where: (studentInfo, { eq }) => eq(studentInfo.userId, userId),
    });

    if (!student) {
      throw new Error("Student not found");
    }

    const scheduledDates = await ctx.db.query.attendanceSchedule.findMany({
      where: (attendanceSchedule, { eq }) =>
        eq(attendanceSchedule.studentId, student.id),
    });

    const userScheduledDates = scheduledDates.map((date) => ({
      id: date.id,
      scheduledDate: date.scheduledDate,
      status: date.status,
      attendanceType: date.attendanceType,
      student: {
        id: student.id,
        name: student.name,
        ra: student.ra,
      },
    }));

    return userScheduledDates ?? [];
  }),
  getUnavailableDates: protectedProcedure.query(async ({ ctx }) => {
    const dates = await ctx.db.query.dailyScheduleLimit.findMany({
      where: (dailyScheduleLimit, { eq }) =>
        eq(
          dailyScheduleLimit.currentRegistrations,
          dailyScheduleLimit.maxRegistrations,
        ),
    });

    return dates;
  }),
});
