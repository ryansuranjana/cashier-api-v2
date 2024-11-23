import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controller/category.controller";

const categoryRouter = express.Router();

categoryRouter.use(authMiddleware);
categoryRouter.use(roleMiddleware);

categoryRouter.get("/api/categories", getCategories);
categoryRouter.get("/api/categories/:id", getCategoryById);
categoryRouter.post("/api/categories", createCategory);
categoryRouter.put("/api/categories/:id", updateCategory);
categoryRouter.delete("/api/categories/:id", deleteCategory);

export default categoryRouter;
