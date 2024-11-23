import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY as string;

const authMiddleware = async (req: any, res: any, next: any) => {
	try {
		const authHeader = req.get("Authorization");
		const accessToken = authHeader?.split(" ")[1] as string;

		if (accessToken) {
			jwt.verify(accessToken, secretKey, (err, user: any) => {
				if (err) {
					res.status(403).json({ message: "Unauthorized: Invalid token" });
				}
				req.user = user;
				next();
			});
		} else {
			res.status(403).json({ message: "Unauthorized: No token provided" });
		}
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

export default authMiddleware;
