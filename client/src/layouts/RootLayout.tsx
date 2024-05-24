import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { UserProvider } from "../hooks/UserContext";
import { Box, Container } from "@mui/material";
import Sidebar from "../components/Sidebar/Sidebar";

const RootLayout = () => {
  return (
    <UserProvider>
      <Navbar />

      <Box sx={{ minHeight: "100vh" }}>
        <Container maxWidth="lg" sx={{ marginInline: "auto" }}>
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr 1fr 1fr"
            gap={4}
            sx={{ width: "100%", py: 3 }}
          >
            <Box gridColumn="span 1">
              <Sidebar />
            </Box>
            <Box gridColumn="span 3">
              <Outlet />
            </Box>
          </Box>
        </Container>
      </Box>
    </UserProvider>
  );
};

export default RootLayout;
