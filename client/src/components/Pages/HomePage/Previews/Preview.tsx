import { Box, Stack, Typography } from "@mui/material";
import SubPreview from "./SubPreview";

const Preview = () => {
  return (
    <Box flex={1}>
      <Typography
        variant="h3"
        component="h3"
        mb={4}
        fontSize={17}
        fontWeight={500}
      >
        Invoices Preview
      </Typography>
      <Stack spacing={2}>
        <SubPreview title="Draft" percentage={50} color="lightcoral" />
        <SubPreview title="Accepted" percentage={20} color="lightcoral" />
        <SubPreview title="Expired" percentage={70} color="lightcoral" />
        <SubPreview title="Pending" percentage={90} color="lightcoral" />
        <SubPreview title="Unpaid" percentage={50} color="lightcoral" />
      </Stack>
    </Box>
  );
};

export default Preview;
