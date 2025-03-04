import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response.error";

const errorMiddleware = async (err: any, req: Request, res: Response, next: NextFunction) => {
	if (!err) {
		next();
		return;
	}

	if (err instanceof ResponseError) {
		res
			.status(err.status)
			.json({
				errors: err.message,
			})
			.end();
	} else {
		res
			.status(500)
			.json({
				errors: err.message,
			})
			.end();
	}
};

export default errorMiddleware;
