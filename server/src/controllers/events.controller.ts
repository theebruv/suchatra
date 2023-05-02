import { Get, Post, Put, Delete, Route, Path, Body } from "tsoa";
import { getEvents, getEvent, createEvent, updateEvent, deleteEvent } from "../services/event.service";
import { Prisma } from "@prisma/client";

@Route("/api/v1/events")
export class EventController {
	@Get("/")
	public async getEvents(): Promise<any[]> {
		return await getEvents();
	}

	@Get("/:id")
	public async getEvent(@Path() id: number): Promise<any> {
		return await getEvent(id);
	}

	@Post("/")
	public async createEvent(@Body() body: Prisma.EventCreateInput & { itemId: number }): Promise<any> {
		const { notes, location, custodian, status, itemId } = body;

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

		return event;
	}

	@Put("/:id")
	public async updateEvent(@Path() id: number, @Body() body: Prisma.EventUpdateInput): Promise<any> {
		const { notes, location, custodian, status } = body;

		const event = await updateEvent(id, {
			status,
			notes,
			custodian,
			location,
		});

		return event;
	}

	@Delete("/:id")
	public async deleteEvent(@Path() id: number): Promise<any> {
		await deleteEvent(id);

		return { message: "Event deleted" };
	}
}
