import { FC } from "react";

import { Box, Button, Flex, Modal, ModalContent, ModalOverlay, SimpleGrid, Text, useDisclosure, useMediaQuery } from "@chakra-ui/react";

import { EventStatus, eventStatuses } from "../../constants";
import { DeleteEvent } from "./DeleteEvent";
import { EditEvent } from "./EditEvent";
import { TEvent } from "./Events";

interface TEventItemProps {
	event: TEvent | null;
	itemId: number;
	refetch: (id: number) => void;
}

export const EventItem: FC<TEventItemProps> = ({ event, itemId, refetch }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: isDeleteOpen, onOpen: opDeleteOpen, onClose: onDeleteClose } = useDisclosure();
	const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

	if (!event) {
		return null;
	}

	const getEventStatus = (status: EventStatus) => {
		const eventStatus = eventStatuses.find((eventStatus) => eventStatus.value === status);
		return eventStatus?.label;
	};

	return (
		<Box key={event.id} border='1px' borderColor='gray.200' borderRadius='md' p={4} mb={4}>
			<SimpleGrid alignItems='center' columns={isSmallScreen ? 1 : 2} spacing={2} mb={2}>
				<Text>
					<strong>Status:</strong> {getEventStatus(event?.status)}
				</Text>
				<Text>
					<strong>Date:</strong> {new Date(event?.timestamp).toLocaleDateString()}
				</Text>
				<Text>
					<strong>Location:</strong> {event?.location}
				</Text>
				<Text>
					<strong>Custodian:</strong> {event?.custodian}
				</Text>
			</SimpleGrid>
			<Text>
				<strong>Notes:</strong> {event?.notes}
			</Text>
			<Flex justifyContent='flex-end' gap={2}>
				<Button onClick={onOpen}>Edit</Button>
				<Button onClick={opDeleteOpen}>Delete</Button>
			</Flex>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<EditEvent event={event} refetch={refetch} onClose={onClose} itemId={itemId} />
				</ModalContent>
			</Modal>
			<Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
				<ModalOverlay />
				<ModalContent>
					<DeleteEvent event={event} refetch={() => refetch(itemId)} onClose={onDeleteClose} />
				</ModalContent>
			</Modal>
		</Box>
	);
};
