import { Request, Response } from "express";
import { prisma } from "../index";

const getPayments = async (req: Request, res: Response) => {
	try {
		const payment = await prisma.payment.findMany();
		res.status(200).json(payment);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const getPaymentById = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const payment = await prisma.payment.findUnique({
			where: {
				id: id,
			},
		});
		res.status(200).json(payment);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const createPayment = async (req: Request, res: Response) => {
	try {
		const data = req.body;
		const payment = await prisma.payment.create({
			data: {
				name: data.name,
				type: data.type,
				logo: data.logo,
			},
		});
		res.status(201).json(payment);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const updatePayment = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const data = req.body;
		const updatePayment = await prisma.payment.update({
			where: {
				id: id,
			},
			data: {
				name: data.name,
				type: data.type,
				logo: data.logo,
			},
		});
		res.status(200).json(updatePayment);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const deletePayment = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const deleteUser = await prisma.payment.delete({
			where: {
				id: id,
			},
		});
		res.status(200).json(deleteUser);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

export { getPayments, getPaymentById, createPayment, updatePayment, deletePayment };
