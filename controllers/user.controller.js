import db from "../server.js";
import bcrypt from "bcrypt";

export const join = async (req, res) => {
  const { userId, password, nickname } = req.body;

  // 아이디, 비밀번호, 닉네임 미입력 예외처리
  if (!userId) return res.json("아이디를 입력해주세요");
  if (!password) return res.json("아이디를 입력해주세요");
  if (!nickname) return res.json("아이디를 입력해주세요");
  try {
    // 아이디 중복 검사
    let sql = `SELECT * FROM users WHERE user_id = ?`;
    const [result] = await db.execute(sql, [userId]);
    if (result.length) return res.json("중복된 아이디 입니다.");

    // 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    sql = `INSERT INTO users (user_id, password, nickname)
    VALUES (?,?,?)`;
    const values = [userId, hashedPassword, nickname];
    await db.execute(sql, values);

    res.json("회원가입 완료");
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
