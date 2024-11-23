import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { loginUser, refreshAccessToken, logoutUser } from "../controller/auth.controller";

const authRouter = express.Router();

authRouter.post("/api/login", loginUser);
authRouter.post("/api/refresh", refreshAccessToken);

authRouter.use(authMiddleware);

authRouter.post("/api/logout", logoutUser);

export default authRouter;
