import { Request, Response } from "express";
import orderService from "../services/order.service";

const getOrders = async (req: Request, res: Response) => {
	try {
		const order = await orderService.getOrders();
		res.status(200).json(order);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const getOrderById = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const order = await orderService.getOrderById(id);
		res.status(200).json(order);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const createOrder = async (req: Request, res: Response) => {
	try {
		const data = req.body;

		const totalPaid = orderService.calculateTotalPaid(data.products);
		const order = await orderService.createOrder(data, totalPaid);

		res.status(201).json(order);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

export default { getOrders, getOrderById, createOrder };
