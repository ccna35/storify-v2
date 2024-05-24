import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Snackbar,
  SnackbarOrigin,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "../api";
import { ChangeEventHandler, useState } from "react";
import { FormikConfig, useFormik } from "formik";

export type ProductFormValues = {
  product_name: string;
  description: string;
  price?: number;
  stock_quantity?: number;
  manufacturer: string;
  category: string;
  is_featured?: boolean;
};

const INITIAL_VALUES = {
  product_name: "",
  description: "",
  price: 0,
  stock_quantity: 0,
  manufacturer: "",
  category: "",
  is_featured: false,
};

interface State extends SnackbarOrigin {
  open: boolean;
}

const NewProductTest = () => {
  const { handleChange, errors, values, handleBlur, touched } = useFormik({
    initialValues: {
      product_name: "",
      description: "",
      price: 0,
      stock_quantity: 0,
      manufacturer: "",
      category: "",
      is_featured: false,
    },
  });

  const queryClient = useQueryClient();

  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const showSuccessMessage = () => {
    console.log("Triggered");

    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  console.log("NewProductTest rendered");

  return (
    <Box sx={{ minHeight: "100vh", py: 5 }}>
      <Container maxWidth="lg" sx={{ marginInline: "auto" }}>
        <form noValidate>
          <Stack
            direction="column"
            spacing={2}
            sx={{ maxWidth: "500px", marginInline: "auto" }}
          >
            {/* {errorMsg && <Alert severity="error">{errorMsg}</Alert>} */}
            <Stack direction="column" spacing={1}>
              <TextField
                name="product_name"
                label="Name"
                variant="outlined"
                fullWidth
                value={values.product_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.product_name && !!errors.product_name}
                helperText={touched.product_name && errors.product_name}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
              <TextField
                label="Description"
                type="text"
                name="description"
                onChange={handleChange}
              />
            </Stack>
          </Stack>
        </form>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={3000}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewProductTest;
