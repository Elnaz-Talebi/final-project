import express from "express";
import {
  getAllPlantsCard,
  getLimitedTopRatePlantsCard,
  getPlantsCardPage,
  getPlantById,
  insertPlantOnlyAdmin,
  searchPlantsCard,
} from "../controllers/plantController.js";
import { adminOnly } from "../middleware/insertPlantAdminOnlyMiddleWare.js";

const plantsRouter = express.Router();

// GET aLL plants card
plantsRouter.get("/all", getAllPlantsCard);

// GET search plants card
plantsRouter.get("/search", searchPlantsCard);

// GET plant by id (plant with details)
plantsRouter.get("/:id", getPlantById);

// GET limit top rating plants card
plantsRouter.get("/limited-top-rating/:limit", getLimitedTopRatePlantsCard);

// Get /plants (paginated plants)
// Query parameters:
//   - page (number, optional, default = 1) → which page of results to return
//   - pageSize (number, optional, default = 10, max = 50) → how many plants per page
// Example: GET /plants?page=2&pageSize=10 → returns plants 11–20
plantsRouter.get("/", getPlantsCardPage);

// POST insert plant (admin only)
plantsRouter.post("/addPlants", adminOnly, insertPlantOnlyAdmin);

export default plantsRouter;
