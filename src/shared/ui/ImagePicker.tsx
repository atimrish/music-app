import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
	container: {
		width: 300,
		height: 300,
		backgroundColor: "#dadada",
		borderRadius: 15,
        overflow: 'hidden'
	},
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }
});

const pickFile = async () => {
	const {canceled, assets} = await DocumentPicker.getDocumentAsync({
		type: "image/*",
		multiple: false,
        copyToCacheDirectory: true
	});
	return canceled ? "" : assets[0].uri;
};

export const ImagePicker = () => {
	const [src, setSrc] = useState("");

	return (
		<TouchableOpacity style={styles.container} onPress={() => pickFile().then(setSrc)}>
			<Image style={styles.image} source={{uri: src}} />
		</TouchableOpacity>
	);
};
