import { Router } from "express";
import { createUser } from "../controllers/users";

const router: Router = Router();

router.post("/add", createUser);

export default router;
