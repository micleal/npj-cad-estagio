import { TRPCError } from "@trpc/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { admin, username } from "better-auth/plugins";
import { db } from "~/server/db";

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
    onError: (error, ctx) => {
      if (error instanceof APIError) {
        throw new TRPCError({
          code: error.status as TRPCError["code"],
          message: error.body?.message,
        });
      }
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // Se a rota não for de cadastro, retorna
      if (ctx.path !== "/sign-up/email" && ctx.path !== "/sign-up/username") {
        return;
      }
      // Verifica se o email é do domínio @fmu.edu.br
      if (
        !ctx.body?.email.endsWith("@fmu.edu.br") ||
        !ctx.body?.email.endsWith("@fmu.br")
      ) {
        // Se não for, retorna um erro
        throw new APIError("BAD_REQUEST", {
          message: "Email deve ser o email institucional",
        });
      }
    }),
  },
});
