import { Prisma } from "@prisma/client";
import { db } from "../lib/db";

export const getItems = async () => {
	return await db.item.findMany();
};

export const getItem = async (id: number) => {
	return await db.item.findUnique({
		where: { id: Number(id) },
		include: {
			events: true,
		},
	});
};

export const trackItem = async (sku: string) => {
	return await db.item.findUnique({
		where: { sku: String(sku) },
		include: {
			events: true,
		},
	});
};

export const createItem = async (data: Prisma.ItemCreateInput) => {
	return await db.item.create({
		data,
	});
};

export const updateItem = async (id: number, data: Prisma.ItemUpdateInput) => {
	return await db.item.update({
		where: { id: Number(id) },
		data,
	});
};

export const deleteItem = async (id: number) => {
	return await db.item.delete({
		where: { id: Number(id) },
	});
};
