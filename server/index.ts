import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import bodyParser from "body-parser";

// routes
import users from "./routes/users";
import products from "./routes/products";
import departments from "./routes/departments";

const PORT = process.env.PORT || 3000;

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Routes
app.use("/users", users);
app.use("/products", products);
app.use("/departments", departments);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
