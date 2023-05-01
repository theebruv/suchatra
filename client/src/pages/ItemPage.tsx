import { Box, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItem } from "../apis/itemsService";
import { Item, TItem } from "../components/Items/Item";

export const ItemPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const toast = useToast();

	const [supplyItem, setSupplyItem] = useState<TItem | null>(null);

	const fetchItem = async (id: number) => {
		if (id) {
			const { status, data } = await getItem(id);
			if (status === 200) {
				setSupplyItem(data);
			} else {
				toast({
					title: "Request Failed",
					description: "There was an error fetcheing the item. Please try again.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			}
		} else {
			navigate("/");
		}
	};

	useEffect(() => {
		fetchItem(Number(id));
	}, [id]);

	return <Box width='100%'>{supplyItem && <Item supplyItem={supplyItem} fetchItem={fetchItem} />}</Box>;
};
