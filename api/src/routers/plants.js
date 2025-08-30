import express from "express";
import db from "../db_connection.js";

const plantsRouter = express.Router();

// GET ALL plants
router.get("/", async (req, res) => {
  try {
    const plants = await db("plants").select("*");
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET plant by id
router.get("/:id", async (req, res) => {
  try {
    const plant = await db("plants").where({ id: req.params.id }).first();
    if (!plant) return res.status(404).json({ error: "Plant not found" });
    res.json(plant);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default plantsRouter;