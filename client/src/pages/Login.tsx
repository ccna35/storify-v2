import {
  Alert,
  Box,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { API_URL } from "../env";
import { LoadingButton } from "@mui/lab";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";

type FormValues = {
  user_email: string;
  user_password: string;
};

const INITIAL_VALUES: FormValues = {
  user_email: "",
  user_password: "",
};

const Login = () => {
  const { user, updateUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  // To help us abort the request when component unmounts
  const controller = useMemo(() => new AbortController(), []);
  const signal = controller.signal;

  useEffect(() => {
    return () => {
      // Cancel the request when the component unmounts
      controller.abort();
    };
  }, [controller]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    defaultValues: INITIAL_VALUES,
    mode: "onChange",
  });
  const onSubmit = async (data: FormValues) => {
    setErrorMsg("");
    try {
      const res = await axios.post(API_URL + "users/login", data, {
        withCredentials: true,
        signal,
      });
      console.log(res);

      // Update user state with new data
      updateUserInfo(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 5 }}>
      <Container maxWidth="lg" sx={{ marginInline: "auto" }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack
            direction="column"
            spacing={2}
            sx={{ maxWidth: "500px", marginInline: "auto" }}
          >
            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Stack direction="column" spacing={1}>
              <TextField
                label="Email"
                type="email"
                {...register("user_email", {
                  required: "This field is required!",
                  validate: {
                    isEmail: (value) => {
                      const emailRegEx =
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                      return (
                        emailRegEx.test(value) || "Please enter a valid email"
                      );
                    },
                  },
                })}
              />
              {errors.user_email && (
                <Alert severity="error">{errors.user_email.message}</Alert>
              )}
            </Stack>
            <Stack direction="column" spacing={1}>
              <TextField
                label="Password"
                type="password"
                {...register("user_password", {
                  required: "This field is required!",
                })}
              />
              {errors.user_password && (
                <Alert severity="error">{errors.user_password.message}</Alert>
              )}
            </Stack>

            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
            >
              Log in
            </LoadingButton>
            <Stack direction="row" spacing={1}>
              <Typography variant="body1">New user?</Typography>
              <Link component={RouterLink} to="/register">
                Create a new account
              </Link>
            </Stack>
          </Stack>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
