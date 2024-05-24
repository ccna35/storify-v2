import { Request, Response } from "express";
import { pool } from "../db/db";
import { ResultSetHeader } from "mysql2";

const getAllDepartments = async (req: Request, res: Response) => {
  const query = "SELECT * FROM departments";

  try {
    const result = await pool.query<ResultSetHeader>(query);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getAllDepartments };
