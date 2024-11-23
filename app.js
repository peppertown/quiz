import express from "express";
import "dotenv/config.js";

import wordRouter from "./routes/word.routes.js";

const app = express();
app.use(express.json());

app.use("/word", wordRouter);

const PORT_NUMBER = process.env.PORT_NUMBER;
app.listen(PORT_NUMBER, () => {
  console.log(`Server is running on port ${PORT_NUMBER}`);
});
