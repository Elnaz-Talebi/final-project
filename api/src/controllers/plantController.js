import db from "../db_connection.js";
import { buildPlantCardDto } from "../dtos/buildPlantCardDto.js";
import { buildPlantDetailDto } from "../dtos/buildPlantDetailDto.js";
import { checkPageQueryValidation } from "../utils/checkPageQueryValidation.js";

export const getAllPlantsCard = async (req, res) => {
  try {
    const result = await db("plants").select("id", "name" , "description", "price", "image_url");

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No plants found" });
    }
    const plants = result.map((plant) => buildPlantCardDto(plant));

    res.json(plants);
  } catch (err) {
    console.error("Error fetching plants:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPlantById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id || isNaN(id) || id < 1) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const result = await db("plants").select("*").where({ id }).first();

    if (!result) {
      return res.status(404).json({ message: "No plant found" });
    }

    const plant = buildPlantDetailDto(result);

    res.json(plant);
  } catch (err) {
    console.error("Error fetching plants:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getLimitedTopRatePlantsCard = async (req, res) => {
  try {
    const limit = parseInt(req.params.limit);
    if (!limit || isNaN(limit) || limit < 1) {
      return res.status(400).json({ message: "Invalid limit number" });
    }
    const result = await db("plants")
      .select("id", "name" , "description", "price", "image_url")
      .orderBy("avg_rating", "asc")
      .limit(limit);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No plants found" });
    }

    const plants = result.map((plant) => buildPlantCardDto(plant));

    res.json(plants);
  } catch (err) {
    console.error("Error fetching plants:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPlantsCardPage = async (req, res) => {
  try {
    const parsedQuery = checkPageQueryValidation.safeParse(req.query);

    if (!parsedQuery.success) {
      return res.status(400).json({ errors: parsedQuery.error.errors });
    }

    const { page, pageSize } = parsedQuery.data;

    // Calculate how many records to skip before selecting data.
    // Example: if page=2 and pageSize=10 → offset = 10 (skip first 10, start from 11th)
    const offset = (page - 1) * pageSize;

    const result = await db("plants")
      .select("id", "name" , "description", "price", "image_url")
      .limit(pageSize)
      .offset(offset);

    const plants = result.map((plant) => buildPlantCardDto(plant));

    res.json({
      page,
      pageSize,
      results: plants.length,
      plants: plants,
    });
  } catch (err) {
    console.error("Error fetching plants:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
