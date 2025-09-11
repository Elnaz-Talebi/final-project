import express from "express";

// Import controllers
import { getAllReviewsByPlantId , addReviewToDatabase} from "../controllers/reviewController.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/:plantId", getAllReviewsByPlantId);

reviewsRouter.post("/", addReviewToDatabase);

export default reviewsRouter;
