import { prisma } from "../index";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ResponseError } from "../error/response.error";
import { validate } from "../validation/validation";
import authValidation from "../validation/auth.validation";

const secretKey = process.env.SECRET_KEY as string;

const getUserData = async (data: any) => {
	const validatedData = validate(authValidation.getUserDataSchema, data);
	const userData = await prisma.user.findUnique({
		where: {
			email: validatedData.email,
		},
	});

	if (!userData || !(await bcrypt.compare(validatedData.password, userData.password))) {
		throw new ResponseError(401, "Unauthorized: Invalid credentials!");
	}

	return userData;
};

const verifyRefreshToken = (refreshToken: string): Promise<any> =>
	new Promise((resolve, reject) => {
		if (!refreshToken) {
			return reject(new ResponseError(401, "Unauthorized: No refresh token provided"));
		}

		jwt.verify(refreshToken, secretKey, (err: any, decoded: any) => {
			if (err) return reject(new ResponseError(401, "Unauthorized: Invalid token"));
			resolve(decoded);
		});
	});

const generateAccessToken = (user: any): string => jwt.sign({ email: user.email, role: user.role }, secretKey, { expiresIn: "15m" });

const generateRefreshToken = (user: any): string => jwt.sign({ email: user.email, role: user.role }, secretKey, { expiresIn: "17d" });

const updateAccessToken = async (email: string, accessToken: string | null) => {
	const validatedData = validate(authValidation.updateUserDataSchema, email);
	const updatedUser = await prisma.user.update({
		where: { email: validatedData.email },
		data: { token: accessToken },
	});
	return updatedUser;
};

export default { getUserData, verifyRefreshToken, generateAccessToken, generateRefreshToken, updateAccessToken };
