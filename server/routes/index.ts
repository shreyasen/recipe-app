import { Router } from "express";
import { addRecipe } from "../controllers/recipes";

const router: Router = Router();

router.post("/add", addRecipe);

export default router;
