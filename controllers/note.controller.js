import db from "../server.js";

// 단어장 조회
export const getNote = async (req, res) => {
  try {
    let sql = `SELECT r.date, w.word, w.mean FROM registered_date r JOIN words w ON r.date = w.created_at`;
    const [dateWords] = await db.execute(sql);

    res.json(dateWords);
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
