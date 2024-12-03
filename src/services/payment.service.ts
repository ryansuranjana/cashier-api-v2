import { ResponseError } from "../error/response.error";
import { prisma } from "../index";
import paymentValidation from "../validation/payment.validation";
import { validate } from "../validation/validation";

const getPayments = async () => {
	const payments = await prisma.payment.findMany();
	return payments;
};

const getPaymentById = async (paymentId: number) => {
	const payment = await prisma.payment.findUnique({
		where: {
			id: paymentId,
		},
	});
	return payment;
};

const createPayment = async (data: any) => {
	const validatedData = validate(paymentValidation.createPaymentSchema, data);

	const paymentExists = await prisma.payment.findFirst({
		where: {
			name: validatedData.name,
		},
	});

	if (paymentExists) {
		throw new ResponseError(400, "Payment already exists");
	}

	const payment = await prisma.payment.create({
		data: {
			name: validatedData.name,
			type: validatedData.type,
			logo: validatedData.logo,
		},
	});
	return payment;
};

const updatePayment = async (paymentId: number, data: any) => {
	const validatedData = validate(paymentValidation.updatePaymentSchema, data);

	const paymentExists = await prisma.payment.findFirst({
		where: {
			name: validatedData.name,
		},
	});

	if (paymentExists) {
		throw new ResponseError(400, "Payment already exists");
	}

	const updatedPayment = await prisma.payment.update({
		where: {
			id: paymentId,
		},
		data: {
			name: validatedData.name,
			type: validatedData.type,
			logo: validatedData.logo,
		},
	});
	return updatedPayment;
};

const deletePayment = async (paymentId: number) => {
	const deletedPayment = await prisma.payment.delete({
		where: {
			id: paymentId,
		},
	});
	return deletedPayment;
};

export default { getPayments, getPaymentById, createPayment, updatePayment, deletePayment };
