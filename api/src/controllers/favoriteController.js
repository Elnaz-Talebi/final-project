import db from "../db_connection.js";
import jwt from "jsonwebtoken";
import { buildPlantCardDto } from "../dtos/buildPlantCardDto.js";

const COOKIE_NAME = "auth_token";


export const getusersFavoritePlants = async (req, res) => {
  try {

    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const userId = payload.sub;

    const favoritePlantIds = await db("favorites")
      .select("plant_id")
      .where({ user_id: userId });

    if (favoritePlantIds.length === 0) {
      return res.json([]); // Return an empty array if no favorites are found
    }

    const plantIds = favoritePlantIds.map((fav) => fav.plant_id);


    const favoritePlantsResult = await db("plants")
      .select(
        "id",
        "name",
        "description",
        "price",
        "image_url",
        "category",
        "avg_rating"
      )
      .whereIn("id", plantIds);

    if (favoritePlantsResult.length === 0) {
      return res.json([]); // Return an empty array if no favorite plants are found
    }

    const favoritePlants = favoritePlantsResult.map((plant) =>
      buildPlantCardDto(plant)
    );


    res.json(favoritePlants);
  } catch (error) {
    console.error("Error fetching user's favorite plants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFavoritePlantIds = async (req, res) => {
  try {

    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const userId = payload.sub;

    const favoritePlantIds = await db("favorites")
      .select("plant_id")
      .where({ user_id: userId });

    if (favoritePlantIds.length === 0) {
      return res.json([]); // Return an empty array if no favorites are found
    }

    const plantIds = favoritePlantIds.map((fav) => fav.plant_id);

    res.json(plantIds);


    // const favoritePlantsResult = await db("plants")
    //   .select(
    //     "id",
    //     "name",
    //     "description",
    //     "price",
    //     "image_url",
    //     "category",
    //     "avg_rating"
    //   )
    //   .whereIn("id", plantIds);

    // if (favoritePlantsResult.length === 0) {
    //   return res.json([]); // Return an empty array if no favorite plants are found
    // }

    // const favoritePlants = favoritePlantsResult.map((plant) =>
    //   buildPlantCardDto(plant)
    // );


    // res.json(favoritePlants);
  } catch (error) {
    console.error("Error fetching user's favorite plants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// POST /favorites/toggle
export const toggleFavorite = async (req, res) => {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const userId = payload.sub;

    const { plantId } = req.body;

    // Check if already in favorites
    const existing = await db("favorites")
      .where({ user_id: userId, plant_id: plantId })
      .first();

    if (existing) {
      // Remove favorite
      await db("favorites")
        .where({ user_id: userId, plant_id: plantId })
        .del();

      return res.json({ success: true, favorite: false });
    } else {
      // Add favorite
      await db("favorites").insert({ user_id: userId, plant_id: plantId });
      return res.json({ success: true, favorite: true });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
