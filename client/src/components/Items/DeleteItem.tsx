import { FC } from "react";

import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { deleteItem as deleteItemService } from "../../apis/itemsService";
import { TItem } from "./Item";

interface DeleteItemProps {
	item: TItem | null;
	refetch: () => void;
	onClose: () => void;
}

export const DeleteItem: FC<DeleteItemProps> = ({ item, refetch, onClose }) => {
	const toast = useToast();

	const handleDelete = async () => {
		if (!item) {
			return;
		}
		const { status } = await deleteItemService(item.id);

		if (status !== 200) {
			toast({
				title: "Request Failed",
				description: "There was an error deleting the item. Please try again.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Item Deleted",
				description: `Item was successfully deleted.`,
				status: "success",
				duration: 9000,
				isClosable: true,
			});
		}
		onClose();
		refetch();
	};

	return (
		<Flex direction='column' p={8} gap={8}>
			<Text>Are you sure you want to delete {item?.name}?</Text>
			<Flex justifyContent='flex-end' gap={4}>
				<Button onClick={onClose}>Cancel</Button>
				<Button colorScheme='red' onClick={handleDelete}>
					Delete
				</Button>
			</Flex>
		</Flex>
	);
};
