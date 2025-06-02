import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "row",
    padding: "30px 50px",
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  pageHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageHeaderLogo: {
    width: "52px",
    height: "20.5px",
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  section: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: 30,
  },
  line: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    width: "100%",
    justifyContent: "space-between",
  },
  lineItem: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
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
