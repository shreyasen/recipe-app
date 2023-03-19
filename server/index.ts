import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Express } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import recipeRouter from "./routes/recipeRoutes";
import userRouter from "./routes/userRoutes";

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.use("/recipe", recipeRouter);
app.use("/user", userRouter);

const CONNECTION_URL: string = process.env.CONNECTION_URL;
const PORT: string | number = process.env.PORT || 5000;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  )
  .catch((error) => console.log(error));
