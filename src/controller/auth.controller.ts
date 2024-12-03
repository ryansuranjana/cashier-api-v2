import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import authService from "../services/auth.service";

const secretKey = process.env.SECRET_KEY as string;

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;
		const getUserData = await authService.getUserData(data);

		const accessToken = authService.generateAccessToken(getUserData);
		const refreshToken = authService.generateRefreshToken(getUserData);

		const updatedUser = await authService.updateAccessToken(data.email, accessToken);

		res.status(200).cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" }).json(updatedUser);
	} catch (e) {
		next(e);
	}
};

const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const refreshToken = req.cookies["refreshToken"];
		const verifyRefreshToken = await authService.verifyRefreshToken(refreshToken);
		const accessToken = authService.generateAccessToken(verifyRefreshToken);

		res.status(200).json({ accessToken: accessToken });
	} catch (e) {
		next(e);
	}
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const email = req.user.email;
		const updatedUser = await authService.updateAccessToken(email, null);
		res.status(200).json(updatedUser);
	} catch (e) {
		next(e);
	}
};

export default { loginUser, refreshAccessToken, logoutUser };
