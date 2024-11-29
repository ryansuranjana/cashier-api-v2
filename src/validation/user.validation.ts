import Joi from "joi";

const createUserSchema = Joi.object({
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(16).required(),
	role: Joi.string().valid("CASHIER", "ADMIN").required(),
});

const updateUserSchema = Joi.object({
	username: Joi.string(),
	email: Joi.string().email(),
	password: Joi.string().min(8).max(16),
	role: Joi.string().valid("CASHIER", "ADMIN").required(),
});

export default { createUserSchema, updateUserSchema };
