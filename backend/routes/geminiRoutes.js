const express = require("express");
require("dotenv").config(); // ✅ must be at top
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const router = express.Router();

router.post("/ask-gemini", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({
      error: "Something went wrong with Gemini API.",
      details: err.message || err.toString(),
    });
  }
});

module.exports = router;
