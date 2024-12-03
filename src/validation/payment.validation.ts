import Joi from "joi";

const createPaymentSchema = Joi.object({
	name: Joi.string().required(),
	type: Joi.string().required(),
	logo: Joi.string().required(),
});

const updatePaymentSchema = Joi.object({
	name: Joi.string().required(),
	type: Joi.string().required(),
	logo: Joi.string(),
});

export default { createPaymentSchema, updatePaymentSchema };
