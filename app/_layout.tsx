import { setupDb } from "@/src/main/database/database";
import { Stack } from "expo-router";
import { useEffect } from "react";

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
			<Stack.Screen name="add-image" options={{title: "Добавить изображение"}} />
			<Stack.Screen name="add-author" options={{title: "Добавить исполнителя"}} />
			<Stack.Screen name="add-playlist" options={{title: "Добавить плейлист"}} />
		</Stack>
	);};

export default Layout;
