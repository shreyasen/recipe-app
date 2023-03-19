import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  console.log(req.headers);
  if (!bearerHeader) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const bearerToken = bearerHeader.split(" ")[1];
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.userEmail = decoded.email;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
