import { Box, styled } from "@mui/system";
import { useState } from "react";
import { AppNavbar } from "./AppNavBar";
import { AppSidebar } from "./AppSideBar";

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export default function AppLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <LayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <main>{children}</main>
        </Box>
      </LayoutRoot>
      <AppNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <AppSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </>
  );
}
