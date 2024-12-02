import db from "../server.js";

// 퀴즈 리스트 생성
export const getQuizzes = async (req, res) => {
  try {
    let sql = `SELECT id, word,mean FROM words ORDER BY RAND() LIMIT 5`;
    const [wordsForQuiz] = await db.execute(sql);

    sql = `SELECT w.id, w.word, s.sentence, s.mean FROM words w JOIN sentence s ON w.word = s.word ORDER BY RAND() LIMIT 5`;
    const [sentencesForQuiz] = await db.execute(sql);

    const quizzes = {
      wordQuiz: wordsForQuiz,
      senetenceQuiz: sentencesForQuiz,
    };
    res.json(quizzes);
  } catch (err) {
    res.json(err);
  }
};

// 퀴즈 피드백
export const handleWrongWords = async (req, res) => {
  try {
    const data = req.body;
    const values = data.map((v) => [v.id, 1]);
    // 데이터가 없을 시 등록, 있을 시 count + 1
    const sql = `INSERT INTO user_history (word_id, count)
  VALUES ? ON DUPLICATE KEY UPDATE count = count + 1`;

    await db.query(sql, [values]);
    res.json({ success: true });
  } catch (err) {
    res.json(err);
  }
};
