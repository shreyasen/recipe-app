import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/user";

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const alreadyExistingUser = await User.findOne({ email });
    if (alreadyExistingUser) {
      res
        .status(406)
        .json({ message: "An user already exists with this email!" });
    } else {
      const encryptedPwd = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: encryptedPwd,
      });
      await newUser.save();
      res.status(201).json({ message: "User created successfylly!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
