import { StyleSheet, Text, View } from "react-native";
import { ActionButton } from "./ui/action-button/ActionButton";

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
		alignItems: "center",
		justifyContent: "center",
	},
    addContainer: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 10
    },
    addText: {
        fontSize: 20,
        marginBottom: 30,
        textAlign: 'center',
        fontWeight: '700'
    },
    root: {
        paddingHorizontal: 10
    }
});

export const MainPage = () => {
	return (
		<View style={styles.root}>
			<View style={styles.addContainer}>
                <Text style={styles.addText}>Добавить</Text>

				<View style={styles.container}>
					<ActionButton text="Изображение" url="/(tabs)/main/add-audio" />
					<ActionButton text="Исполнителя" url="/(tabs)/main/add-author" />
					<ActionButton text="Аудио" url="/(tabs)/main/add-audio" />
					<ActionButton text="Плейлист" url="/(tabs)/main/add-playlist" />
				</View>
			</View>
		</View>
	);	
};
