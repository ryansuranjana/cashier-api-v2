import { prisma } from "../index";
import { validate } from "../validation/validation";
import productValidation from "../validation/product.validation";
import { ResponseError } from "../error/response.error";

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
	const validatedData = validate(productValidation.createProductSchema, data);

	const productExists = await prisma.product.findFirst({
		where: {
			name: validatedData.name,
		},
	});

	if (productExists) {
		throw new ResponseError(400, "Product already exists");
	}

	const product = await prisma.product.create({
		data: {
			name: validatedData.name,
			categoryId: validatedData.categoryId,
			price: validatedData.price,
			stock: validatedData.stock,
			sku: validatedData.sku,
			image: validatedData.image,
		},
	});
	return product;
};

const updateProduct = async (productId: number, data: any) => {
	const validatedData = validate(productValidation.updateProductSchema, data);

	const productExists = await prisma.product.findFirst({
		where: {
			name: validatedData.name,
		},
	});

	if (productExists) {
		throw new ResponseError(400, "Product already exists");
	}

	const updatedProduct = await prisma.product.update({
		where: {
			id: productId,
		},
		data: {
			name: validatedData.name,
			categoryId: validatedData.categoryId,
			price: validatedData.price,
			stock: validatedData.stock,
			sku: validatedData.sku,
			image: validatedData.image,
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
