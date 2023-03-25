import { Router } from "express";
import { verifyToken } from "../controllers/auth";
import {
  createUser,
  authenticateUser,
  getUserDetails,
} from "../controllers/users";

const router: Router = Router();

router.post("/add", createUser);
router.post("/auth", authenticateUser);
router.get("/details", verifyToken, getUserDetails);

export default router;
