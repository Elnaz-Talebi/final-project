import db from "../db_connection.js";
import {buildReviewDto} from "../dtos/buildReviewDto.js";

export const getAllreviewsByPlantId = async (req, res) => {
  try {
    const plantId = parseInt(req.params.plantId);
    if (!plantId || isNaN(plantId) || plantId < 1) {
      return res.status(400).json({ message: "Invalid plantId" });
    }
    const result = await db("reviews").select("*").where({ plant_id: plantId });

    console.log(result);

    if (!result) {
      return res.status(404).json({ message: "No review found" });
    }

    const reviews = result.map((item) => buildReviewDto(item));

    res.json(reviews);
  } catch (err) {
    console.error("Error fetching plants:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
