"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

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
  if (status === "scheduled") return "Agendado";
  if (status === "attended") return "Presença confirmada";
  if (status === "absent") return "Ausente";
  return status;
}

export const appointmentColumns: ColumnDef<UserScheduledDates>[] = [
  {
    header: ({ column }) => (
      <div className="text-base">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
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
      return <div className="text-sm">{date?.toLocaleDateString()}</div>;
    },
  },
  {
    header: ({ column }) => (
      <div className="text-base">
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
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
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
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
      <div className="text-base">
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          RA
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </Button>
      </div>
    ),
    accessorKey: "student.ra",
    cell: ({ row }) => {
      const ra = row.original.student.ra;
      return <div className="text-sm">{ra}</div>;
    },
  },
];
