import Joi from "joi";

const createProductSchema = Joi.object({
	name: Joi.string().required(),
	categoryId: Joi.number().required(),
	price: Joi.number().required(),
	stock: Joi.number().required(),
	sku: Joi.string().required(),
	image: Joi.string().required(),
});

const updateProductSchema = Joi.object({
	name: Joi.string().required(),
	categoryId: Joi.number().required(),
	price: Joi.number().required(),
	stock: Joi.number().required(),
	sku: Joi.string().required(),
	image: Joi.string(),
});

export default {
	createProductSchema,
	updateProductSchema,
};
