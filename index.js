const mysql = require("mysql");
const express = require("express");
const app = express();

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "cashier_api_v2",
});

connection.connect((err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log("Connected to MySQL Server!");
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
