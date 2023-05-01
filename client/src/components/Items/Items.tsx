import { Button, Flex, Modal, ModalContent, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteItem } from "./DeleteItem";
import { EditItem } from "./EditItem";
import { TItem } from "./Item";

interface ItemsProps {
	supplyItems: TItem[];
	refetch: () => void;
}

export const Items: FC<ItemsProps> = ({ supplyItems, refetch }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { isOpen: isDeleteOpen, onOpen: opDeleteOpen, onClose: onDeleteClose } = useDisclosure();

	const navigate = useNavigate();

	const [selectedItem, setSelectedItem] = useState<TItem | null>(null);

	const viewItem = (id: number) => {
		navigate(`/${id}`);
	};

	const handleEdit = (item: TItem) => {
		setSelectedItem(item);
		onOpen();
	};

	const handleDelete = (item: TItem) => {
		setSelectedItem(item);
		opDeleteOpen();
	};

	return (
		<>
			<TableContainer border='1px' borderColor='gray.200' borderRadius='md' p={4}>
				<Table variant='simple' maxWidth='100%'>
					<Thead>
						<Tr>
							<Th>Name</Th>
							<Th isNumeric>Price</Th>
							<Th isNumeric>Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{supplyItems?.map((item) => (
							<Tr key={item.id}>
								<Td>{item.name}</Td>
								<Td isNumeric>{item.price}</Td>
								<Td isNumeric>
									<Flex justifyContent='flex-end' gap={2}>
										<Button onClick={() => viewItem(item.id)}>View</Button>
										<Button onClick={() => handleEdit(item)}>Edit</Button>
										<Button onClick={() => handleDelete(item)}>Delete</Button>
									</Flex>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<EditItem item={selectedItem} refetch={refetch} onClose={onClose} />
				</ModalContent>
			</Modal>
			<Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
				<ModalOverlay />
				<ModalContent>
					<DeleteItem item={selectedItem} refetch={refetch} onClose={onDeleteClose} />
				</ModalContent>
			</Modal>
		</>
	);
};
