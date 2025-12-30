import { setup } from "@/src/main/setup/setup";
import { Stack } from "expo-router";
import { useEffect } from "react";

const Layout = () => {
	useEffect(() => {
		// clearAll()
		// dropTables()
		setup();
	}, []);

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{headerShown: false}} />
		</Stack>
	);
};

export default Layout;
