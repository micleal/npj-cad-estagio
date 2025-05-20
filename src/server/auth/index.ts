import { headers } from "next/headers";
import { auth as authConfig } from "~/server/auth/config";

export const { api, handler } = authConfig;

export async function auth() {
  "use server";
  const session = await api.getSession({
    headers: await headers(),
  });

  return session;
}
