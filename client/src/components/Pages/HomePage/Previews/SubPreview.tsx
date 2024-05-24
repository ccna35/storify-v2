import { Box, Stack, Typography } from "@mui/material";

type SubPreviewProps = {
  title: "Draft" | "Pending" | "Unpaid" | "Overdue" | "Accepted" | "Expired";
  percentage: number;
  color: string;
};

const SubPreview = ({ title, percentage, color }: SubPreviewProps) => {
  return (
    <Box>
      <Stack direction="row" justifyContent={"space-between"}>
        <Typography>{title}</Typography>
        <Typography>{percentage}%</Typography>
      </Stack>
      <Box
        sx={{
          height: "7px",
          width: "100%",
          backgroundColor: "#0000000f",
          borderRadius: "999px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: percentage,
            backgroundColor: color,
            borderRadius: "999px",
            position: "absolute",
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default SubPreview;
