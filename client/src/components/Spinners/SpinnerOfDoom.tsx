import { Box, Skeleton, Stack } from "@mui/material";

const SpinnerOfDoom = () => {
  return (
    <Box sx={{ width: "100%" }}>
      {Array.from("abcdefghijklmnopqr").map((char) => {
        const randomWidth = Math.floor(Math.random() * 100);
        const randomHeight = Math.floor(Math.random() * 100);
        console.log(randomHeight);

        return (
          <Stack spacing={1} direction={"row"} key={char}>
            <Skeleton
              animation="wave"
              height={randomHeight}
              width={`${randomWidth}%`}
            />
            <Skeleton
              animation="wave"
              height={randomHeight}
              width={`${100 - randomWidth}%`}
            />
          </Stack>
        );
      })}
    </Box>
  );
};

export default SpinnerOfDoom;
