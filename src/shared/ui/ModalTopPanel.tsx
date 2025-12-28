import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
    topPanel: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	topText: {
		fontSize: 20,
	},
})

type Props = {
    onBack: () => void,
    onDone: () => void
}

export const ModalTopPanel = (p: Props) => {
	return (
		<View style={styles.topPanel}>
			<TouchableOpacity onPress={p.onBack}>
				<Text>Назад</Text>
			</TouchableOpacity>
			<Text style={styles.topText}>Выберите</Text>
			<TouchableOpacity
				onPress={p.onDone}>
				<Text>Готово</Text>
			</TouchableOpacity>
		</View>
	);
};
