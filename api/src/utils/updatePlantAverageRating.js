import db from "../db_connection.js";

export const updatePlantAverageRating = async (plantId, reviewRating) => {
  try {
    const NumberOfReviewsResult = await db("reviews")
      .where("plant_id", plantId)
      .count("* as count");

    const NumberOfReviews = parseInt(result[0].count, 10);

    const previousAverageRatingResult = await db("plants")
      .select("average_rating")
      .where({ id: plantId })
      .first();

    const previousAverageRating = parseFloat(
      previousAverageRatingResult.average_rating
    );

    const newAverageRating =
      (NumberOfReviews * previousAverageRating + reviewRating) /
      (NumberOfReviews + 1);

    const [updatedPlant] = await db("plants").where({ id: plantId }).update(
      {
        average_rating: newAverageRating,
        updated_at: db.fn.now(),
      },
      ["id", "average_rating", "updated_at"] // return columns
    );
  } catch (err) {
    console.error("Error updating average rating:", err);
  }
};
