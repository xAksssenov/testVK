import { Box, Modal as MuiModal } from "@mui/material";
import type { ModalProps } from "../../types";

export const Modal = ({ open, onClose, children }: ModalProps) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
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
        }}
      >
        {children}
      </Box>
    </MuiModal>
  );
}; 