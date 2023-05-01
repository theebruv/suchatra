import { EventStatus } from "../constants";
import axiosInstance from "./axiosInstance";

type EventCreateInput = {
	notes: string;
	timestamp?: Date | string;
	location?: string | null;
	custodian?: string | null;
	status: EventStatus;
};

export const getEvents = async () => {
	return await axiosInstance.get(`/events`);
};

export const getEvent = async (id: number) => {
	return await axiosInstance.get(`/events/${id}`);
};

export const createEvent = async (payload: EventCreateInput) => {
	return await axiosInstance.post(`/events`, payload);
};

export const updateEvent = async (id: number, event: EventCreateInput) => {
	return await axiosInstance.put(`/events/${id}`, event);
};

export const deleteEvent = async (id: number) => {
	return await axiosInstance.delete(`/events/${id}`);
};
