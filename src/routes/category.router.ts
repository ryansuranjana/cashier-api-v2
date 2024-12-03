import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";
import categoryController from "../controller/category.controller";

const categoryRouter = express.Router();

categoryRouter.use(authMiddleware);
categoryRouter.use(roleMiddleware);

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.get("/:id", categoryController.getCategoryById);
categoryRouter.post("/", categoryController.createCategory);
categoryRouter.put("/:id", categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);

export default categoryRouter;
