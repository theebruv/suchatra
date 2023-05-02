import { Box, Button, Flex, FormControl, Input, useMediaQuery, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { trackItem } from "../../apis/itemsService";

export const TrackItem = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const [isSmallScreen] = useMediaQuery("(max-width: 540px)");

	const formik = useFormik({
		initialValues: {
			trackingNumber: "",
		},
		validationSchema: Yup.object({
			trackingNumber: Yup.string().required("Tracking Number is required"),
		}),
		onSubmit: async ({ trackingNumber }) => {
			const { status, data } = await trackItem(trackingNumber);
			if (status !== 200) {
				toast({
					title: "Request Failed",
					description: "There was an error getting the item details. Please try again.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			} else {
				if (data?.id) {
					navigate(`/${data?.id}`);
				} else {
					toast({
						title: "Item Not Found",
						description: "Item with that tracking number was not found.",
						status: "info",
						duration: 9000,
						isClosable: true,
					});
				}
			}
		},
	});

	return (
		<Box py={6}>
			<form onSubmit={formik.handleSubmit}>
				<Flex direction={isSmallScreen ? "column" : "row"} alignItems='center' justifyContent='center' gap={4}>
					<FormControl isInvalid={!!formik.errors.trackingNumber} maxWidth='540px'>
						<Input
							id='trackingNumber'
							name='trackingNumber'
							type='text'
							onChange={formik.handleChange}
							value={formik.values.trackingNumber}
							placeholder='Enter Tracking Number'
						/>
					</FormControl>
					<Button minWidth={isSmallScreen ? "100%" : "200px"} type='submit'>
						Track Item
					</Button>
				</Flex>
			</form>
		</Box>
	);
};
