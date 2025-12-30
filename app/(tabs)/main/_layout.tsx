import { Stack } from "expo-router";

const MainLayout = () => {
	return (
		<Stack>
            <Stack.Screen name="index" options={{title: "Главная"}} />
			<Stack.Screen name="add-image" options={{title: "Добавить изображение"}} />
			<Stack.Screen name="add-author" options={{title: "Добавить исполнителя"}} />
			<Stack.Screen name="add-audio" options={{title: "Добавить аудио"}} />
			<Stack.Screen name="add-playlist" options={{title: "Добавить плейлист"}} />
		</Stack>
	);
};


export default MainLayout