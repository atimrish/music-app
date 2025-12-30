import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IJoinedAudio } from "../api/getAudiosAllJoined";

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
        flexDirection: 'row',
        gap: 10
	},
    image: {
        width: 60,
        height: 60,
        borderRadius: 5
    },
    name: {
        fontSize: 16,
        fontWeight: 600
    },
    author: {
        fontSize: 14
    }
});

type Props = {
	audio: IJoinedAudio;
};

export const AudioItem = ({audio}: Props) => {
	return (
		<TouchableOpacity style={styles.container}>
			<Image style={styles.image} source={{uri: audio.coverSrc}} />

			<View>
				<Text style={styles.name}>{audio.name}</Text>
				<Text style={styles.author}>{audio.author}</Text>
			</View>
		</TouchableOpacity>
	);
};
