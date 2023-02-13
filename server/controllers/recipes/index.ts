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

export const searchRecipe = async (req: Request, res: Response) => {
  const { name } = req.query;
  try {
    const result = await Recipe.find({
      title: { $regex: name, $options: "i" },
    });
    if (result.length) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "No recipe found!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getPopularRecipes = async (req: Request, res: Response) => {
  try {
    const result = await Recipe.find({
      isPopular: true,
    });
    if (result.length) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "No recipe found!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
