import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const router = express.Router();

router
  .route('/')
  .get((req, res) => res.send('Hello from DALL-E'))
  .post(async (req, res) => {
    try {
      const { prompt } = req.body;

      const aiResponse = await openai.createImage({
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      });
      const img = aiResponse.data.data[0].b64_json;

      res.status(200).json({ photo: img });
    } catch (error) {
        if (error.response) {
        console.log("Avatar error status: ", error.response.status);
        console.log("Avatar error data: ", error.response.data);
        res.status(500).send(error.response.status);
      } else {
        console.log("Avatar error message: ", error.message);
        res.status(500).send(error.message);
      }
    }
  });

export default router;
