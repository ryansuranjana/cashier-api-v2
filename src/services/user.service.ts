import { prisma } from "../index";
import { generateHashedPassword } from "../helper";

const getUsers = async () => {
	const users = await prisma.user.findMany();
	return users;
};

const getUserById = async (userId: number) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});
	return user;
};

const createUser = async (data: any) => {
	const hashedPassword = generateHashedPassword(data.password);
	const user = await prisma.user.create({
		data: {
			username: data.username,
			password: hashedPassword,
			email: data.email,
			role: data.role,
		},
	});
	return user;
};

const updateUser = async (userId: number, data: any) => {
	const updatedUser = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			username: data.username,
			password: data.password,
			email: data.email,
			role: data.role,
		},
	});
	return updatedUser;
};

const deleteUser = async (userId: number) => {
	const deletedUser = await prisma.user.delete({
		where: {
			id: userId,
		},
	});
	return deletedUser;
};

export default { getUsers, getUserById, createUser, updateUser, deleteUser };
