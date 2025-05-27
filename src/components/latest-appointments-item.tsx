import { CircleCheckIcon, Trash2Icon, TrashIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function LatestAppointmentsItem() {
  return (
    <div className="relative flex flex-col items-center justify-between gap-1 rounded-md border border-border px-4 py-2 shadow-sm">
      <div className="flex w-full items-center justify-between gap-2">
        <p>appointment name</p>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-red-500 hover:text-white"
        >
          <Trash2Icon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
      <div className="flex w-full justify-between gap-2">
        <span className="text-muted-foreground text-sm">20/05/2025</span>
        <span className="text-muted-foreground text-sm">
          <Badge
            variant="outline"
            className="bg-green-500 font-semibold text-white shadow-green-500/20 shadow-md dark:bg-green-400 dark:text-black dark:shadow-green-400/20"
          >
            <CircleCheckIcon className="h-[1.2rem] w-[1.2rem]" />
            complete
          </Badge>
        </span>
      </div>
    </div>
  );
}
