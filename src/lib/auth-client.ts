import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

import { env } from "~/env";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [usernameClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
