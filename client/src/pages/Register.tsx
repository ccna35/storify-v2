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
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";

type FormValues = {
  first_name: string;
  last_name: string;
  user_email: string;
  user_password: string;
  confirm_user_password: string;
};

const INITIAL_VALUES: FormValues = {
  first_name: "",
  last_name: "",
  user_email: "",
  user_password: "",
  confirm_user_password: "",
};

const Register = () => {
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
    getValues,
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
      const res = await axios.post(API_URL + "users/signup", data, {
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
                label="First Name"
                type="text"
                {...register("first_name", {
                  required: "This field is required!",
                  validate: {
                    length: (value) => {
                      return (
                        (value.length >= 3 && value.length <= 20) ||
                        "Name must be between 3 and 20 characters"
                      );
                    },
                  },
                })}
              />
              {errors.first_name && (
                <Alert severity="error">{errors.first_name.message}</Alert>
              )}
            </Stack>
            <Stack direction="column" spacing={1}>
              <TextField
                label="Last Name"
                type="text"
                {...register("last_name", {
                  required: "This field is required!",
                  validate: {
                    length: (value) => {
                      return (
                        (value.length >= 3 && value.length <= 20) ||
                        "Name must be between 3 and 20 characters"
                      );
                    },
                  },
                })}
              />
              {errors.last_name && (
                <Alert severity="error">{errors.last_name.message}</Alert>
              )}
            </Stack>
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
                  validate: {
                    isValidPassword: (value) => {
                      const passwordRegex =
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
                      return (
                        passwordRegex.test(value) ||
                        "Password should be between 8 and 20 characters long, should have at least one digit, one uppercase and one lowercase letter and one special character."
                      );
                    },
                  },
                })}
              />
              {errors.user_password && (
                <Alert severity="error">{errors.user_password.message}</Alert>
              )}
            </Stack>
            <Stack direction="column" spacing={1}>
              <TextField
                label="Confirm Password"
                type="password"
                {...register("confirm_user_password", {
                  required: "This field is required!",
                  validate: {
                    doPasswordsMatch: (val) => {
                      return (
                        val === getValues("user_password") ||
                        "Passwords don't match"
                      );
                    },
                  },
                })}
              />
              {errors.confirm_user_password && (
                <Alert severity="error">
                  {errors.confirm_user_password.message}
                </Alert>
              )}
            </Stack>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
            >
              Register
            </LoadingButton>
            <Stack direction="row" spacing={1}>
              <Typography variant="body1">Already have an account?</Typography>
              <Link component={RouterLink} to="/login">
                Sign in
              </Link>
            </Stack>
          </Stack>
        </form>
      </Container>
    </Box>
  );
};

export default Register;
