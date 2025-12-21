import {setupDb} from "@/src/main/database/database";
import {Stack} from "expo-router";
import {useEffect} from "react";

const Layout = () => {
	useEffect(() => {
		setupDb().then(
			() => console.log("[SQLITE] successfuly initialized"),
			(e) => console.error("[SQLITE] ", e)
		);
	}, []);

	return (
		<Stack>
			<Stack.Screen name="index" options={{title: "Главная"}} />
		</Stack>
	);
};

export default Layout;
