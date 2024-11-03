import express from "express";
const app = express();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

app.get("/api/users", async (req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.status(200).json(users);
	} catch (e) {
		res.status(500);
	}
});

app.get("/api/users/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});
		res.status(200).json(user);
	} catch (e) {
		res.status(500);
	}
});

app.post("/api/users", async (req, res) => {
	try {
		const data = req.body();
		const user = await prisma.user.create({
			data: {
				username: data.username,
				password: data.password,
				email: data.email,
				role: data.role,
			},
		});
		res.status(201).json(user);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

app.listen("3000", () => {
	console.log("Listening to port 3000");
});
