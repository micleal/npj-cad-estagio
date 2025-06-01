import { z } from "zod";
import { convertImageToBase64 } from "~/lib/image";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { studentInfo } from "~/server/db/schema";

export const studentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ ra: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { ra, name } = input;

      const student = await db
        .insert(studentInfo)
        .values({
          ra,
          name,
          userId: ctx.session.user.id,
        })
        .returning();

      return student;
    }),
  getStudentByUserId: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const student = await db.query.studentInfo.findFirst({
        where: (studentInfo, { eq }) => eq(studentInfo.userId, input.userId),
      });

      return student;
    }),
  getAllStudents: protectedProcedure.query(async ({ ctx }) => {
    const students = await db.query.studentInfo.findMany();

    return students;
  }),
});
