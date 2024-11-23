import db from "../server.js";

// 단어 등록
export const addWord = async (req, res) => {
  try {
    const words = req.body;
    const sql = `INSERT INTO words (word, mean) VALUES(?,?)`;
    for (let word of words) {
      const values = [word.word, word.mean];
      await db.execute(sql, values);
    }
    res
      .status(200)
      .json({ success: true, message: "단어 등록이 완료됐습니다." });
  } catch (err) {
    res.json(err);
  }
};
