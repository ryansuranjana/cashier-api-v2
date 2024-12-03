import Joi from "joi";

const createCategorySchema = {
	name: Joi.string().required(),
};

const updateCategorySchema = {
	name: Joi.string().required(),
};

export default { createCategorySchema, updateCategorySchema };
