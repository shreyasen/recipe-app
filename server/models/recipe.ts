import { IRecipe } from "../types/recipe";
import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  mealTime: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  difficultyLevel: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
});

export default model<IRecipe>("Recipe", recipeSchema);
