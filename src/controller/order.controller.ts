import { NextFunction, Request, Response } from "express";
import orderService from "../services/order.service";

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const order = await orderService.getOrders();
		res.status(200).json(order);
	} catch (e) {
		next(e);
	}
};

const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = parseInt(req.params.id);
		const order = await orderService.getOrderById(id);
		res.status(200).json(order);
	} catch (e) {
		next(e);
	}
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;

		const totalPaid = orderService.calculateTotalPaid(data.products);
		const order = await orderService.createOrder(data, totalPaid);

		res.status(201).json(order);
	} catch (e) {
		next(e);
	}
};

export default { getOrders, getOrderById, createOrder };
