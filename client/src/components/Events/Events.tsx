import { Box, Button, Flex, Heading, Modal, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { EventStatus } from "../../constants";
import { AddEvent } from "./AddEvent";
import { EventItem } from "./EventItem";

export type TEvent = {
	id: number;
	notes: string;
	timestamp: string;
	location: string;
	custodian: string;
	status: EventStatus;
};

interface EventsProps {
	itemId: number;
	events: TEvent[] | undefined;
	fetchItem: (id: number) => void;
}
export const Events: FC<EventsProps> = ({ events, itemId, fetchItem }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const sortedEvents = useMemo(() => {
		return (
			events?.sort((a, b) => {
				return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
			}) || []
		);
	}, [events]);

	return (
		<Box width='100%'>
			<Flex justifyContent='space-between' alignItems='center' mb={4}>
				<Heading as='h1' size='md'>
					Events
				</Heading>
				<Button onClick={onOpen}>Add Event</Button>
			</Flex>

			{sortedEvents?.map((event: TEvent) => (
				<EventItem key={event.id} event={event} refetch={fetchItem} itemId={itemId} />
			))}

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<AddEvent refetch={fetchItem} onClose={onClose} itemId={itemId} />
				</ModalContent>
			</Modal>
		</Box>
	);
};
