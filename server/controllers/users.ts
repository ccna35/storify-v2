import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../db/db";
import { UserRequest, generateToken } from "../util/token";
import { ResultSetHeader, RowDataPacket } from "mysql2";
require("dotenv").config();

const RESPONSE_MESSAGES = {
  500: "Internal Server Error",
  404: "User not found",
};

const signup = async (req: Request, res: Response) => {
  const { first_name, last_name, user_email, user_password } = req.body;

  if (!first_name || !last_name || !user_email || !user_password)
    return res.status(400).json({
      error: "Missing required parameters",
      message: "Some parameters are missing.",
    });

  // Check if user already exists
  const checkQuery = "SELECT * FROM user_accounts WHERE user_email = ?";

  try {
    const result = await pool.query<RowDataPacket[]>(checkQuery, [user_email]);

    console.log(result);

    // This user already exists
    if (result[0].length > 0) {
      return res.status(400).json("User with this email already exists");
    }

    // Sign up a new user
    const hashedPassword = bcrypt.hashSync(user_password, 10);

    const values = [[first_name, last_name, user_email, hashedPassword]];

    const insertNewUserQuery = `INSERT INTO user_accounts(first_name,
      last_name,
      user_email,
      user_password) VALUES ?`;

    const [{ insertId: user_id }] = await pool.query<ResultSetHeader>(
      insertNewUserQuery,
      [values]
    );

    console.log(user_id);

    // Generating an access token
    const token = await generateToken(user_id);

    // Attaching the token to the response in httpOnly cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User signed up successfully",
      user: {
        id: user_id,
        first_name,
        last_name,
        user_email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: RESPONSE_MESSAGES["500"] });
  }
};

const login = async (req: Request, res: Response) => {
  const { user_email, user_password } = req.body;

  // Check if user send all required parameters
  if (!user_email || !user_password)
    return res.status(400).json({
      error: "Missing required parameters",
      message: "Please provide both email and password to login.",
    });

  const checkQuery = "SELECT * FROM user_accounts WHERE user_email = ?";
  try {
    const checkResult = await pool.query<RowDataPacket[]>(checkQuery, [
      user_email,
    ]);
    if (checkResult[0].length === 0) {
      return res.status(404).json({ message: RESPONSE_MESSAGES["404"] });
    }

    const user = checkResult[0][0];

    const { id, first_name, last_name, user_email: email, added } = user;

    const doPasswordsMatch = await bcrypt.compare(
      user_password,
      user.user_password
    );

    if (doPasswordsMatch) {
      const token = await generateToken(id);

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).send({
        message: "Login Successful",
        user: { id, first_name, last_name, email, added },
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: RESPONSE_MESSAGES["500"] });
  }
};

const logout = (req: Request, res: Response) => {
  res.clearCookie("jwt");

  return res.status(200).json({ message: "User logged out successfully" });
};

const updateUser = async (req: UserRequest, res: Response) => {
  const userId = req.user;

  const { firstName, lastName } = req.body;

  const newData = [{ firstName, lastName }, userId];

  const query = "UPDATE user_accounts SET ? WHERE id = ?";

  try {
    const [result] = await pool.query<ResultSetHeader>(query, newData);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: RESPONSE_MESSAGES["404"] });
    }

    return res.status(200).send("User updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(RESPONSE_MESSAGES["500"]);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  const query =
    "SELECT id, firstName, lastName, email, username, createdAt FROM `user_accounts`";

  try {
    const result = await pool.query<ResultSetHeader>(query);
    console.log(result[0]);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send(RESPONSE_MESSAGES["500"]);
  }
};

const getOneUser = async (req: Request, res: Response) => {
  const { id: userId } = req.params;

  const query =
    "SELECT id, firstName, lastName, email, username, createdAt FROM `user_accounts` WHERE id = ?";

  try {
    const result = await pool.query<ResultSetHeader[]>(query, [userId]);
    console.log(result);

    if (result[0].length === 0)
      return res.status(404).json({ message: RESPONSE_MESSAGES["404"] });

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send(RESPONSE_MESSAGES["500"]);
  }
};

export { signup, login, logout, updateUser, getAllUsers, getOneUser };
