import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";
import paymentController from "../controller/payment.controller";

const paymentRouter = express.Router();

paymentRouter.use(authMiddleware);
paymentRouter.use(roleMiddleware);

paymentRouter.get("/", paymentController.getPayments);
paymentRouter.get("/:id", paymentController.getPaymentById);
paymentRouter.post("/", paymentController.createPayment);
paymentRouter.put("/:id", paymentController.updatePayment);
paymentRouter.delete("/:id", paymentController.deletePayment);

export default paymentRouter;
