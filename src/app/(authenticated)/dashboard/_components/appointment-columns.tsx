"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import {
  Calendar,
  ChevronUp,
  ChevronDown,
  Pencil,
  EllipsisVertical,
  Trash,
  CircleCheckIcon,
  CircleXIcon,
  CircleAlertIcon,
  CircleMinusIcon,
  Calendar1Icon,
  UserCircle2Icon,
  IdCardIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { format } from "date-fns";
import { Badge } from "~/components/ui/badge";
import { useSession } from "~/lib/auth-client";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type UserScheduledDates = {
  id: string;
  scheduledDate: Date;
  status: string;
  attendanceType: string;
  student: {
    id: string;
    name: string;
    ra: string;
  };
};

function getStatusToText(status: string) {
  if (status === "scheduled")
    return (
      <Badge className="border border-yellow-500 bg-yellow-500/50 font-semibold text-foreground text-shadow-sm transition-none">
        Agendado
      </Badge>
    );
  if (status === "attended")
    return (
      <Badge className="border border-green-500 bg-green-500/50 font-semibold text-foreground text-shadow-sm transition-none">
        Presença confirmada
      </Badge>
    );
  if (status === "absent")
    return (
      <Badge className="border border-red-500 bg-red-500/50 font-semibold text-foreground text-shadow-sm transition-none">
        Ausente
      </Badge>
    );
  if (status === "cancelled")
    return (
      <Badge
        variant="outline"
        className="font-semibold text-shadow-sm transition-none"
      >
        Cancelado
      </Badge>
    );
  return status;
}

function useChangeStatus(id: string, status: string) {
  const router = useRouter();
  const mutation = api.schedule.changeStatus.useMutation({
    onSuccess: () => {
      toast.success("Status alterado com sucesso");
      router.refresh();
    },
    onError: () => {
      toast.error("Erro ao alterar status");
    },
  });

  return () => {
    mutation.mutate({
      id: id,
      status: status,
    });
  };
}

function StatusChangeButton({
  id,
  status,
  disabled,
  children,
}: {
  id: string;
  status: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const handleStatusChange = useChangeStatus(id, status);

  return (
    <DropdownMenuItem disabled={disabled} onClick={handleStatusChange}>
      {children}
    </DropdownMenuItem>
  );
}

export const appointmentColumns: ColumnDef<UserScheduledDates>[] = [
  {
    header: ({ column }) => (
      <div className="text-base">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          <Calendar1Icon className="size-4" />
          Data
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </Button>
      </div>
    ),
    accessorKey: "scheduledDate",
    cell: ({ row }) => {
      const date = row.original.scheduledDate;
      return (
        <div className="text-sm">{date ? format(date, "dd/MM/yyyy") : ""}</div>
      );
    },
  },
  {
    header: ({ column }) => (
      <div className="text-base">
        <Button
          variant="ghost"
          size="sm"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <CircleCheckIcon className="size-4" />
          Status
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </Button>
      </div>
    ),
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <div className="text-sm">{getStatusToText(status)}</div>;
    },
  },
  {
    header: ({ column }) => (
      <div className="text-base">
        <Button
          variant="ghost"
          size="sm"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <UserCircle2Icon className="size-4" />
          Nome
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </Button>
      </div>
    ),
    accessorKey: "student.name",
    cell: ({ row }) => {
      const name = row.original.student.name;
      return <div className="text-sm">{name}</div>;
    },
  },
  {
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <IdCardIcon className="size-4" />
        RA
        {column.getIsSorted() === "asc" ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
      </Button>
    ),
    accessorKey: "student.ra",
    cell: ({ row }) => {
      const ra = row.original.student.ra;
      return <div className="text-sm">{ra}</div>;
    },
  },
  {
    header: ({ column }) => {
      const session = useSession();
      const isAdmin = session.data?.user.role === "admin";
      if (isAdmin) {
        return (
          <Button variant="ghost" size="sm" className="p-0">
            Ações
          </Button>
        );
      }
      return null;
    },
    accessorKey: "actions",
    cell: ({ row }) => {
      const session = useSession();
      const isAdmin = session.data?.user.role === "admin";
      if (isAdmin) {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0">
                <EllipsisVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Marcar como</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <StatusChangeButton
                    id={row.original.id}
                    status="attended"
                    disabled={row.original.status === "attended"}
                  >
                    <CircleCheckIcon className="size-4" />
                    Presente
                  </StatusChangeButton>
                  <StatusChangeButton
                    id={row.original.id}
                    status="scheduled"
                    disabled={row.original.status === "scheduled"}
                  >
                    <CircleAlertIcon className="size-4" />
                    Agendado
                  </StatusChangeButton>
                  <StatusChangeButton
                    id={row.original.id}
                    status="absent"
                    disabled={row.original.status === "absent"}
                  >
                    <CircleMinusIcon className="size-4" />
                    Ausente
                  </StatusChangeButton>
                  <StatusChangeButton
                    id={row.original.id}
                    status="cancelled"
                    disabled={row.original.status === "cancelled"}
                  >
                    <CircleXIcon className="size-4" />
                    Cancelado
                  </StatusChangeButton>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              {/* <DropdownMenuItem>
                <Pencil className="size-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash className="size-4" />
                Excluir
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
      return null;
    },
  },
];
