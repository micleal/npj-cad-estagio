import { appointmentRouter } from "~/server/api/routers/appointment";
import { scheduleRouter } from "~/server/api/routers/schedule";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { printRouter } from "./routers/print";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  appointment: appointmentRouter,
  print: printRouter,
  schedule: scheduleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
