import { FC } from "react";

import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Select, Stack, Textarea, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateEvent } from "../../apis/eventService";
import { EventStatus, eventStatuses } from "../../constants";
import { TEvent } from "./Events";

interface EditEventProps {
	event: TEvent | null;
	itemId: number;
	refetch: (id: number) => void;
	onClose: () => void;
}

export const EditEvent: FC<EditEventProps> = ({ event, itemId, refetch, onClose }) => {
	const toast = useToast();

	const initialValues = {
		status: (event?.status || "") as EventStatus,
		notes: event?.notes || "",
		location: event?.location || "",
		custodian: event?.custodian || "",
	};

	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			status: Yup.string().required("Status is required"),
			notes: Yup.string().required("Notes is required"),
			location: Yup.string().required("Location is required"),
			custodian: Yup.string().required("Custodian is required"),
		}),
		onSubmit: async (values) => {
			if (!event) {
				return;
			}
			if (!event) return;
			const { status } = await updateEvent(event.id, values);

			if (status !== 200) {
				toast({
					title: "Request Failed",
					description: "There was an error updating the event. Please try again.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			} else {
				toast({
					title: "Item Updated",
					description: `Event was successfully updated.`,
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			}
			onClose();
			refetch(itemId);
		},
	});

	return (
		<Box p={8}>
			<form onSubmit={formik.handleSubmit}>
				<Stack spacing={4}>
					<FormControl isRequired isInvalid={formik.touched.status && Boolean(formik.errors.status)}>
						<FormLabel>Status</FormLabel>
						<Select name='status' value={formik.values.status} onChange={formik.handleChange} placeholder='Select status'>
							{eventStatuses.map((status) => (
								<option key={status.value} value={status.value}>
									{status.label}
								</option>
							))}
						</Select>
						<FormErrorMessage>{formik.errors.status}</FormErrorMessage>
					</FormControl>
					<FormControl isRequired isInvalid={formik.touched.notes && Boolean(formik.errors.notes)}>
						<FormLabel>Notes</FormLabel>
						<Textarea name='notes' value={formik.values.notes} onChange={formik.handleChange} placeholder='Enter notes' />
						<FormErrorMessage>{formik.errors.notes}</FormErrorMessage>
					</FormControl>
					<FormControl isRequired isInvalid={formik.touched.location && Boolean(formik.errors.location)}>
						<FormLabel>Location</FormLabel>
						<Input name='location' value={formik.values.location} onChange={formik.handleChange} placeholder='Enter location' />
						<FormErrorMessage>{formik.errors.location}</FormErrorMessage>
					</FormControl>

					<FormControl isRequired isInvalid={formik.touched.custodian && Boolean(formik.errors.custodian)}>
						<FormLabel>Custodian</FormLabel>
						<Input name='custodian' value={formik.values.custodian} onChange={formik.handleChange} placeholder='Enter custodian' />
						<FormErrorMessage>{formik.errors.custodian}</FormErrorMessage>
					</FormControl>

					<Flex justifyContent='flex-end' gap={4}>
						<Button onClick={onClose} variant='outline'>
							Cancel
						</Button>
						<Button type='submit'>Submit</Button>
					</Flex>
				</Stack>
			</form>
		</Box>
	);
};
