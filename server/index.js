import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/post.js";
import dalleRoutes from "./routes/dalle.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Hello from DALL-E");
});

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8000, () => console.log("Serving on port 8000"));
  } catch (err) {
    console.log(err);
  }
};

startServer();
