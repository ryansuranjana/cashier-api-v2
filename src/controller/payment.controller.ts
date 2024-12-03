import { NextFunction, Request, Response } from "express";
import paymentService from "../services/payment.service";

const getPayments = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const payment = await paymentService.getPayments();
		res.status(200).json(payment);
	} catch (e) {
		next(e);
	}
};

const getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = parseInt(req.params.id);
		const payment = await paymentService.getPaymentById(id);
		res.status(200).json(payment);
	} catch (e) {
		next(e);
	}
};

const createPayment = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;
		const payment = await paymentService.createPayment(data);
		res.status(201).json(payment);
	} catch (e) {
		next(e);
	}
};

const updatePayment = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = parseInt(req.params.id);
		const data = req.body;
		const updatePayment = await paymentService.updatePayment(id, data);
		res.status(200).json(updatePayment);
	} catch (e) {
		next(e);
	}
};

const deletePayment = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = parseInt(req.params.id);
		const deletePayment = await paymentService.deletePayment(id);
		res.status(200).json(deletePayment);
	} catch (e) {
		next(e);
	}
};

export default { getPayments, getPaymentById, createPayment, updatePayment, deletePayment };
