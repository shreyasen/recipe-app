import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { File } from "multer";
import { IRecipe } from "../../types/recipe";
import Recipe from "../../models/recipe";

interface CustomRequest extends Request {
  file: File;
}

export const addRecipe = async (req: CustomRequest, res: Response) => {
  const {
    title,
    mealTime,
    cookingTime,
    difficultyLevel,
    ingredients,
    instructions,
  } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const newRecipe: IRecipe = new Recipe({
      title,
      mealTime,
      cookingTime,
      difficultyLevel,
      ingredients,
      instructions,
      image,
    });
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
      isPopular: false,
    });
    const objectsWithImages = result.map((object) => {
      const imagePath = path.join(__dirname, "../../", "uploads", object.image);
      const image = fs.readFileSync(imagePath, { encoding: "base64" });
      return { ...object.toObject(), image };
    });
    if (result.length) {
      res.status(200).send(objectsWithImages);
    } else {
      res.status(404).send({ message: "No popular recipe found!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
