import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { env } from "~/env";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  user: {
    additionalFields: {
      role: {
        type: "string",
        enum: ["user", "admin", "student"],
        default: "user",
        input: false,
      },
      ra: {
        type: "string",
        required: true,
        input: true,
      },
    },
  },
  plugins: [adminClient()],
});

export const { signIn, signOut, signUp, useSession, changePassword } =
  authClient;
