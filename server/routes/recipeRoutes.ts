import { Router } from "express";
import multer from "multer";
import {
  addRecipe,
  searchRecipe,
  getPopularRecipes,
} from "../controllers/recipes";

const router: Router = Router();

const upload = multer({ dest: "uploads/" });

router.post("/add", upload.single("image"), addRecipe);
router.get("/search", searchRecipe);
router.get("/popular", getPopularRecipes);

export default router;
