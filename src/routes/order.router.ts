import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import orderController from "../controller/order.controller";

const orderRouter = express.Router();

orderRouter.use(authMiddleware);

orderRouter.get("/", orderController.getOrders);
orderRouter.get("/:id", orderController.getOrderById);
orderRouter.post("/", orderController.createOrder);

export default orderRouter;
