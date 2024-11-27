import { prisma } from "../index";

const getOrders = async () => {
	const orders = await prisma.order.findMany();
	return orders;
};

const getOrderById = async (id: number) => {
	const order = await prisma.order.findUnique({
		where: {
			id: id,
		},
	});
	return order;
};

const calculateTotalPaid = (products: any) => {
	const productData = products.map((product: any) => {
		return { productId: product.productId, quantity: product.quantity, totalPaid: product.totalPaid };
	});

	const totalPaidReduced: number = productData.reduce((a: number, b: any) => {
		return a + b.totalPaid;
	}, 0);

	return totalPaidReduced;
};

const createOrder = async (data: any, totalPaidReduced: number) => {
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

	return order;
};

export default {
	getOrders,
	getOrderById,
	calculateTotalPaid,
	createOrder,
};
