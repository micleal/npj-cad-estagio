import type { Metadata } from "next";
import type { Period } from "~/@types";
import { PrintableArea } from "~/components/printable-area";
import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Imprimir Relatório",
  description: "Imprimir relatório de alunos",
};

export default async function PrintPage({
  searchParams,
}: {
  searchParams: Promise<{ studentId: string; period: string }>;
}) {
  const { studentId, period } = await searchParams;
  let studentIdToPrint = studentId;

  if (studentId === "all") {
    studentIdToPrint = "";
  }

  const reports = await api.print.report({
    studentId: studentIdToPrint,
    period,
  });

  console.log(reports);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <PrintableArea reports={reports} />
    </div>
  );
}
