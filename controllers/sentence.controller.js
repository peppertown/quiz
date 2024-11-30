import db from "../server.js";
import { generateExampleSentence } from "../utils/generateSentence.js";

// 예문 생성
export const generateSenteces = async (req, res) => {
  try {
    // 일자별 단어 조회의 응답 데이터를 body로 전달받음
    let { words, date } = req.body;
    // 예문 생성 여부에 따라 단어 목록 수정
    words = words.filter((word) => !word.isGenerated);

    if (!words.length) {
      return res.json({ message: "예문 생성이 완료된 단어들입니다." });
    }
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

    for (let word of words) {
      await db.execute(`UPDATE words SET isGenerated = 1 WHERE id=${word.id}`);
    }

    res.json({ success: true });
  } catch (err) {
    res.json(err);
  }
};

// 예문 조회
export const getSentences = async (req, res) => {
  const { date } = req.query;
  const sql = `SELECT word, sentence, mean FROM sentence WHERE date = "${date}"`;

  const [words] = await db.execute(sql);
  res.json(words);
};
