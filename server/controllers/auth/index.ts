import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../types/authenticatedRequest";

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const bearerToken = bearerHeader.split(" ")[1];
    const decoded = jwt.verify(
      bearerToken,
      process.env.JWT_SECRET as string
    ) as { email: string };
    req.userEmail = decoded.email;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
