import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import { Typography } from "@mui/material";

export default function Settings() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ marginInline: "auto" }}>
        <Typography>Settings page</Typography>
      </Container>
    </Box>
  );
}
