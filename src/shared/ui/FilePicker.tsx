import * as DocumentPicker from "expo-document-picker";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 15,
		paddingHorizontal: 20,
		width: "100%",
		height: 48,
		justifyContent: "center",
	},
	text: {
		fontSize: 20,
        width: '90%',
	},
	arrow: {
		fontSize: 24,
		color: "gray",
		fontWeight: 700,
	},
	innerContainer: {
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
	},
});

type Props = {
    src: string,
    onPick: (uri: string) => void
}

export const FilePicker = (p: Props) => {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={async () => {
				const {canceled, assets} = await DocumentPicker.getDocumentAsync({
					type: "audio/*",
					multiple: false,
					copyToCacheDirectory: true,
				});
                if (!canceled) {
                    p.onPick(assets[0].uri)
                }
			}}>
			<View style={styles.innerContainer}>
				<Text numberOfLines={1} style={styles.text}>{p.src ? p.src.split('/').at(-1) : 'Выберите...'}</Text>
				<Text style={styles.arrow}>{">"}</Text>
			</View>
		</TouchableOpacity>
	);
};
