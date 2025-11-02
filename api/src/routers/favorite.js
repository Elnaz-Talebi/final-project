import express from "express";

import { getusersFavoritePlants ,getFavoritePlantIds, toggleFavorite} from "../controllers/favoriteController.js";


const favoriteRouter = express.Router();

favoriteRouter.get("/", getusersFavoritePlants);

favoriteRouter.get("/plantId", getFavoritePlantIds);

favoriteRouter.post("/toggle", toggleFavorite);

export default favoriteRouter;
