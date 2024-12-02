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
