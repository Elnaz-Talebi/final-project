import "dotenv/config";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import plantsRouter from "./routers/plants.js";
import reviewsRouter from "./routers/reviews.js";
import usersRouter from "./routers/users.js";
import cookieParser from "cookie-parser";
import authenticationsRouter from "./routers/auth.js";
import questionAnswerRouter from "./routers/questionAnswerRouter.js";
import favoriteRouter from "./routers/favorite.js";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/plants", plantsRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);
app.use("/auth", authenticationsRouter);
app.use("/question-answer", questionAnswerRouter);
app.use("/favorites", favoriteRouter);

app.get("/", (_req, res) => {
  res.send("API is running...");
});

app.listen(process.env.PORT, () => {
  console.log(`API listening on http://localhost:${process.env.PORT}`);
});
