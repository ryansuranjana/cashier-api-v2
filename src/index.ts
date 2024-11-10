import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const prisma = new PrismaClient();
const secretKey = process.env.SECRET_KEY;

app.use(express.json());

// LOGIN
app.post("/api/login", async (req, res) => {
	try {
		const { username, password } = req.body;

		// fetch user data from db
		const getUserData = await prisma.user.findUnique({
			where: {
				username: username,
			},
		});

		// check if user data exists and compare passwords
		if (!getUserData || !(await bcrypt.compare(password, getUserData.password))) {
			res.status(401).json({ message: "Invalid credentials!" });
		}

		let token;
		if (secretKey) {
			token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
		}

		// update user token
		const updateUser = await prisma.user.update({
			where: { username: username },
			data: { token: token },
		});

		res.status(200).json(updateUser);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

//LOGOUT
app.post("/api/logout", async (req, res) => {
	try {
		const { username } = req.body;
		const updateUser = await prisma.user.update({
			where: { username: username },
			data: { token: null },
		});
		res.status(200).json(updateUser);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

// USER
app.get("/api/users", async (req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.status(200).json(users);
	} catch (e) {
		console.log(e);
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
		console.log(e);
		res.status(500);
	}
});

app.post("/api/users", async (req, res) => {
	try {
		const data = req.body;
		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds);
		const hashedPassword = bcrypt.hashSync(data.password, salt);

		const user = await prisma.user.create({
			data: {
				username: data.username,
				password: hashedPassword,
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

app.put("/api/users/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const data = req.body;
		const updateUser = await prisma.user.update({
			where: {
				id: id,
			},
			data: {
				username: data.username,
				password: data.password,
				email: data.email,
				role: data.role,
			},
		});
		res.status(200).json(updateUser);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

app.delete("/api/users/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const deleteUser = await prisma.user.delete({
			where: {
				id: id,
			},
		});
		res.status(200).json(deleteUser);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

// PAYMENT
app.get("/api/payments", async (req, res) => {
	try {
		const payment = await prisma.payment.findMany();
		res.status(200).json(payment);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

app.get("/api/payments/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const payment = await prisma.payment.findUnique({
			where: {
				id: id,
			},
		});
		res.status(200).json(payment);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

app.post("/api/payments", async (req, res) => {
	try {
		const data = req.body;
		const payment = await prisma.payment.create({
			data: {
				name: data.name,
				type: data.type,
				logo: data.logo,
			},
		});
		res.status(201).json(payment);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

app.put("/api/payments/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const data = req.body;
		const updatePayment = await prisma.payment.update({
			where: {
				id: id,
			},
			data: {
				name: data.name,
				type: data.type,
				logo: data.logo,
			},
		});
		res.status(200).json(updatePayment);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

app.delete("/api/payments/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const deleteUser = await prisma.payment.delete({
			where: {
				id: id,
			},
		});
		res.status(200).json(deleteUser);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

// CATEGORY
app.get("/api/categories", async (req, res) => {
	try {
		const category = await prisma.category.findMany();
		res.status(200).json(category);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

app.get("/api/categories/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const category = await prisma.category.findUnique({
			where: {
				id: id,
			},
		});
		res.status(200).json(category);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

app.post("/api/categories", async (req, res) => {
	try {
		const data = req.body;
		const category = await prisma.category.create({
			data: {
				name: data.name,
			},
		});
		res.status(201).json(category);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

app.put("/api/categories/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const data = req.body;
		const updateCategory = await prisma.category.update({
			where: {
				id: id,
			},
			data: {
				name: data.name,
			},
		});
		res.status(200).json(updateCategory);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

app.delete("/api/categories/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const deleteCategory = await prisma.category.delete({
			where: {
				id: id,
			},
		});
		res.status(200).json(deleteCategory);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

//PRODUCT
app.get("/api/products", async (req, res) => {
	try {
		const product = await prisma.product.findMany();
		res.status(200).json(product);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

app.get("/api/products/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const product = await prisma.product.findUnique({
			where: {
				id: id,
			},
		});
		res.status(200).json(product);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

app.post("/api/products", async (req, res) => {
	try {
		const data = req.body;
		const product = await prisma.product.create({
			data: {
				name: data.name,
				categoryId: data.categoryId,
				price: data.price,
				stock: data.stock,
				sku: data.sku,
				image: data.image,
			},
		});
		res.status(201).json(product);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

app.put("/api/products/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const data = req.body;
		const updateProduct = await prisma.product.update({
			where: {
				id: id,
			},
			data: {
				name: data.name,
				categoryId: data.categoryId,
				price: data.price,
				stock: data.stock,
				sku: data.sku,
				image: data.image,
			},
		});
		res.status(200).json(updateProduct);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

app.delete("/api/products/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const deleteProduct = await prisma.product.delete({
			where: {
				id: id,
			},
		});
		res.status(200).json(deleteProduct);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

// ORDER
app.get("/api/orders", async (req, res) => {
	try {
		const order = await prisma.order.findMany();
		res.status(200).json(order);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

app.get("/api/orders/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const order = await prisma.order.findUnique({
			where: {
				id: id,
			},
		});
		res.status(200).json(order);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

app.post("/api/orders", async (req, res) => {
	try {
		const data = req.body;

		const productData = data.products.map((product: any) => {
			return { productId: product.productId, quantity: product.quantity, totalPaid: product.totalPaid };
		});

		const totalPaidReduced: number = productData.reduce((a: number, b: any) => {
			return a + b.totalPaid;
		}, 0);

		const order = await prisma.order.create({
			data: {
				paymentId: data.paymentId,
				totalPaid: totalPaidReduced,
				orderProducts: {
					createMany: {
						data: data.products,
					},
				},
			},
			include: {
				orderProducts: true,
			},
		});

		res.status(201).json(order);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

app.listen("3000", () => {
	console.log("Listening to port 3000");
});
