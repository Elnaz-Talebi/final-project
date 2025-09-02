import express from "express";

import { getPlantSpecificationByPlantId } from "../controllers/plantSpecificationController.js";

const plantSpecificationRouter = express.Router();

plantSpecificationRouter.get("/:plantId", getPlantSpecificationByPlantId);

export default plantSpecificationRouter;
