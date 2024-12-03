import Joi from "joi";

const getUserDataSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(16).required(),
});

const updateUserDataSchema = Joi.object({
	email: Joi.string().email().required(),
});

export default { getUserDataSchema, updateUserDataSchema };
