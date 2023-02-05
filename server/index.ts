import cors from "cors";
import express, { Express } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

const CONNECTION_URL: string =
  "mongodb+srv://shreyasen:Shreya12345@cluster0.zofcwto.mongodb.net/?retryWrites=true&w=majority";
const PORT: string | number = process.env.PORT || 5000;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  )
  .catch((error) => console.log(error));
