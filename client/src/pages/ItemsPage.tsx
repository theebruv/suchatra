import { Box, Button, Flex, Heading, Modal, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getItems } from "../apis/itemsService";

import { AddItem } from "../components/Items/AddItem";
import { TItem } from "../components/Items/Item";
import { Items } from "../components/Items/Items";
import { TrackItem } from "../components/Items/TrackItem";

export const ItemsPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [supplyItems, setSupplyItems] = useState<TItem[]>([]);

	const fetchItems = async () => {
		const { data } = await getItems();
		setSupplyItems(data);
	};

	useEffect(() => {
		fetchItems();
	}, []);

	return (
		<Box width='100%'>
			<TrackItem />

			<Flex justifyContent='space-between' alignItems='center' mb={4}>
				<Heading as='h1' size='md'>
					Supply Chain Items
				</Heading>
				<Button onClick={onOpen}>Add Item</Button>
			</Flex>

			<Items supplyItems={supplyItems} refetch={fetchItems} />

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<AddItem refetch={fetchItems} onClose={onClose} />
				</ModalContent>
			</Modal>
		</Box>
	);
};
