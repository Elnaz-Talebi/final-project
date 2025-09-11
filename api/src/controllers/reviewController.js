import db from "../db_connection.js";
import { buildReviewDto } from "../dtos/buildReviewDto.js";
import { checkReviewInputsValidation } from "../utils/checkReviewInputsValidation.js";

export const getAllReviewsByPlantId = async (req, res) => {
  try {
    const plantId = parseInt(req.params.plantId);
    if (!plantId || isNaN(plantId) || plantId < 1) {
      return res.status(400).json({ message: "Invalid plantId" });
    }
    const result = await db("reviews").select("*").where({ plant_id: plantId });

    if (result.length === 0) {
      return res.status(404).json({ message: "No review found" });
    }

    const reviews = result.map((item) => buildReviewDto(item));

    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addReviewToDatabase = async (req, res) => {
  try {
    const parsedInputs = checkReviewInputsValidation.safeParse(req.body);

    if (!parsedInputs.success) {
      return res.status(400).json({ errors: parsedInputs.error.errors });
    }

    const { plantId, userId, rating, comment } = parsedInputs.data;

    const [review] = await db("reviews")
      .insert({ plant_id: plantId, user_id: userId, rating, comment })
      .returning("*");

    res.status(201).json(buildReviewDto(review));
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
