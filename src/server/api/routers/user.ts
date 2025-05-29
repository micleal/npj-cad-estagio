import z from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        ra: z.string(),
        role: z.enum(["admin", "user"]),
        image: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, ra } = input;
    }),
});
