import { Checkbox } from 'expo-checkbox';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		flexDirection: "row",
        gap: 10
	},
	cover: {
		width: 60,
		height: 60,
		borderRadius: 10,
	},
    audioName: {
        fontSize: 18
    },
    authorName: {
        fontSize: 14
    },
    checkBox: {
        marginLeft: 'auto',
        alignSelf: 'center'
    }
});

type Props = {
	name: string;
	author: string;
	coverSrc: string;
	selected: boolean;
	onSelect: () => void;
};

export const SelectAudioItem = (p: Props) => {
	return (
		<TouchableOpacity style={styles.container} onPress={p.onSelect}>
			<Image style={styles.cover} source={{uri: p.coverSrc}} />

			<View>
				<Text style={styles.audioName}>{p.name}</Text>
				<Text style={styles.authorName}>{p.author}</Text>
			</View>

            <Checkbox style={styles.checkBox} value={p.selected}/>
		</TouchableOpacity>
	);
};
