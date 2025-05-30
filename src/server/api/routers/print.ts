import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const printRouter = createTRPCRouter({
  report: protectedProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        type: z.enum(["all", "month", "week", "day"]).default("all"),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { userId, type, startDate, endDate } = input;
    }),
});
