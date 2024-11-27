import { prisma } from "../index";

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
	const payment = await prisma.payment.create({
		data: {
			name: data.name,
			type: data.type,
			logo: data.logo,
		},
	});
	return payment;
};

const updatePayment = async (paymentId: number, data: any) => {
	const updatedPayment = await prisma.payment.update({
		where: {
			id: paymentId,
		},
		data: {
			name: data.name,
			type: data.type,
			logo: data.logo,
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
