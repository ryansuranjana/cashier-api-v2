import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import authService from "../services/auth.service";

const secretKey = process.env.SECRET_KEY as string;

const loginUser = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;

		const getUserData = await authService.getUserData(username);

		if (!getUserData || !(await bcrypt.compare(password, getUserData.password))) {
			res.status(401).json({ message: "Invalid credentials!" });
		}

		const accessToken = jwt.sign({ username: username, role: getUserData?.role }, secretKey);
		const refreshToken = jwt.sign({ username: username, role: getUserData?.role }, secretKey);

		const updateUser = await authService.updateAccessToken(username, accessToken);

		res.status(200).cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" }).json(updateUser);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const refreshAccessToken = async (req: Request, res: Response) => {
	try {
		const refreshToken = req.cookies["refreshToken"];
		if (!refreshToken) {
			res.status(403).json({ message: "Unauthorized: No refresh token provided" });
		}

		const verifyRefreshToken = await authService.verifyRefreshToken(refreshToken);
		const accessToken = authService.generateAccessToken(verifyRefreshToken);

		res.status(200).json({ accessToken: accessToken });
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const logoutUser = async (req: Request, res: Response) => {
	try {
		const username = req.user.username;
		const updateUser = await authService.updateAccessToken(username, null);
		res.status(200).json(updateUser);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

export default { loginUser, refreshAccessToken, logoutUser };
