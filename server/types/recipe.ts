import { Document } from "mongoose";

export interface IRecipe extends Document {
  title: string;
  mealTime: string;
  cookingTime: number;
  difficultyLevel: string;
  isPopular: boolean;
  ingredients: string[];
  instructions: string[];
  image: string;
}
