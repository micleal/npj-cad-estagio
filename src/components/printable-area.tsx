"use client";

import { useEffect, useRef } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
} from "~/components/ui/table";

export function PrintableArea() {
  const printableAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (printableAreaRef.current) {
      window.print();
    }
  }, []);

  return (
    <div ref={printableAreaRef}>
      <div className="flex flex-col gap-4">
        <h1>Relatório</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    </div>
  );
}
