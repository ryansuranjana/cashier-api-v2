import { Request, Response } from "express";
import paymentService from "../services/payment.service";

const getPayments = async (req: Request, res: Response) => {
	try {
		const payment = await paymentService.getPayments();
		res.status(200).json(payment);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const getPaymentById = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const payment = await paymentService.getPaymentById(id);
		res.status(200).json(payment);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const createPayment = async (req: Request, res: Response) => {
	try {
		const data = req.body;
		const payment = await paymentService.createPayment(data);
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
		const updatePayment = await paymentService.updatePayment(id, data);
		res.status(200).json(updatePayment);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const deletePayment = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const deletePayment = await paymentService.deletePayment(id);
		res.status(200).json(deletePayment);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

export default { getPayments, getPaymentById, createPayment, updatePayment, deletePayment };
