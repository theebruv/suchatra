import axiosInstance from "./axiosInstance";

type CreateItemInput = {
	name: string;
	sku?: string;
	description?: string | null;
	price: number;
	color?: string | null;
	
};
export const getItems = async () => {
	return await axiosInstance.get(`/items`);
};

export const getItem = async (id: number) => {
	return await axiosInstance.get(`/items/${id}`);
};

export const createItem = async (item: CreateItemInput) => {
	return await axiosInstance.post(`/items`, item);
};

export const updateItem = async (id: number, item: CreateItemInput) => {
	return await axiosInstance.put(`/items/${id}`, item);
};

export const deleteItem = async (id: number) => {
	return await axiosInstance.delete(`/items/${id}`);
};

export const trackItem = async (sku: string) => {
	return await axiosInstance.get(`/items/track/${sku}`);
};
