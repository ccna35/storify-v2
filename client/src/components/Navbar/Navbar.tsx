import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Switch } from "@mui/material";
import { useThemeStore } from "../../App";

export default function Navbar() {
  const { switchTheme } = useThemeStore();

  return (
    <Box>
      <AppBar position="static" sx={{ boxShadow: "none", py: 1 }}>
        <Container
          maxWidth="lg"
          sx={{
            marginInline: "auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Storify
          </Typography>
          <Switch
            onChange={() => switchTheme()}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Container>
      </AppBar>
    </Box>
  );
}
