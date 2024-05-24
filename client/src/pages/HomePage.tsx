import { Box, Stack, Typography } from "@mui/material";
import Stats from "../components/Pages/HomePage/Stats/Stats";
import Preview from "../components/Pages/HomePage/Previews/Preview";
import CustomerPreview from "../components/Pages/HomePage/Previews/Customer Preview/CustomerPreview";
import RecentInvoices from "../components/Pages/HomePage/Recents/RecentInvoices";

const HomePage = () => {
  return (
    <Stack direction="column" spacing={4}>
      <Typography variant="h1" fontSize={30} fontWeight={500}>
        Hi, Welcome back 👋
      </Typography>
      <Stats />
      <Box
        sx={{
          display: "grid",
          columnGap: 2,
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        <Box
          sx={{
            boxShadow: "0px 5px 15px -3px rgba(0,0,0,0.1)",
            border: "1px solid #e9ecef",
            py: 4,
            px: 3,
            gridColumn: "span 3",
            borderRadius: (theme) => theme.borderRadius.primary,
          }}
          flexGrow={1}
        >
          <Stack direction="row" gap={3} justifyContent="space-between">
            <Preview />
            <Preview />
            <Preview />
          </Stack>
        </Box>
        <CustomerPreview />
      </Box>
      <Box
        sx={{
          display: "grid",
          columnGap: 2,
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <RecentInvoices />
        <RecentInvoices />
      </Box>
    </Stack>
  );
};

export default HomePage;
