import type { SxProps, Theme } from "@mui/material/styles";

export const ROW_HEIGHT = 48;

export const tableStyles: Record<string, SxProps<Theme>> = {
  container: (theme: Theme) => ({
    width: "100%",
    bgcolor: "background.paper",
    borderRadius: 1,
    overflowX: "hidden",
    [theme.breakpoints.down("sm")]: {
      overflowX: "auto",
    },
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    "& .ReactVirtualized__Grid": {
      overflowX: "hidden",
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
  }),

  headerRow: {
    display: "flex",
    alignItems: "center",
    height: `${ROW_HEIGHT}px`,
    boxSizing: "border-box",
    p: 2,
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    backgroundColor: "#fafafa",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },

  row: {
    display: "flex",
    alignItems: "center",
    height: `${ROW_HEIGHT}px`,
    boxSizing: "border-box",
    padding: "0 16px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    transition: "border-bottom 0.2s ease",
    "&:hover": {
      backgroundColor: "grey.100",
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    },
  },

  cell: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    height: `100%`,
    px: 1,
    boxSizing: "border-box",
    "&:first-of-type": {
      pl: 2,
    },
    "&:last-child": {
      pr: 2,
    },
  },

  loadingRow: {
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    height: `${ROW_HEIGHT}px`,
    boxSizing: "border-box",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
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
  },
};
