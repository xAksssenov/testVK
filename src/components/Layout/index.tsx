import { Box } from "@mui/material";
import type { LayoutProps } from "../../types";
import { layoutStyles } from "./styles";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={layoutStyles.wrapper}>
      <Box sx={layoutStyles.container}>
        {children}
      </Box>
    </Box>
  );
};
