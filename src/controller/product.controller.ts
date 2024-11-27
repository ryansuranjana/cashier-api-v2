import { Request, Response } from "express";
import productService from "../services/product.service";

const getProducts = async (req: Request, res: Response) => {
	try {
		const product = await productService.getProducts();
		res.status(200).json(product);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const getProductById = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const product = await productService.getProductById(id);
		res.status(200).json(product);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const createProduct = async (req: Request, res: Response) => {
	try {
		const data = req.body;
		const product = await productService.createProduct(data);
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
		const updateProduct = await productService.updateProduct(id, data);
		res.status(200).json(updateProduct);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const deleteProduct = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const deleteProduct = await productService.deleteProduct(id);
		res.status(200).json(deleteProduct);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

export default { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
