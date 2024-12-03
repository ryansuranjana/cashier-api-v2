import Joi from "joi";

const productSchema = Joi.object({
	productId: Joi.number().integer().positive().required(),
	quantity: Joi.number().integer().positive().required(),
	totalPaid: Joi.number().positive().required(),
});

const productsSchema = Joi.array().items(productSchema).min(1).required();

const orderSchema = {
	paymentId: Joi.string().required(),
	products: productsSchema,
};

export default {
	productsSchema,
	orderSchema,
};
