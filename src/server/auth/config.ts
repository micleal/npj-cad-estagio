import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { db } from "~/server/db";

import { env } from "~/env";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  appName: "Cadastro de atendimentos NPJ",
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    username({
      minUsernameLength: 7,
    }),
  ],
});
