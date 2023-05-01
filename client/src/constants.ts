export const configs = {
	BACKEND_BASE_URL: import.meta.env.VITE_BACKEND_BASE_URL,
};
export enum EventStatus {
	CREATED = "CREATED",
	IN_TRANSIT = "IN_TRANSIT",
	DELIVERED = "DELIVERED",
	RETURNED = "RETURNED",
	DAMAGED = "DAMAGED",
	LOST = "LOST",
}

export const eventStatuses = [
	{ value: EventStatus.CREATED, label: "Created" },
	{ value: EventStatus.IN_TRANSIT, label: "In Transit" },
	{ value: EventStatus.DELIVERED, label: "Delivered" },
	{ value: EventStatus.RETURNED, label: "Returned" },
	{ value: EventStatus.DAMAGED, label: "Damaged" },
	{ value: EventStatus.LOST, label: "Lost" },
];
