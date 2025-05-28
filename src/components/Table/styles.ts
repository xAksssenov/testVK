import type { SxProps, Theme } from "@mui/material/styles";

export const tableStyles: Record<string, SxProps<Theme>> = {
  container: {
    width: "100wh",
    bgcolor: "background.paper",
    borderRadius: 1,
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    "& .ReactVirtualized__Grid": {
      "&::-webkit-scrollbar": {
        width: "8px",
        height: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    },
  },
  row: {
    display: "flex",
    padding: "8px 16px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    backgroundColor: "background.paper",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  loadingRow: {
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  headerRow: {
    display: "flex",
    p: 2,
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    backgroundColor: "#fafafa",
  },
  cell: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    px: 1,
    "&:first-of-type": {
      pl: 2,
    },
    "&:last-child": {
      pr: 2,
    },
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 2,
  },
  error: {
    p: 2,
    color: "error.main",
  }
};
