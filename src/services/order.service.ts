import { prisma } from "../index";
import { validate } from "../validation/validation";
import orderValidation from "../validation/order.validation";

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
	const validatedData = validate(orderValidation.productsSchema, products);
	const productData = validatedData.map((product: any) => {
		return { productId: product.productId, quantity: product.quantity, totalPaid: product.totalPaid };
	});

	const totalPaidReduced: number = productData.reduce((a: number, b: any) => {
		return a + b.totalPaid;
	}, 0);

	return totalPaidReduced;
};

const createOrder = async (data: any, totalPaidReduced: number) => {
	const validatedData = validate(orderValidation.orderSchema, data);
	const order = await prisma.order.create({
		data: {
			paymentId: validatedData.paymentId,
			totalPaid: totalPaidReduced,
			orderProducts: {
				createMany: {
					data: validatedData.products,
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
