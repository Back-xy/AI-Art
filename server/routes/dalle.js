import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const router = express.Router();

router
  .route("/")
  .get((req, res) => res.send("Hello from DALL-E"))
  .post(async (req, res) => {
    try {
      const { prompt } = req.body;

      const aiResponse = await openai.createImage({
        prompt,
        n: 1,
        size: "384x384",
        response_format: "b64_json",
      });
      const img = aiResponse.data.data[0].b64_json;

      res.status(200).json({ photo: img });
    } catch (error) {
      console.log(error);
      res.status(500).send(error?.response.data.error.message);
    }
  });

export default router;
