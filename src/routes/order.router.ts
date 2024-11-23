import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { createOrder, getOrderById, getOrders } from "../controller/order.controller";

const orderRouter = express.Router();

orderRouter.use(authMiddleware);

orderRouter.get("/api/orders", getOrders);
orderRouter.get("/api/orders/:id", getOrderById);
orderRouter.post("/api/orders", createOrder);

export default orderRouter;
