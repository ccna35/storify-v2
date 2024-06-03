import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product, ProductService } from "../api";
import {
  Alert,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import { ProductFormValues } from "../pages/NewProduct";
import { Controller, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type BasicModalProps = {
  open: boolean;
  handleClose: () => void;
  productId: number;
};

export default function BasicModal({
  open,
  handleClose,
  productId,
}: Readonly<BasicModalProps>) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Product
        </Typography>
        <EditProduct productId={productId} handleClose={handleClose} />
      </Box>
    </Modal>
  );
}

type EditProductProps = {
  productId: number;
  handleClose: () => void;
};

const EditProduct = ({ productId, handleClose }: EditProductProps) => {
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => ProductService.getProduct(productId),
  });

  if (isLoading || isRefetching) return <Typography>Loading...</Typography>;

  if (!data) return;

  return <Form handleClose={handleClose} productId={productId} data={data} />;
};

type FormProps = {
  data: Product;
  productId: number;
  handleClose: () => void;
};

const Form = ({ productId, handleClose, data }: FormProps) => {
  const queryClient = useQueryClient();

  const {
    product_name,
    description,
    price,
    stock_quantity,
    manufacturer,
    category,
    is_featured,
  } = data;

  const INITIAL_VALUES: ProductFormValues = {
    product_name,
    description,
    price,
    stock_quantity,
    manufacturer,
    category,
    is_featured: Boolean(is_featured),
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: INITIAL_VALUES,
    mode: "onChange",
  });

  const onSubmit = async (data: ProductFormValues) => {
    updateProduct({ id: productId, data });
  };

  const { mutateAsync: updateProduct, isPending } = useMutation({
    mutationFn: ProductService.updateProduct,
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack
        direction="column"
        spacing={2}
        sx={{ maxWidth: "500px", marginInline: "auto" }}
      >
        {/* {errorMsg && <Alert severity="error">{errorMsg}</Alert>} */}
        <Stack direction="column" spacing={1}>
          <TextField
            size="small"
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
            size="small"
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
            size="small"
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
            size="small"
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
            size="small"
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
            size="small"
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

        <Controller
          name="is_featured"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Mark featured?"
            />
          )}
        />

        <Stack direction="row" justifyContent="space-between">
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isPending}
            disableRipple
            disableElevation
          >
            Update
          </LoadingButton>
          <Button
            disableRipple
            disableElevation
            variant="contained"
            color="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
