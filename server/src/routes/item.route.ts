import express from "express";
import { createEvent } from "../services/event.service";
import { getItems, getItem, trackItem, createItem, updateItem, deleteItem } from "../services/item.service";

const router = express.Router();

router.get("/", async (_, res) => {
	const items = await getItems();

	res.json(items);
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;

	const item = await getItem(Number(id));

	res.json(item);
});

router.get("/track/:sku", async (req, res) => {
	const { sku } = req.params;

	const item = await trackItem(sku);

	res.json(item);
});

router.post("/", async (req, res) => {
	const { name, description, price, color } = req.body;

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

	res.json(item);
});

router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { name, description, price, color } = req.body;

	const item = await updateItem(Number(id), {
		name,
		description,
		price: Number(price),
		color,
	});

	return res.json(item);
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	await deleteItem(Number(id));

	res.json({ message: "Item deleted" });
});

export default router;