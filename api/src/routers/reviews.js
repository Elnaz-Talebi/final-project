import express from "express";

// Import controllers
import { getAllreviewsByPlantId } from "../controllers/reviewController.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/:plantId", getAllreviewsByPlantId);

export default reviewsRouter;
