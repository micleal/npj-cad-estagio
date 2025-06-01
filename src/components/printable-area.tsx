"use client";

import { Fragment, useEffect, useRef } from "react";
import {
  Document,
  Page,
  View,
  Text,
  PDFViewer,
  StyleSheet,
} from "@react-pdf/renderer";
import { Table, TH, TR, TD } from "@ag-media/react-pdf-table";
import { format } from "date-fns";
import type { Report } from "~/@types";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "row",
  },
  section: {
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    border: "1px solid #27272a",
    borderRadius: 50,
  },
  tableCell: {
    fontSize: 12,
    paddingHorizontal: 10,
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#ff272a",
    color: "#fff",
  },
  tableHead: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  tableRow: {
    flexGrow: 1,
    fontSize: 12,
  },
});

export function PrintableArea({ reports }: { reports: Report[] }) {
  const printableAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (printableAreaRef.current) {
      window.print();
    }
  }, []);

  const getStatus = (status: string) => {
    if (status === "scheduled") {
      return "Agendado";
    }

    if (status === "attended") {
      return "Presente";
    }

    return "Ausente";
  };

  const renderPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Relatório</Text>
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
                  {format(report.scheduledDates[0].date, "dd/MM/yyyy")}
                </TD>
                <TD style={styles.tableCell}>{report.student.name}</TD>
                <TD style={styles.tableCell}>
                  {getStatus(report.scheduledDates[0].status)}
                </TD>
              </TR>
            ))}
          </Table>
        </View>
      </Page>
    </Document>
  );

  return (
    <PDFViewer
      style={{
        width: "100%",
        height: "calc(100vh - 100px)",
      }}
    >
      {renderPDF()}
    </PDFViewer>
  );
}
