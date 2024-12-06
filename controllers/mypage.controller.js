import db from "../server.js";

// 마이페이지 조회
export const getMypage = async (req, res) => {
  const sql = `SELECT u.user_id, u.nickname, (SELECT COUNT(*) FROM registered_date) AS days,
  (SELECT COUNT(*) FROM words) AS words FROM users u`;
  // 유저 아이디, 닉네임, 총 출석일, 총 학습 단어 수
  const [result] = await db.execute(sql);

  res.json(result[0]);
};

// 복습 단어 조회
export const getWordHistory = async (req, res) => {
  try {
    const sql = `SELECT u.count, w.word, w.mean FROM user_history u JOIN words w 
  ON u.word_id = w.id ORDER BY count DESC`;

    const [history] = await db.execute(sql);
    res.json(history);
  } catch (err) {
    res.json(err);
  }
};
