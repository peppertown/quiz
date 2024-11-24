import db from "../server.js";
import { generateExampleSentence } from "../utils/generateSentence.js";

// 예문 생성
export const generateSenteces = async (req, res) => {
  try {
    const { words, date } = req.body;
    const examples = await generateExampleSentence(words);

    const result = [];

    for (let ex of examples) {
      ex = JSON.parse(ex.result);
      result.push(ex[0]);
    }

    const sql = `INSERT INTO sentence (word, sentence, mean, date) VALUES(?,?,?,?)`;
    for (let res of result) {
      const { word, example, meaning } = res;
      const values = [word, example, meaning, date];
      await db.execute(sql, values);
    }
    res.json({ success: true });
  } catch (err) {
    res.json(err);
  }
};
