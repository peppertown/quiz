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
