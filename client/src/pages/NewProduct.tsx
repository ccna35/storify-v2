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
import { useState } from "react";

export type ProductFormValues = {
  product_name: string;
  description: string;
  price?: number;
  stock_quantity?: number;
  manufacturer: string;
  category: string;
  is_featured?: boolean;
};

const INITIAL_VALUES: ProductFormValues = {
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

const NewProduct = () => {
  const queryClient = useQueryClient();

  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const showSuccessMessage = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const { mutateAsync: addProduct } = useMutation({
    mutationFn: ProductService.createProduct,
    onSuccess: () => {
      showSuccessMessage();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ProductFormValues>({
    defaultValues: INITIAL_VALUES,
    mode: "onChange",
  });
  const onSubmit = async (data: ProductFormValues) => {
    console.log(data);

    addProduct(data);
  };

  console.log("New Product Rendered");

  return (
    <Box sx={{ minHeight: "100vh", py: 5 }}>
      <Container maxWidth="lg" sx={{ marginInline: "auto" }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack
            direction="column"
            spacing={2}
            sx={{ maxWidth: "500px", marginInline: "auto" }}
          >
            {/* {errorMsg && <Alert severity="error">{errorMsg}</Alert>} */}
            <Stack direction="column" spacing={1}>
              <TextField
                label="Product name"
                type="text"
                {...register("product_name", {
                  required: "This field is required!",
                  validate: {
                    length: (value) => {
                      return (
                        (value.length >= 3 && value.length <= 50) ||
                        "Name must be between 3 and 50 characters"
                      );
                    },
                  },
                })}
              />
              {errors.product_name && (
                <Alert severity="error">{errors.product_name.message}</Alert>
              )}
            </Stack>
            <Stack direction="column" spacing={1}>
              <TextField
                label="Description"
                type="text"
                {...register("description", {
                  required: "This field is required!",
                  validate: {
                    length: (value) => {
                      return (
                        (value.length >= 3 && value.length <= 500) ||
                        "Name must be between 3 and 500 characters"
                      );
                    },
                  },
                })}
              />
              {errors.description && (
                <Alert severity="error">{errors.description.message}</Alert>
              )}
            </Stack>
            <Stack direction="column" spacing={1}>
              <TextField
                label="Price"
                type="number"
                {...register("price", {
                  max: 1_000_000,
                  validate: {
                    isValid: (value) => {
                      return (
                        (value && value <= 1_000_000) ||
                        "Price can't be more than $1,000,000"
                      );
                    },
                  },
                })}
              />
              {errors.price && (
                <Alert severity="error">{errors.price.message}</Alert>
              )}
            </Stack>
            <Stack direction="column" spacing={1}>
              <TextField
                label="Stock quantity"
                type="number"
                {...register("stock_quantity", {
                  max: 10_000,
                  validate: {
                    isValid: (value) => {
                      return (
                        (value && value <= 10_000) ||
                        "Stock quantity can't be more than 10,000"
                      );
                    },
                  },
                })}
              />
              {errors.stock_quantity && (
                <Alert severity="error">{errors.stock_quantity.message}</Alert>
              )}
            </Stack>
            <Stack direction="column" spacing={1}>
              <TextField
                label="Manufacturer"
                type="text"
                {...register("manufacturer", {
                  required: "This field is required!",
                  validate: {
                    isValid: (value) => {
                      return (
                        (value.length >= 2 && value.length <= 20) ||
                        "Value can't be more than 20"
                      );
                    },
                  },
                })}
              />
              {errors.manufacturer && (
                <Alert severity="error">{errors.manufacturer.message}</Alert>
              )}
            </Stack>
            <Stack direction="column" spacing={1}>
              <TextField
                label="Category"
                type="text"
                {...register("category", {
                  required: "This field is required!",
                  validate: {
                    isValid: (value) => {
                      return (
                        (value.length >= 2 && value.length <= 20) ||
                        "Value can't be more than 20"
                      );
                    },
                  },
                })}
              />
              {errors.category && (
                <Alert severity="error">{errors.category.message}</Alert>
              )}
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Mark featured?</Typography>
              <Checkbox size="small" {...register("is_featured")} />
            </Stack>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
            >
              Add
            </LoadingButton>
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

export default NewProduct;
