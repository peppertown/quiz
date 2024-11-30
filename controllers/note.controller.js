import db from "../server.js";

// 단어장 조회
export const getNote = async (req, res) => {
  let sql = `SELECT date FROM registered_date`;
  const [days] = await db.execute(sql);

  const datas = [];
  for (let day of days) {
    sql = `SELECT word, mean FROM words WHERE created_at = "${day.date}"`;
    const [words] = await db.execute(sql);
    datas.push({ date: day.date, words });
  }
  res.json(datas);
};

// 단어의 예문 조회
export const getWordSentence = async (req, res) => {
  const { word } = req.params;
  const sql = `SELECT sentence, mean FROM sentence WHERE word="${word}"`;
  const [sentence] = await db.execute(sql);
  res.json(sentence);
};