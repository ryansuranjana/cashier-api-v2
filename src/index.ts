import express from "express";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router";
import orderRouter from "./routes/order.router";
import userRouter from "./routes/user.router";
import paymentRouter from "./routes/payment.router";
import categoryRouter from "./routes/category.router";
import productRouter from "./routes/product.router";

declare global {
	namespace Express {
		interface Request {
			user?: any;
		}
	}
}

const app = express();
const port = process.env.PORT as string;
export const prisma = new PrismaClient();

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api/orders", orderRouter);
// ROLE: ADMIN except for GET PRODUCTS
app.use("/api/users", userRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);

app.listen(port, () => {
	console.log("Listening to port " + port);
});
