"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableFooter,
} from "~/components/ui/table";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useSession } from "~/lib/auth-client";

type AppointmentsDataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

export function AppointmentsDataTable<TData, TValue>({
  columns,
  data,
}: AppointmentsDataTableProps<TData, TValue>) {
  const { data: session } = useSession();
  const user = session?.user;
  const appointmentsTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const attendedAppointments = appointmentsTable
    .getRowModel()
    .rows.filter((row) => row.original.status === "attended");

  const scheduledAppointments = appointmentsTable
    .getRowModel()
    .rows.filter((row) => row.original.status === "scheduled");

  const totalAppointments = appointmentsTable.getRowModel().rows.length;

  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableHeader>
          {appointmentsTable.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted/50">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {appointmentsTable.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="px-4 hover:bg-muted/50">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {appointmentsTable.getRowModel().rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                <p className="p-10 text-muted-foreground text-sm">
                  Nenhum resultado encontrado
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length} className="text-sm">
              <div className="flex items-center justify-end gap-2">
                {user?.role === "admin" ? (
                  <>
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground">Agendamentos:</p>
                      <span>{totalAppointments}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground">Presença:</p>
                      <span className="text-green-600 dark:text-green-400">
                        {attendedAppointments.length} / 3
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground">
                        Total de agendamentos:
                      </p>
                      <span>{totalAppointments} / 3</span>
                    </div>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
