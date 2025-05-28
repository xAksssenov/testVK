import type { SxProps, Theme } from "@mui/material/styles";

export const layoutStyles: Record<string, SxProps<Theme>> = {
  wrapper: {
    backgroundColor: "#f5f7fa",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
  },
  container: {
    width: "100%",
    maxWidth: "1200px",
    height: "fit-content",
    maxHeight: "90vh",
    overflowY: "auto",
    backgroundColor: "#ffffff",
    borderRadius: 2,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    p: 3,
    mx: 3,
  }
};
