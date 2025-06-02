"use client";

import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { Table, TH, TR, TD } from "@ag-media/react-pdf-table";
import { format } from "date-fns";
import type { Report } from "~/@types";
import { styles } from "~/lib/print-styles";
import logo from "~/assets/logo-fmu-1x.png";

import dynamic from "next/dynamic";
import { Loader2Icon } from "lucide-react";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-1 flex-col items-center justify-center gap-1">
        <Loader2Icon className="animate-spin" />
        <p>Carregando...</p>
      </div>
    ),
  },
);

export function PrintableArea({ reports }: { reports: Report[] }) {
  const getStatus = (status: string) => {
    if (status === "scheduled") {
      return "Agendado";
    }

    if (status === "attended") {
      return "Presente";
    }

    return "Ausente";
  };

  const titles = {
    documentTitle: `Relatório de Presença${reports.length > 1 ? "s" : ` - ${reports[0]?.student.name} - RA: ${reports[0]?.student.ra}`}`,
    title: `Relatório de Presença${reports.length > 1 ? "s" : ` - ${reports[0]?.student.name}`}`,
    header1: "Relatório de Presença",
    header2: "Relatório de Ausências",
  };

  const renderPDF = () => (
    <Document title={titles.documentTitle}>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image src={logo.src} style={[styles.pageHeaderLogo]} />
          <Text style={styles.title}>{titles.title}</Text>
          <Text style={styles.header}>{titles.header1}</Text>
          {reports.length === 1 ? (
            <View>
              <View style={styles.section}>
                <View style={styles.line}>
                  <View style={styles.lineItem}>
                    <Text>Nome:</Text>
                    <Text>{reports[0]?.student.name}</Text>
                  </View>
                  <View style={styles.lineItem}>
                    <Text>RA:</Text>
                    <Text>{reports[0]?.student.ra}</Text>
                  </View>
                </View>
                <View style={styles.line}>
                  <View style={styles.lineItem}>
                    <Text>
                      Total de agendamentos: {reports[0]?.attendance.total}
                    </Text>
                  </View>
                </View>
                <View style={styles.line}>
                  <View style={styles.lineItem}>
                    <Text>Confirmados: {reports[0]?.attendance.present}</Text>
                  </View>
                </View>
                <View style={styles.line}>
                  <View style={styles.lineItem}>
                    <Text>Ausentes: {reports[0]?.attendance.absent}</Text>
                  </View>
                </View>
              </View>
              <Table style={styles.table}>
                <TH style={styles.tableHeader}>
                  <TD style={styles.tableHead}>Data</TD>
                  <TD style={styles.tableHead}>Status</TD>
                </TH>
                {reports[0]?.scheduledDates.map((scheduledDate) => (
                  <TR
                    style={styles.tableRow}
                    key={`${scheduledDate.date.toISOString()}-${scheduledDate.status}`}
                  >
                    <TD style={styles.tableCell}>
                      {scheduledDate.date.toLocaleDateString("pt-BR")}
                    </TD>
                    <TD style={styles.tableCell}>
                      {getStatus(scheduledDate.status)}
                    </TD>
                  </TR>
                ))}
              </Table>
            </View>
          ) : (
            <View>
              {reports.map((report) => (
                <View key={report.student.ra} style={styles.section}>
                  <View style={styles.line}>
                    <View style={styles.lineItem}>
                      <Text>Nome:</Text>
                      <Text>{report.student.name}</Text>
                    </View>
                    <View style={styles.lineItem}>
                      <Text>RA:</Text>
                      <Text>{report.student.ra}</Text>
                    </View>
                  </View>
                  <View style={styles.line}>
                    <View style={styles.lineItem}>
                      <Text>
                        Total de agendamentos: {report.attendance.total}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.line}>
                    <View style={styles.lineItem}>
                      <Text>Confirmados: {report.attendance.present}</Text>
                    </View>
                  </View>
                  <View style={styles.line}>
                    <View style={styles.lineItem}>
                      <Text>Ausentes: {report.attendance.absent}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
      {reports.length > 1 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>{titles.header2}</Text>
            <Table style={styles.table}>
              <TH style={styles.tableHeader}>
                <TD style={styles.tableHead}>RA</TD>
                <TD style={styles.tableHead}>Data</TD>
                <TD style={styles.tableHead}>Nome</TD>
                <TD style={styles.tableHead}>Status</TD>
              </TH>
              {reports.map((report) => (
                <TR style={styles.tableRow} key={report.student.ra}>
                  <TD style={styles.tableCell}>{report.student.ra}</TD>
                  <TD style={styles.tableCell}>
                    {format(
                      report.scheduledDates[0]?.date ?? new Date(),
                      "dd/MM/yyyy",
                    )}
                  </TD>
                  <TD style={styles.tableCell}>{report.student.name}</TD>
                  <TD style={styles.tableCell}>
                    {getStatus(report.scheduledDates[0]?.status ?? "absent")}
                  </TD>
                </TR>
              ))}
            </Table>
          </View>
        </Page>
      )}
    </Document>
  );

  return (
    <PDFViewer className="h-[calc(100dvh-100px)] w-full flex-1">
      {renderPDF()}
    </PDFViewer>
  );
}
