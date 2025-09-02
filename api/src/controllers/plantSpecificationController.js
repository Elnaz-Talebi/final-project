import db from "../db_connection.js";
import {buildPlantSpecificationDto} from '../dtos/buildPlantSpecificationDto.js'

export const getPlantSpecificationByPlantId = async (req, res) => {
  try {
    const plantId = parseInt(req.params.plantId);

    if (!plantId || isNaN(plantId) || plantId < 1) {
      return res.status(400).json({ message: "Invalid plant id" });
    }

    const result = await db("plant_specification")
      .select("*")
      .where({ plant_id: plantId })
      .first();

    if (!result) {
      return res
        .status(404)
        .json({ message: "No plant specification found" });
    }

    const plantSpecification = buildPlantSpecificationDto(result);

    res.json(plantSpecification);
  } catch (error) {
    console.error("Error fetching plant specification :", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
