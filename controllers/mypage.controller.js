import db from "../server.js";

// 마이페이지 조회
export const getMypage = async (req, res) => {
  const date = new Date();
  const today = date.to;
  const sql = `SELECT u.user_id, u.nickname, (SELECT COUNT(*) FROM registered_date) AS days,
  (SELECT COUNT(*) FROM words) AS words FROM users u`;
  // 유저 아이디, 닉네임, 총 출석일, 총 학습 단어 수
  const [result] = await db.execute(sql);

  res.json(result[0]);
};
