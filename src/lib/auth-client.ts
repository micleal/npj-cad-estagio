import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

import { env } from "~/env";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [usernameClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
