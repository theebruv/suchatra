import { EventController } from "./../controllers/events.controller";
import express from "express";

const router = express.Router();

router.get("/", async (_, res) => {
	const controller = new EventController();
	const events = await controller.getEvents();

	res.json(events);
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;

	const controller = new EventController();
	const event = await controller.getEvent(Number(id));

	res.json(event);
});

router.post("/", async (req, res) => {
	const { notes, location, custodian, status, itemId } = req.body;

	const controller = new EventController();
	const event = await controller.createEvent({
		status,
		notes,
		custodian,
		location,
		itemId
	});

	res.json(event);
});

router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { notes, location, custodian, status } = req.body;
	const controller = new EventController();

	const event = await controller.updateEvent(Number(id), {
		status,
		notes,
		custodian,
		location,
	});

	res.json(event);
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	const controller = new EventController();
	await controller.deleteEvent(Number(id));

	res.json({ message: "Event deleted" });
});

export default router;
