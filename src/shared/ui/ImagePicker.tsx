import * as DocumentPicker from "expo-document-picker";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
	container: {
		width: 300,
		height: 300,
		backgroundColor: "#dadada",
		borderRadius: 15,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},
});

type Props = {
	src: string;
	onPick: (uri: string) => void;
};

export const ImagePicker = (p: Props) => {
	const pickFile = async () => {
		const {canceled, assets} = await DocumentPicker.getDocumentAsync({
			type: "image/*",
			multiple: false,
			copyToCacheDirectory: true,
		});

		if (!canceled) {
			p.onPick(assets[0].uri)
		}
	};

	return (
		<TouchableOpacity style={styles.container} onPress={pickFile}>
			<Image style={styles.image} source={p.src ? {uri: p.src} : undefined} />
		</TouchableOpacity>
	);
};
