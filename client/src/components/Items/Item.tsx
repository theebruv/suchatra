import { Box, Button, Flex, Heading, SimpleGrid, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Events, TEvent } from "../Events/Events";

export type TItem = {
	id: number;
	name: string;
	description: string;
	price: number;
	color: string;
	events?: TEvent[];
	sku?: string;
};

interface ItemProps {
	supplyItem: TItem;
	fetchItem: (id: number) => void;
}

export const Item: FC<ItemProps> = ({ supplyItem, fetchItem }) => {
	const navigate = useNavigate();
	const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

	const goBack = () => {
		navigate("/");
	};

	return (
		<Stack spacing={4}>
			<Flex justifyContent='space-between' alignItems='center'>
				<Heading as='h1' size='md'>
					{supplyItem?.name}
				</Heading>
				<Button onClick={goBack}>Back</Button>
			</Flex>
			<Box border='1px' borderColor='gray.200' borderRadius='md' p={4}>
				<Heading as='h2' size='sm' mb={2}>
					Description
				</Heading>
				<Text>{supplyItem?.description}</Text>

				<SimpleGrid alignItems='center' columns={isSmallScreen ? 1 : 3} spacing={4} my={4}>
					<Box border='1px' borderColor='gray.200' borderRadius='md' p={4}>
						<Heading as='h2' size='sm' mb={2}>
							Tracking ID
						</Heading>
						<Text>{supplyItem?.sku}</Text>
					</Box>
					<Box border='1px' borderColor='gray.200' borderRadius='md' p={4}>
						<Heading as='h2' size='sm' mb={2}>
							Price
						</Heading>
						<Text>{supplyItem?.price}</Text>
					</Box>
					<Box border='1px' borderColor='gray.200' borderRadius='md' p={4}>
						<Heading as='h2' size='sm' mb={2}>
							Color
						</Heading>
						<Text>{supplyItem?.color}</Text>
					</Box>
				</SimpleGrid>

				<Events events={supplyItem?.events} fetchItem={fetchItem} itemId={supplyItem.id} />
			</Box>
		</Stack>
	);
};
