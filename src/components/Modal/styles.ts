import type { SxProps, Theme } from "@mui/material/styles";

export const modalStyles: Record<string, SxProps<Theme>> = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    position: "relative",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxWidth: "600px",
    width: "100%",
    maxHeight: "90vh",
    overflowY: "auto",
    "&:focus": {
      outline: "none",
    },
  }
};
