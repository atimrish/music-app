import { dropTables, setup } from "@/src/main/setup/setup";
import { Stack } from "expo-router";
import { useEffect } from "react";

const Layout = () => {
	useEffect(() => {
		// clearAll()
		// dropTables()
		setup()
	}, []);

	return (
		<Stack>
			<Stack.Screen name="index" options={{title: "Главная"}} />
			<Stack.Screen name="add-image" options={{title: "Добавить изображение"}} />
			<Stack.Screen name="add-author" options={{title: "Добавить исполнителя"}} />
			<Stack.Screen name="add-audio" options={{title: "Добавить аудио"}} />
			<Stack.Screen name="add-playlist" options={{title: "Добавить плейлист"}} />
		</Stack>
	);};

export default Layout;
