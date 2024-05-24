import { Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import { query } from "../config/config";

type DepartmentType = {
  id: number;
  department_name: string;
  createdAt: string;
};

const DepartmentsList = () => {
  const navigate = useNavigate();
  const { updateUserInfo } = useContext(UserContext);

  const [data, setData] = useState<[] | DepartmentType[]>([]);
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");

  useEffect(() => {
    // To help us abort the request when component unmounts
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      setStatus("loading");

      try {
        const res = await query.get(`departments`, {
          signal,
        });
        setStatus("success");
        setData(res.data);
      } catch (error) {
        console.log(error);
        setStatus("error");
        if (error.response.status !== 200) {
          updateUserInfo(null);
          navigate("/login");
        }
      }
    })();

    return () => {
      // Cancel the request when the component unmounts
      controller.abort();
    };
  }, [navigate, updateUserInfo]);

  return (
    <Box
      sx={{
        border: "1px solid lightgray",
        borderRadius: 2,
        p: 4,
      }}
    >
      <Typography variant="h2" fontSize={20} fontWeight={400} marginBottom={2}>
        Departments List
      </Typography>
      <Stack direction="column" spacing={1}>
        {status === "loading" && <Typography>Human Resources</Typography>}
        {status === "success" &&
          data.map(({ id, department_name }) => {
            return (
              <Typography key={id} color="gray">
                {department_name}
              </Typography>
            );
          })}
      </Stack>
    </Box>
  );
};

export default DepartmentsList;
