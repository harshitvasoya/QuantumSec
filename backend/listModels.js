const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Load .env

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const models = await genAI.listModels();
    console.log("Available Gemini Models:");
    models.forEach(model => {
      console.log("- " + model.name);
    });
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();
