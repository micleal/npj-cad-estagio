import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const appointmentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string(),
        date: z.date(),
        time: z.string(),
        message: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, phone, date, time, message } = input;

      const appointment = await ctx.db.insert(appointment).values({
        name,
      });
    }),
});
