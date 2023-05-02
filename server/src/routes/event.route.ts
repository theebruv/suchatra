import express from "express";

import { getEvents, getEvent, createEvent, updateEvent, deleteEvent } from "../services/event.service";

const router = express.Router();

router.get("/", async (_, res) => {
	const events = await getEvents();

	res.json(events);
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;

	const event = await getEvent(Number(id));

	res.json(event);
});

router.post("/", async (req, res) => {
	const { notes, location, custodian, status, itemId } = req.body;

	const event = await createEvent({
		status,
		notes,
		custodian,
		location,
		item: {
			connect: {
				id: itemId,
			},
		},
	});

	res.json(event);
});

router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { notes, location, custodian, status } = req.body;

	const event = await updateEvent(Number(id), {
		status,
		notes,
		custodian,
		location,
	});

	res.json(event);
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	await deleteEvent(Number(id));

	res.json({ message: "Event deleted" });
});


export default router;
