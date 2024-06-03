import { query } from "../config/config";
import { ProductFormValues } from "../pages/NewProduct";

export type Product = {
  product_name: string;
  description: string;
  price: number;
  stock_quantity: number;
  manufacturer: string;
  category: string;
  is_featured: boolean;
};

const getProducts = async (page: number = 0): Promise<Product[]> => {
  const res = await query.get(`products?page=${page}`);

  return res.data;
};

const createProduct = async (data: ProductFormValues) => {
  const res = await query.post("/products", data);

  return res.data;
};

const updateProduct = async ({
  id,
  data,
}: {
  id: number;
  data: ProductFormValues;
}) => {
  const res = await query.put(`/products/${id}`, data);

  return res.data;
};

// Get single product
const getProduct = async (id: number | null): Promise<Product> => {
  const res = await query.get(`/products/${id}`);

  return res.data;
};

// Delete a product
const deleteProduct = async (id: number) => {
  const res = await query.delete(`/products/${id}`);

  return res.data;
};

export const ProductService = {
  getProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
};
