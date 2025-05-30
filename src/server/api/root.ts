import { scheduleRouter } from "~/server/api/routers/schedule";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { printRouter } from "./routers/print";
import { studentRouter } from "./routers/student";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  print: printRouter,
  schedule: scheduleRouter,
  student: studentRouter,
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
