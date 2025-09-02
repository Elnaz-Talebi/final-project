import db from "../db_connection.js";
import {buildPlantCareInstructionsDto} from '../dtos/buildPlantCareInstructionsDto.js'

export const getPlantCareInstructionsByPlantId = async (req, res) => {
  try {
    const plantId = parseInt(req.params.plantId);

    if (!plantId || isNaN(plantId) || plantId < 1) {
      return res.status(400).json({ message: "Invalid plant id" });
    }

    const result = await db("plant_care_instructions")
      .select("*")
      .where({ plant_id: plantId })
      .first();

    if (!result) {
      return res
        .status(404)
        .json({ message: "No plant care instructions found" });
    }

    const plantCare = buildPlantCareInstructionsDto(result);

    res.json(plantCare);
  } catch (error) {
    console.error("Error fetching plant care instructions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
