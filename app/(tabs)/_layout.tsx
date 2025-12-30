import { Tabs, useSegments } from "expo-router";

const TabsLayout = () => {
	const segments = useSegments();    
	const hideTabBar = segments.filter(seg => seg !== "(tabs)").length > 1;

	return (
		<Tabs
            initialRouteName="main"
			screenOptions={{
				tabBarStyle: {
					display: hideTabBar ? "none" : "flex",
				},
                animation: 'fade'
			}}>
			<Tabs.Screen name="main" options={{headerShown: false, title: "Главная"}} />
			<Tabs.Screen name="audio" options={{headerShown: false, title: "Аудио" }} />
			<Tabs.Screen name="playlist" options={{headerShown: false, title: "Плейлисты" }} />
			<Tabs.Screen name="author" options={{headerShown: false, title: "Исполнители" }} />
		</Tabs>
	);
};

export default TabsLayout;
