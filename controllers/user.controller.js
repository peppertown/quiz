import db from "../server.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const { userId, password } = req.body;
    if (!userId) return res.json("아이디를 입력해주세요");
    if (!password) return res.json("비밀번호를 입력해주세요");

    let sql = `SELECT * FROM users WHERE user_id=?`;
    let [user] = await db.execute(sql, [userId]);
    if (!user.length) return res.json("존재하지 않는 ID 입니다");
    user = user[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json("비밀번호가 일치하지 않습니다.");

    const token = jwt.sign(
      { id: user.id, user_id: user.user_id, nickname: user.nickname },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      message: "로그인 성공",
      token,
    });
  } catch (err) {
    res.json(err);
  }
};
