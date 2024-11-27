import { prisma } from "../index";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY as string;

const getUserData = async (username: string) => {
	const user = await prisma.user.findUnique({
		where: {
			username: username,
		},
	});
	return user;
};

const verifyRefreshToken = (refreshToken: string): Promise<any> =>
	new Promise((resolve, reject) => {
		jwt.verify(refreshToken, secretKey, (err: any, decoded: any) => {
			if (err) return reject(new Error("Unauthorized: Invalid token"));
			resolve(decoded);
		});
	});

const generateAccessToken = (user: any): string => jwt.sign({ username: user.username, role: user.role }, secretKey);

const updateAccessToken = async (username: string, accessToken: string | null) => {
	const updatedUser = await prisma.user.update({
		where: { username: username },
		data: { token: accessToken },
	});
	return updatedUser;
};

export default { getUserData, verifyRefreshToken, generateAccessToken, updateAccessToken };
