const roleMiddleware = (req: any, res: any, next: any) => {
	if (req.user.role === "admin") {
		next();
	} else {
		res.status(403).json({ message: "Unauthorized: Not an admin" });
	}
};

export default roleMiddleware;
