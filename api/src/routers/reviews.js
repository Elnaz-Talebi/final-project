import express from "express";

// Import controllers
import { getAllreviewsByPlantId , addReviewToDatabase} from "../controllers/reviewController.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/:plantId", getAllreviewsByPlantId);

reviewsRouter.post("/", addReviewToDatabase);

export default reviewsRouter;
