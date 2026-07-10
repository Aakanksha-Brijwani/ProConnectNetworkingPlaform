
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import postRouters from "./routes/posts.routes.js";
import userRouters from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(postRouters);
app.use(userRouters);

app.use(express.static("uploads"));

const PORT = process.env.PORT || 5001;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.log(err);
  }
};

start();