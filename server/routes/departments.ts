import { Router } from "express";
import { verifyToken } from "../util/token";
import { getAllDepartments } from "../controllers/departments";

const router = Router();

// Middleware
router.use(verifyToken);

// Get all Challenges
router.get("/", getAllDepartments);

export default router;
