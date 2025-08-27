import "dotenv/config";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API is running...");
});

//Remember to update your dotenv .env files with following and it work work smoothly
//DATABASE_URL= postgresql://neondb_owner:npg_da1TPnJGV0Kb@ep-wandering-frog-adarjlow-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
//JWT_SECRET=ever_leaf_key_51214?
//PORT=5000

//I am adding some APIs to read from database created at neon. TEST CASES. ALI CAN CHANGE it Later ON.

app.get("/users", async (_req, res) => {
  const db = (await import("./db_connection.js")).default;
  try {
    const users = await db.select("*").from("users");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/plants", async (_req, res) => {
  const db = (await import("./db_connection.js")).default;
  try {
    const plants = await db.select("*").from("plants");
    res.json(plants);
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/reviews", async (_req, res) => {
  const db = (await import("./db_connection.js")).default;
  try {
    const reviews = await db.select("*").from("reviews");
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`API listening on http://localhost:${process.env.PORT}`);
});
