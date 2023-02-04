import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const cloudinaryPhoto = await cloudinary.uploader.upload(photo); // uploads photo to cloudinary and returns it

    const newPost = await Post.create({
      name,
      prompt,
      photo: cloudinaryPhoto.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
