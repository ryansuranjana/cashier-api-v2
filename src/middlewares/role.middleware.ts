const roleMiddleware = (req: any, res: any, next: any) => {
	if (req.user && req.user.role === "ADMIN") {
		next();
	} else {
		res.status(403).json({ message: "Unauthorized: Not an admin" });
	}
};

export default roleMiddleware;
