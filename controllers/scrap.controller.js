import db from "../server.js";

// 스크랩 추가 제거
export const handleScraps = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `SELECT COUNT(*) AS exist FROM scraps WHERE word_id = ${id}`;
    const [scrapped] = await db.execute(sql);

    if (scrapped[0].exist) {
      sql = `DELETE FROM scraps WHERE word_id=${id}`;
    } else {
      sql = `INSERT INTO scraps (word_id) VALUES (${id})`;
    }

    await db.execute(sql);
    res.json({ success: true });
  } catch (err) {
    res.json(err);
  }
};

// 스크랩 목록 조회
export const getScraps = async (req, res) => {
  try {
    const sql = `SELECT w.id, w.word, w.mean FROM words w JOIN scraps s WHERE s.word_id = w.id;`;
    const [scraps] = await db.execute(sql);
    res.json(scraps);
  } catch (err) {
    res.json(err);
  }
};
