import { toNextJsHandler } from "better-auth/next-js";
import { handler } from "~/server/auth";

export const { GET, POST } = toNextJsHandler(handler);
