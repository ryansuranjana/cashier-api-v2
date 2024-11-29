import { prisma } from "../index";
import { generateHashedPassword } from "../helper";
import { validate } from "../validation/validation";
import userValidation from "../validation/user.validation";
import { ResponseError } from "../error/response.error";

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
	const validatedData = validate(userValidation.createUserSchema, data);

	const userExists = await prisma.user.findFirst({
		where: {
			email: validatedData.email,
		},
	});

	if (userExists) {
		throw new ResponseError(400, "User already exists");
	}

	const hashedPassword = generateHashedPassword(validatedData.password);
	const user = await prisma.user.create({
		data: {
			username: validatedData.username,
			password: hashedPassword,
			email: validatedData.email,
			role: validatedData.role,
		},
	});
	return user;
};

const updateUser = async (userId: number, data: any) => {
	const validatedData = validate(userValidation.createUserSchema, data);

	const userExists = await prisma.user.findFirst({
		where: {
			email: validatedData.email,
		},
	});

	if (userExists) {
		throw new ResponseError(400, "User already exists");
	}

	const hashedPassword = generateHashedPassword(validatedData.password);
	const updatedUser = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			username: validatedData.username,
			password: hashedPassword,
			email: validatedData.email,
			role: validatedData.role,
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
