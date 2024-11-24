import "dotenv/config.js";
import OpenAI from "openai";

const key = process.env.KEY;

const openai = new OpenAI({
  apiKey: key,
});

export const generateExampleSentence = async (words) => {
  const sentences = [];

  const systemMessage = `
    For each given word and definition, generate a JSON array where each object contains:
    - "word": The English word.
    - "example": A single clear example sentence using the word in a meaningful context. In the example sentence, replace the given word with a blank (_____).
    - "meaning": The Korean translation of the example sentence.

    Ensure the output is compact and does not include unnecessary line breaks, indentation, or extra formatting. The JSON should be minified.

  `;

  for (const word of words) {
    const { word: currentWord, definition } = word;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        {
          role: "user",
          content: `Word: ${currentWord}, Definition: ${definition}`,
        },
      ],
      temperature: 0.7,
    });
    sentences.push({
      result: response.choices[0].message.content,
    });
  }

  return sentences;
};
