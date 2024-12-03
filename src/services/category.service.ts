import { ResponseError } from "../error/response.error";
import { prisma } from "../index";
import { validate } from "../validation/validation";
import categoryValidation from "../validation/category.validation";

const getCategories = async () => {
	const categories = await prisma.category.findMany();
	return categories;
};

const getCategoryById = async (categoryId: number) => {
	const category = await prisma.category.findUnique({
		where: {
			id: categoryId,
		},
	});
	return category;
};

const createCategory = async (data: any) => {
	const validatedData = validate(categoryValidation.createCategorySchema, data);
	const categoryExists = await prisma.category.findFirst({
		where: {
			name: validatedData.name,
		},
	});

	if (categoryExists) {
		throw new ResponseError(400, "Category already exists");
	}

	const category = await prisma.category.create({
		data: {
			name: validatedData.name,
		},
	});

	return category;
};

const updateCategory = async (categoryId: number, data: any) => {
	const validatedData = validate(categoryValidation.updateCategorySchema, data);
	const categoryExists = await prisma.category.findFirst({
		where: {
			name: validatedData.name,
		},
	});

	if (categoryExists) {
		throw new ResponseError(400, "Category already exists");
	}

	const updatedCategory = await prisma.category.update({
		where: {
			id: categoryId,
		},
		data: {
			name: validatedData.name,
		},
	});
	return updatedCategory;
};

const deleteCategory = async (categoryId: number) => {
	const deletedCategory = await prisma.category.delete({
		where: {
			id: categoryId,
		},
	});
	return deletedCategory;
};

export default { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
