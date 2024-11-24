import db from "../server.js";
import { generateExampleSentence } from "../utils/generateSentence.js";

// 예문 생성
export const generateSenteces = async (req, res) => {
  try {
    // 일자별 단어 조회의 응답 데이터를 body로 전달받음
    const { words, date } = req.body;
    // 예문 생성
    const examples = await generateExampleSentence(words);
    /* 형식
    [
     { result : '[{"word": 단어 ,"example": 예문 ,"meaning": 예문 뜻}]' }, ...
    ]     
     */

    const result = [];

    // 예문을 순회하며 파싱 후 배열에 담음
    for (let ex of examples) {
      ex = JSON.parse(ex.result);
      result.push(ex[0]);
    }

    // DB에 추가
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
