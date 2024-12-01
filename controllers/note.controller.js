import db from "../server.js";

// 단어장 조회
export const getNote = async (req, res) => {
  try {
    let sql = `SELECT date FROM registered_date`;
    const [days] = await db.execute(sql);

    const datas = [];
    for (let day of days) {
      sql = `SELECT w.id, w.word, w.mean, 
  CASE WHEN s.id IS NOT NULL THEN true ELSE false END AS scrapped
  FROM words w LEFT JOIN scraps s ON w.id = s.word_id 
  WHERE w.created_at = "${day.date}"`;
      const [words] = await db.execute(sql);
      datas.push({ date: day.date, words });
    }
    res.json(datas);
  } catch (err) {
    res.json(err);
  }
};

// 단어의 예문 조회
export const getWordSentence = async (req, res) => {
  try {
    const { word } = req.params;
    const sql = `SELECT sentence, mean FROM sentence WHERE word="${word}"`;
    const [sentence] = await db.execute(sql);
    res.json({ word, sentence });
  } catch (err) {
    res.json(err);
  }
};
