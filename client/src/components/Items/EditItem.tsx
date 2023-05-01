import { FC } from "react";

import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Stack, Textarea, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateItem } from "../../apis/itemsService";
import { TItem } from "./Item";

interface EditItemProps {
	item: TItem | null;
	refetch: () => void;
	onClose: () => void;
}

export const EditItem: FC<EditItemProps> = ({ item, refetch, onClose }) => {
	const toast = useToast();

	const initialValues = {
		name: item?.name || "",
		description: item?.description || "",
		price: item?.price || 0,
		color: item?.color || "",
		sku: item?.sku || "",
	};

	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			name: Yup.string().required("Name is required"),
			description: Yup.string().required("Description is required"),
			price: Yup.number().required("Price is required"),
			color: Yup.string().required("Color is required"),
		}),
		onSubmit: async (values) => {
			if (!item) return;
			const { status, data } = await updateItem(item.id, values);

			if (status !== 200) {
				toast({
					title: "Request Failed",
					description: "There was an error updating the item. Please try again.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			} else {
				toast({
					title: "Item Updated",
					description: `${data?.name} was successfully updated.`,
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			}
			onClose();
			refetch();
		},
	});

	return (
		<Box p={8}>
			<form onSubmit={formik.handleSubmit}>
				<Stack spacing={4}>
					<FormControl isRequired isInvalid={formik.touched.name && Boolean(formik.errors.name)}>
						<FormLabel>Name</FormLabel>
						<Input
							name='name'
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder='Enter name'
						/>
						<FormErrorMessage>{formik.errors.name}</FormErrorMessage>
					</FormControl>
					<FormControl isRequired isInvalid={formik.touched.description && Boolean(formik.errors.description)}>
						<FormLabel>Description</FormLabel>
						<Textarea
							name='description'
							value={formik.values.description}
							onChange={formik.handleChange}
							placeholder='Enter description'
						/>
						<FormErrorMessage>{formik.errors.description}</FormErrorMessage>
					</FormControl>
					<FormControl isRequired isInvalid={formik.touched.price && Boolean(formik.errors.price)}>
						<FormLabel>Price</FormLabel>
						<Input name='price' value={formik.values.price} onChange={formik.handleChange} placeholder='Enter price' />
						<FormErrorMessage>{formik.errors.price}</FormErrorMessage>
					</FormControl>

					<FormControl isRequired isInvalid={formik.touched.color && Boolean(formik.errors.color)}>
						<FormLabel>Color</FormLabel>
						<Input name='color' value={formik.values.color} onChange={formik.handleChange} placeholder='Enter color' />
						<FormErrorMessage>{formik.errors.color}</FormErrorMessage>
					</FormControl>

					<Flex justifyContent='flex-end' gap={4}>
						<Button onClick={onClose} variant='outline'>
							Cancel
						</Button>
						<Button type='submit'>Update Item</Button>
					</Flex>
				</Stack>
			</form>
		</Box>
	);
};
