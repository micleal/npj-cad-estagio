import Link from "next/link";
import { auth } from "~/server/auth";
import { BackButton } from "./back-button";
import { PrintReportButton } from "./print-report-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export async function AdminArea() {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <BackButton />
    </div>
  );
}
