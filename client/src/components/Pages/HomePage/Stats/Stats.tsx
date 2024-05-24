import { Box, Grid, Stack } from "@mui/material";
import Stat from "./Stat";

const stat_cards = [
  { id: 1, title: "Invoice", count: 2_500_000 },
  { id: 2, title: "Quote", count: 100_000 },
  { id: 3, title: "Payment", count: 6_256.15 },
  { id: 4, title: "Due Balance", count: 500_000 },
];

export default function Stats() {
  return (
    <Box
      sx={{
        display: "grid",
        columnGap: 2,
        gridTemplateColumns: "repeat(4, 1fr)",
      }}
    >
      {stat_cards.map(({ id, title, count }) => {
        return <Stat key={id} count={count} title={title} />;
      })}
    </Box>
  );
}
