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

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [result] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (result.length && result[0].password == password) {
      res.json({ message: `${result[0].email}님 환영합니다.` });
    } else {
      res.json({ message: "등록되지 않은 계정입니다." });
    }
  } catch (err) {
    res.json(err);
  }
};
