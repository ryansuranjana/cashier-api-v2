import express from "express";
import { prisma } from "../index";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";
import { createPayment, deletePayment, getPaymentById, getPayments, updatePayment } from "../controller/payment.controller";

const paymentRouter = express.Router();

paymentRouter.use(authMiddleware);
paymentRouter.use(roleMiddleware);

paymentRouter.get("/api/payments", getPayments);
paymentRouter.get("/api/payments/:id", getPaymentById);
paymentRouter.post("/api/payments", createPayment);
paymentRouter.put("/api/payments/:id", updatePayment);
paymentRouter.delete("/api/payments/:id", deletePayment);

export default paymentRouter;
