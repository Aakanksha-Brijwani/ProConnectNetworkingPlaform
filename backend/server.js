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
app.use(express.json());


const start = async () => {
  const connectDB = await mongoose.connect(
    "mongodb://aakankshabrijwani_db_user:Z3ibSAegr9UdYzM2@ac-mtx7sam-shard-00-00.ajjcnze.mongodb.net:27017,ac-mtx7sam-shard-00-01.ajjcnze.mongodb.net:27017,ac-mtx7sam-shard-00-02.ajjcnze.mongodb.net:27017/?ssl=true&replicaSet=atlas-vjczdu-shard-0&authSource=admin&appName=apnaproconnect",
  );

  app.listen(5001, () => {
    console.log("Server is running on port 5001");
  });
};
start();
