import { Box, Typography } from "@mui/material";
import CircularWithValueLabel from "./CircularWithValueLabel";

const CustomerPreview = () => {
  return (
    <Box
      sx={{
        boxShadow: "0px 5px 15px -3px rgba(0,0,0,0.1)",
        border: "1px solid #e9ecef",
        py: 4,
        px: 3,
        gridColumn: "span 1",
        borderRadius: (theme) => theme.borderRadius.primary,
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        mb={4}
        fontSize={17}
        fontWeight={500}
        textAlign="center"
      >
        Customer Preview
      </Typography>
      <CircularWithValueLabel />
      <Typography
        variant="body1"
        component="p"
        fontSize={12}
        fontWeight={500}
        textAlign="center"
        mt={2}
      >
        New Customer This Month
      </Typography>
    </Box>
  );
};

export default CustomerPreview;
