import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import authController from "../controller/auth.controller";

const authRouter = express.Router();

authRouter.post("/login", authController.loginUser);
authRouter.post("/refresh", authController.refreshAccessToken);

authRouter.use(authMiddleware);

authRouter.post("/logout", authController.logoutUser);

export default authRouter;
