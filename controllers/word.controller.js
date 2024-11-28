import db from "../server.js";

// 단어 등록
export const addWord = async (req, res) => {
  try {
    const { date } = req.query;
    const words = req.body;
    let sql = `INSERT INTO words (word, mean) VALUES(?,?)`;
    for (let word of words) {
      const values = [word.word, word.mean];
      await db.execute(sql, values);
    }

    await db.execute(`INSERT INTO registered_date (date, word_count)
    VALUES ("${date}", ${words.length})
    ON DUPLICATE KEY UPDATE word_count = word_count + ${words.length}`);

    res
      .status(200)
      .json({ success: true, message: "단어 등록이 완료됐습니다." });
  } catch (err) {
    res.json(err);
  }
};

// 단어 일자별 조회
export const getWords = async (req, res) => {
  try {
    const { date } = req.query;

    const sql = `SELECT id, word, mean FROM words WHERE created_at = "${date}"`;

    const [words] = await db.execute(sql);
    res.json({ words, date });
  } catch (err) {
    res.json(err);
  }
};

// 단어 수정
export const modifyWord = async (req, res) => {
  try {
    const { id } = req.params;
    const { word, mean } = req.body;

    const sql = `UPDATE words SET word=?, mean=? WHERE id=?`;
    const params = [word, mean, id];

    const [result] = await db.execute(sql, params);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

// 단어 삭제
export const deleteWord = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `DELETE FROM words WHERE id = ${id}`;
    await db.execute(sql);
    res.json({ success: true });
  } catch (err) {
    res.json(err);
  }
};
