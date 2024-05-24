import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Profile() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ marginInline: "auto" }}>
        <Typography>Profile page</Typography>
      </Container>
    </Box>
  );
}
