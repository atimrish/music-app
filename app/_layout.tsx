import { setup } from "@/src/main/setup/setup";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";

const Layout = () => {
	useEffect(() => {
		// clearAll()
		// dropTables()
		setup();
	}, []);

	return (
		<>
			<StatusBar />
			<Stack initialRouteName="(tabs)">
				<Stack.Screen name="(tabs)" options={{headerShown: false}} />
			</Stack>
		</>
	);
};

export default Layout;
