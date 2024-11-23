import { Request, Response } from "express";
import { prisma } from "../index";
import bcrypt from "bcrypt";

const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany();
		res.status(200).json(users);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const getUserById = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});
		res.status(200).json(user);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const createUser = async (req: Request, res: Response) => {
	try {
		const data = req.body;
		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds);
		const hashedPassword = bcrypt.hashSync(data.password, salt);

		const user = await prisma.user.create({
			data: {
				username: data.username,
				password: hashedPassword,
				email: data.email,
				role: data.role,
			},
		});
		res.status(201).json(user);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const updateUser = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const data = req.body;
		const updateUser = await prisma.user.update({
			where: {
				id: id,
			},
			data: {
				username: data.username,
				password: data.password,
				email: data.email,
				role: data.role,
			},
		});
		res.status(200).json(updateUser);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const deleteUser = await prisma.user.delete({
			where: {
				id: id,
			},
		});
		res.status(200).json(deleteUser);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
