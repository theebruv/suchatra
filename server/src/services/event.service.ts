import { Prisma } from "@prisma/client";
import { db } from "../lib/db";

export const getEvents = async () => {
	return await db.event.findMany();
};

export const getEvent = async (id: number) => {
	return await db.event.findUnique({
		where: { id: Number(id) },
	});
};

export const deleteEvent = async (id: number) => {
	return await db.event.delete({
		where: { id: Number(id) },
	});
};

export const createEvent = async (data: Prisma.EventCreateInput) => {
	return await db.event.create({
		data,
	});
};

export const updateEvent = async (id: number, data: Prisma.EventUpdateInput) => {
	return await db.event.update({
		where: { id: Number(id) },
		data,
	});
};
