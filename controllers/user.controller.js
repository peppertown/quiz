import db from "../server.js";

export const join = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [result] = await db.execute(
      `INSERT INTO users (email, password) VALUES (?,?)`,
      [email, password]
    );

    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
};
