import { Router } from "express";
import {
  addRecipe,
  searchRecipe,
  getPopularRecipes,
} from "../controllers/recipes";

const router: Router = Router();

router.post("/add", addRecipe);
router.get("/search", searchRecipe);
router.get("/popular", getPopularRecipes);

export default router;
