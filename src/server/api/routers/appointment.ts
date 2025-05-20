import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const appointmentRouter = createTRPCRouter({
  create: publicProcedure
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
    .mutation(async ({ ctx, input }) => {}),
});
