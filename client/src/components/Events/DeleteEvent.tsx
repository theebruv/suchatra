import { FC } from "react";

import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { deleteEvent as deleteEventService } from "../../apis/eventService";
import { TEvent } from "./Events";

interface DeleteEventProps {
	event: TEvent | null;
	refetch: () => void;
	onClose: () => void;
}

export const DeleteEvent: FC<DeleteEventProps> = ({ event, refetch, onClose }) => {
	const toast = useToast();

	const handleDelete = async () => {
		if (!event) {
			return;
		}
		const { status } = await deleteEventService(event.id);

		if (status !== 200) {
			toast({
				title: "Request Failed",
				description: "There was an error deleting the event. Please try again.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Item Deleted",
				description: `Event was successfully deleted.`,
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
			<Text>Are you sure you want to delete this event?</Text>
			<Flex justifyContent='flex-end' gap={4}>
				<Button onClick={onClose}>Cancel</Button>
				<Button colorScheme='red' onClick={handleDelete}>
					Delete
				</Button>
			</Flex>
		</Flex>
	);
};
