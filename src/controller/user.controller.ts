import { Request, Response } from "express";
import userService from "../services/user.service";

const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await userService.getUsers();
		res.status(200).json(users);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const getUserById = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const user = await userService.getUserById(id);
		res.status(200).json(user);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const createUser = async (req: Request, res: Response) => {
	try {
		const data = req.body;
		const user = await userService.createUser(data);

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
		const updateUser = await userService.updateUser(id, data);
		res.status(200).json(updateUser);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const deleteUser = await userService.deleteUser(id);
		res.status(200).json(deleteUser);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

export default { getUsers, getUserById, createUser, updateUser, deleteUser };
