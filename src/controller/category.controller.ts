import { Request, Response } from "express";
import { prisma } from "../index";

const getCategories = async (req: Request, res: Response) => {
	try {
		const category = await prisma.category.findMany();
		res.status(200).json(category);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const getCategoryById = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const category = await prisma.category.findUnique({
			where: {
				id: id,
			},
		});
		res.status(200).json(category);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const createCategory = async (req: Request, res: Response) => {
	try {
		const data = req.body;
		const category = await prisma.category.create({
			data: {
				name: data.name,
			},
		});
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
		const updateCategory = await prisma.category.update({
			where: {
				id: id,
			},
			data: {
				name: data.name,
			},
		});
		res.status(200).json(updateCategory);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const deleteCategory = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const deleteCategory = await prisma.category.delete({
			where: {
				id: id,
			},
		});
		res.status(200).json(deleteCategory);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

export { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
