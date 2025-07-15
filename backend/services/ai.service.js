const { GoogleGenAI } = require('@google/genai');

const apiKey = process.env.GOOGLE_AI_KEY;
const genAI = new GoogleGenAI({apiKey});
console.log(genAI);


async function generateResult(prompt) {
  const result = await genAI.models.generateContent(
      {
    model: "gemini-2.5-flash",
    contents:[prompt]
  },);
 
  
  return result.candidates[0].content.parts[0].text;

}

const aiServices = {generateResult};

module.exports = {aiServices}



