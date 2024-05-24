import { Request, Response } from "express";
import { pool } from "../db/db";
import { ResultSetHeader } from "mysql2";

const getAllProducts = async (req: Request, res: Response) => {
  const { page } = req.query;

  const LIMIT = 100;

  const offset = (Number(page) + 1 - 1) * LIMIT;

  const query = "SELECT * FROM products LIMIT ? OFFSET ?";

  try {
    const result = await pool.query<ResultSetHeader>(query, [LIMIT, offset]);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const createProduct = async (req: Request, res: Response) => {
  const {
    product_name,
    description,
    price,
    stock_quantity,
    manufacturer,
    category,
    is_featured,
  } = req.body;

  const product_details = [
    [
      product_name,
      description,
      price,
      stock_quantity,
      manufacturer,
      category,
      is_featured,
    ],
  ];

  try {
    // Insert a new product
    const newProductQuery =
      "INSERT INTO products(product_name, description, price, stock_quantity, manufacturer, category, is_featured) VALUES ?";
    await pool.query<ResultSetHeader>(newProductQuery, [product_details]);

    return res
      .status(201)
      .json({ message: "Product was created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

// Get a single product
const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const query = "SELECT * FROM products WHERE id = ?";

  try {
    const result = await pool.query<ResultSetHeader[]>(query, [id]);
    if (result[0].length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(result[0][0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

// Update a product
const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    product_name,
    description,
    price,
    stock_quantity,
    manufacturer,
    category,
    is_featured,
  } = req.body;

  const query =
    "UPDATE products SET product_name = ?, description = ?, price = ?, stock_quantity = ?, manufacturer = ?, category = ?, is_featured = ? WHERE id = ?";

  try {
    await pool.query<ResultSetHeader>(query, [
      product_name,
      description,
      price,
      stock_quantity,
      manufacturer,
      category,
      is_featured,
      id,
    ]);

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export { getAllProducts, createProduct, getProduct, updateProduct };
