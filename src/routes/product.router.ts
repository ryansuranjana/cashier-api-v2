import express from "express";
import { prisma } from "../index";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controller/product.controller";

const productRouter = express.Router();

productRouter.use(authMiddleware);

productRouter.get("/api/products", getProducts);
// ROLE: ADMIN
productRouter.use(roleMiddleware);
productRouter.get("/api/products/:id", getProductById);
productRouter.post("/api/products", createProduct);
productRouter.put("/api/products/:id", updateProduct);
productRouter.delete("/api/products/:id", deleteProduct);

export default productRouter;
