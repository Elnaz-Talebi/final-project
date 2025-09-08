import express from "express";
import { login, register, me, logout } from "../controllers/authController.js";

const authenticationsRouter = express.Router();

authenticationsRouter.post("/register", register);
authenticationsRouter.post("/login", login);
authenticationsRouter.get("/me", me);
authenticationsRouter.post("/logout", logout);

export default authenticationsRouter;
