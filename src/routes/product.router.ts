import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";
import productController from "../controller/product.controller";

const productRouter = express.Router();

productRouter.use(authMiddleware);
productRouter.get("/", productController.getProducts);
// ROLE: ADMIN
productRouter.use(roleMiddleware);
productRouter.get("/:id", productController.getProductById);
productRouter.post("/", productController.createProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

export default productRouter;
