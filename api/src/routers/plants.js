import express from "express";
import {
  getAllPlantsCard,
  getLimitedTopRatePlantsCard,
  getPlantsCardPage,
  getPlantById,
  getPlantCareInstructions,
} from "../controllers/plantController.js";

const plantsRouter = express.Router();

// GET aLL plants card
plantsRouter.get("/all", getAllPlantsCard);

// GET plant by id (plant with details)
plantsRouter.get("/:id", getPlantById);

// GET plant care instructions by id
plantsRouter.get("/:id/care-instructions", getPlantCareInstructions);

// GET limit top rating plants card
plantsRouter.get("/limited-top-rating/:limit", getLimitedTopRatePlantsCard);

// Get /plants (paginated plants)
// Query parameters:
//   - page (number, optional, default = 1) → which page of results to return
//   - pageSize (number, optional, default = 10, max = 50) → how many plants per page
// Example: GET /plants?page=2&pageSize=10 → returns plants 11–20
plantsRouter.get("/", getPlantsCardPage);

export default plantsRouter;
