import Typography from "@mui/material/Typography";
import { Box, Divider, Stack, useTheme } from "@mui/material";

type StatProps = { title: string; count: number };

export default function Stat({ count, title }: StatProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        boxShadow: "0px 5px 15px -3px rgba(0,0,0,0.1)",
        // border: "1px solid #e9ecef",
        gridColumn: "span 1",
        borderRadius: (theme) => theme.borderRadius.primary,
        // bgcolor: "#252422",
      }}
    >
      <Box>
        <Typography
          py={2}
          sx={{
            fontSize: 20,
            fontWeight: 500,
            textAlign: "center",
            borderBottom: `1px solid ${theme.palette.secondary.main}`,
          }}
          color="primary"
        >
          {title}
        </Typography>
        <Stack
          direction="row"
          p={2}
          justifyContent="space-around"
          alignItems="center"
          gap={1}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Typography
            sx={{ fontSize: 15, fontWeight: 500 }}
            color="secondary"
            flexShrink={0}
          >
            This Month
          </Typography>
          <Typography
            sx={{
              fontSize: 15,
              // border: "1px solid #e9ecef",
              borderRadius: 2,
              p: 0.5,
            }}
            color="primary"
          >
            ${Intl.NumberFormat().format(count)}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
