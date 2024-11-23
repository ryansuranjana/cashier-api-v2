import { Request, Response } from "express";
import { prisma } from "../index";

const getProducts = async (req: Request, res: Response) => {
	try {
		const product = await prisma.product.findMany();
		res.status(200).json(product);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const getProductById = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const product = await prisma.product.findUnique({
			where: {
				id: id,
			},
		});
		res.status(200).json(product);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const createProduct = async (req: Request, res: Response) => {
	try {
		const data = req.body;
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
		res.status(201).json(product);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const updateProduct = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const data = req.body;
		const updateProduct = await prisma.product.update({
			where: {
				id: id,
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
		res.status(200).json(updateProduct);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const deleteProduct = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const deleteProduct = await prisma.product.delete({
			where: {
				id: id,
			},
		});
		res.status(200).json(deleteProduct);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
