import { Request, Response } from "express";
import { prisma } from "../index";

const getOrders = async (req: Request, res: Response) => {
	try {
		const order = await prisma.order.findMany();
		res.status(200).json(order);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const getOrderById = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const order = await prisma.order.findUnique({
			where: {
				id: id,
			},
		});
		res.status(200).json(order);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const createOrder = async (req: Request, res: Response) => {
	try {
		const data = req.body;

		const productData = data.products.map((product: any) => {
			return { productId: product.productId, quantity: product.quantity, totalPaid: product.totalPaid };
		});

		const totalPaidReduced: number = productData.reduce((a: number, b: any) => {
			return a + b.totalPaid;
		}, 0);

		const order = await prisma.order.create({
			data: {
				paymentId: data.paymentId,
				totalPaid: totalPaidReduced,
				orderProducts: {
					createMany: {
						data: data.products,
					},
				},
			},
			include: {
				orderProducts: true,
			},
		});

		res.status(201).json(order);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

export { getOrders, getOrderById, createOrder };
