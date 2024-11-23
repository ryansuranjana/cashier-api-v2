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

app.use(authRouter);
app.use(orderRouter);
// ROLE: ADMIN except for GET PRODUCTS
app.use(userRouter);
app.use(paymentRouter);
app.use(categoryRouter);
app.use(productRouter);

app.listen(port, () => {
	console.log("Listening to port " + port);
});
