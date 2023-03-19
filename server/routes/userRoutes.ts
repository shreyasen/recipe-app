import { Router } from "express";
import { createUser, authenticateUser } from "../controllers/users";

const router: Router = Router();

router.post("/add", createUser);
router.post("/auth", authenticateUser);

export default router;
