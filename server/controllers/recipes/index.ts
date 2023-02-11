import { Request, Response } from "express";
import { IRecipe } from "../../types/recipe";
import Recipe from "../../models/recipe";

export const addRecipe = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const newRecipe: IRecipe = new Recipe(body);
    await newRecipe.save();
    res.status(201).send({ message: "recipe added successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
