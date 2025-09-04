import "dotenv/config";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import plantsRouter from "./routers/plants.js";
import plantCareRouter from "./routers/plantCare.js";
import plantSpecificationRouter from "./routers/plantSpecification.js";
import reviewsRouter from "./routers/reviews.js";
import usersRouter from "./routers/users.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/plants", plantsRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);

app.get("/", (_req, res) => {
  res.send("API is running...");
});

app.listen(process.env.PORT, () => {
  console.log(`API listening on http://localhost:${process.env.PORT}`);
});
