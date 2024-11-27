import { prisma } from "../index";

const getProducts = async () => {
	const products = await prisma.product.findMany();
	return products;
};

const getProductById = async (productId: number) => {
	const product = await prisma.product.findUnique({
		where: {
			id: productId,
		},
	});
	return product;
};

const createProduct = async (data: any) => {
	const product = await prisma.product.create({
		data: {
			name: data.name,
			categoryId: data.categoryId,
			price: data.price,
			stock: data.stock,
			sku: data.sku,
			image: data.image,
		},
	});
	return product;
};

const updateProduct = async (productId: number, data: any) => {
	const updatedProduct = await prisma.product.update({
		where: {
			id: productId,
		},
		data: {
			name: data.name,
			categoryId: data.categoryId,
			price: data.price,
			stock: data.stock,
			sku: data.sku,
			image: data.image,
		},
	});
	return updatedProduct;
};

const deleteProduct = async (productId: number) => {
	const deletedProduct = await prisma.product.delete({
		where: {
			id: productId,
		},
	});
	return deletedProduct;
};

export default { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
