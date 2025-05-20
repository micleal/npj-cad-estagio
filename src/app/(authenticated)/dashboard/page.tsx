import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }
  return <div>Dashboard</div>;
}
