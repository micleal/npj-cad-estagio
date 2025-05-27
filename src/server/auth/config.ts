import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username, admin } from "better-auth/plugins";
import { db } from "~/server/db";
import { nextCookies } from "better-auth/next-js";
import { TRPCError } from "@trpc/server";

import { env } from "~/env";

export const auth = betterAuth({
  appName: "Cadastro de atendimentos NPJ",
  baseURL: env.BETTER_AUTH_URL.includes("http://")
    ? env.BETTER_AUTH_URL
    : env.BETTER_AUTH_URL.includes("https://")
      ? env.BETTER_AUTH_URL
      : `https://${env.BETTER_AUTH_URL}`,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin(),
    nextCookies(),
    username({
      minUsernameLength: 7,
    }),
  ],
  onAPIError: {
    throw: true,
    onError: (error) => {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error as string,
      });
    },
  },
});
