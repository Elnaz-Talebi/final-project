import express from "express";

import { getPlantCareInstructionsByPlantId } from "../controllers/plantCareController.js";

const plantCareRouter = express.Router();

plantCareRouter.get("/:plantId", getPlantCareInstructionsByPlantId);

export default plantCareRouter;
