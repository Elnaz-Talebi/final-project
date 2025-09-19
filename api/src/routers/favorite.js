import express from "express";

import { getusersFavoritePlants } from "../controllers/favoriteController.js";

const favoriteRouter = express.Router();

favoriteRouter.get("/", getusersFavoritePlants);

export default favoriteRouter;
