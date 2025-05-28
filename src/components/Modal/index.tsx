import { Box, Modal as MuiModal } from "@mui/material";
import type { ModalProps } from "../../types";
import { modalStyles } from "./styles";

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <MuiModal open={open} onClose={onClose} sx={modalStyles.modal}>
      <Box onClick={(e) => e.stopPropagation()} sx={modalStyles.content}>
        {children}
      </Box>
    </MuiModal>
  );
};
