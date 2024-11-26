import express from "express";
import "dotenv/config.js";

import wordRouter from "./routes/word.routes.js";
import sentenceRouter from "./routes/sentence.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(express.json());

app.use("/word", wordRouter);
app.use("/sentence", sentenceRouter);
app.use("/user", userRouter);

const PORT_NUMBER = process.env.PORT_NUMBER;
app.listen(PORT_NUMBER, () => {
  console.log(`Server is running on port ${PORT_NUMBER}`);
});
