import db from "../db_connection.js";
import { buildPlantCardDto } from "../dtos/buildPlantCardDto.js";
import { buildPlantDetailDto } from "../dtos/buildPlantDetailDto.js";
import { checkPageQueryValidation } from "../utils/checkPageQueryValidation.js";
import sanitizeHtml from "sanitize-html";

// Controller to get all plants (cards only)

export const getAllPlantsCard = async (req, res) => {
  try {
    const result = await db("plants").select(
      "id",
      "name",
      "description",
      "price",
      "image_url",
      "category",
      "avg_rating"
    );

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

// Controller for searching in the plants (cards only)

export const searchPlantsCard = async (req, res) => {
  try {
    let { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ message: "Search query cannot be empty" });
    }

    q = sanitizeHtml(q, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();

    const result = await db("plants")
      .select("id", "name", "avg_rating")
      .whereILike("name", `%${q}%`)
      .orWhereILike("description", `%${q}%`);

    if (!result || result.length === 0) {
      return res
        .status(404)
        .json({ message: `No plants found matching '${q}'` });
    }

    const plants = result.map((plant) => ({
      id: plant.id,
      name: plant.name,
      avg_rating: plant.avg_rating || 0,
    }));

    res.json(plants);
  } catch (err) {
    console.error("Error searching plants:", err);
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
      .select("id", "name", "description", "price", "image_url")
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
      .select(
        "id",
        "name",
        "description",
        "price",
        "image_url",
        "category",
        "avg_rating"
      )
      .limit(pageSize)
      .offset(offset);

    const plants = result.map((plant) => buildPlantCardDto(plant));

    const totalResults = await db("plants").count("id as count").first();

    if (!plants || plants.length === 0) {
      return res.status(404).json({ message: "No plants found" });
    }

    res.json({
      page,
      pageSize,
      totalResults: Number(totalResults.count),
      results: plants.length,
      plants: plants,
    });
  } catch (err) {
    console.error("Error fetching plants:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// This controller is for inserting a new plant (admin only)

export const insertPlantOnlyAdmin = async (req, res) => {
  try {
    let {
      name,
      description,
      price,
      image_url,
      category,
      water_schedule,
      sunlight_exposure,
      humidity_and_temperature,
      soil_and_fertilizer,
      scientific_name,
      family,
      origin,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !image_url ||
      !category ||
      !water_schedule ||
      !sunlight_exposure ||
      !humidity_and_temperature ||
      !soil_and_fertilizer ||
      !scientific_name ||
      !family ||
      !origin
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Sanitize all string inputs
    name = sanitizeHtml(name, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
    description = sanitizeHtml(description, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
    image_url = sanitizeHtml(image_url, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
    category = sanitizeHtml(category, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
    water_schedule = sanitizeHtml(water_schedule, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
    sunlight_exposure = sanitizeHtml(sunlight_exposure, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
    humidity_and_temperature = sanitizeHtml(humidity_and_temperature, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
    soil_and_fertilizer = sanitizeHtml(soil_and_fertilizer, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
    scientific_name = sanitizeHtml(scientific_name, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
    family = sanitizeHtml(family, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
    origin = sanitizeHtml(origin, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();

    const [plant] = await db("plants")
      .insert({
        name,
        description,
        price,
        image_url,
        category,
        water_schedule,
        sunlight_exposure,
        humidity_and_temperature,
        soil_and_fertilizer,
        scientific_name,
        family,
        origin,
      })
      .returning([
        "id",
        "name",
        "description",
        "price",
        "image_url",
        "category",
        "created_at",
        "updated_at",
        "water_schedule",
        "sunlight_exposure",
        "humidity_and_temperature",
        "soil_and_fertilizer",
        "scientific_name",
        "family",
        "origin",
        "avg_rating",
      ]);

    res.status(201).json({ message: "Plant Inserted Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to Insert New Plant" });
  }
};
