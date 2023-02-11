import { Document } from "mongoose";

export interface IRecipe extends Document {
  title: string;
  mealTime: string;
  cookingTime: number;
  difficultyLevel: string;
  ingredients: string[];
  instructions: string[];
}
