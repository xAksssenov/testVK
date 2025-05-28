import type { SxProps, Theme } from "@mui/material/styles";

export const formStyles: Record<string, SxProps<Theme>> = {
  form: {
    display: "grid",
    gap: 2,
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    padding: 2,
  },
  submitButton: {
    marginTop: 2,
  },
};
