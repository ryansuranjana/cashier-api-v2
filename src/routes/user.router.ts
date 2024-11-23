import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controller/user.controller";

const userRouter = express.Router();

userRouter.use(authMiddleware);
userRouter.use(roleMiddleware);

userRouter.get("/api/users", getUsers);
userRouter.get("/api/users/:id", getUserById);
userRouter.post("/api/users", createUser);
userRouter.put("/api/users/:id", updateUser);
userRouter.delete("/api/users/:id", deleteUser);

export default userRouter;
