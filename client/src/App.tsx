import { Box, Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { ItemPage } from "./pages/ItemPage";
import { ItemsPage } from "./pages/ItemsPage";

const App = () => {
	const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
	return (
		<Box width='100%' px={isSmallScreen ? 8 : 32} py={2}>
			<Flex direction='column' justifyContent='center' alignItems='center' my={8} gap={4}>
				<Heading as='h1' size='md'>
					Suchatra
				</Heading>
				<Text>Supply Chain Track and Trace System</Text>
			</Flex>
			<Routes>
				<Route path='/' element={<ItemsPage />} />
				<Route path='/:id' element={<ItemPage />} />
			</Routes>
		</Box>
	);
};

export default App;
