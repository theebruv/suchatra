import { Get, Post, Put, Delete, Route, Path, Body } from "tsoa";
import { getItems, getItem, trackItem, createItem, updateItem, deleteItem } from "../services/item.service";
import { createEvent } from "../services/event.service";
import { Prisma } from "@prisma/client";

@Route("/api/v1/items")
export class ItemController {
	@Get("/")
	public async getItems(): Promise<any[]> {
		return await getItems();
	}

	@Get("/:id")
	public async getItem(@Path() id: number): Promise<any> {
		return await getItem(id);
	}

	@Get("/track/:sku")
	public async trackItem(@Path() sku: string): Promise<any> {
		return await trackItem(sku);
	}

	@Post("/")
	public async createItem(@Body() body: Prisma.ItemCreateInput): Promise<any> {
		const { name, description, price, color } = body;

		const item = await createItem({
			name,
			description,
			price: Number(price),
			sku: Math.random().toString(36).substring(2, 8).toLocaleUpperCase(),
			color,
		});

		await createEvent({
			status: "CREATED",
			notes: `Item ${item.name} was created`,
			item: {
				connect: {
					id: item.id,
				},
			},
		});

		return item;
	}

	@Put("/:id")
	public async updateItem(@Path() id: number, @Body() body: Prisma.ItemUpdateInput): Promise<any> {
		const { name, description, price, color } = body;

		const item = await updateItem(id, {
			name,
			description,
			price: Number(price),
			color,
		});

		return item;
	}

	@Delete("/:id")
	public async deleteItem(@Path() id: number): Promise<any> {
		await deleteItem(id);

		return { message: "Item deleted" };
	}
}
