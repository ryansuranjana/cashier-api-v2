import { prisma } from "../index";

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
	const category = await prisma.category.create({
		data: {
			name: data.name,
		},
	});
	return category;
};

const updateCategory = async (categoryId: number, data: any) => {
	const updatedCategory = await prisma.category.update({
		where: {
			id: categoryId,
		},
		data: {
			name: data.name,
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
