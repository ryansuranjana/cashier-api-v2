import { Request, Response } from "express";
import categoryService from "../services/category.service";

const getCategories = async (req: Request, res: Response) => {
	try {
		const category = await categoryService.getCategories();
		res.status(200).json(category);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const getCategoryById = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const category = await categoryService.getCategoryById(id);
		res.status(200).json(category);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const createCategory = async (req: Request, res: Response) => {
	try {
		const data = req.body;
		const category = await categoryService.createCategory(data);
		res.status(201).json(category);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const updateCategory = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const data = req.body;
		const updatedCategory = await categoryService.updateCategory(id, data);
		res.status(200).json(updatedCategory);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const deleteCategory = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const deletedCategory = await categoryService.deleteCategory(id);
		res.status(200).json(deletedCategory);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

export default { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
