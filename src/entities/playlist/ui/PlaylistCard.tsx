import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IJoinedPlaylist } from "../model/interfaces";

const styles = StyleSheet.create({
	container: {
        width: '47%'
    },
	image: {
		width: "100%",
		aspectRatio: 1,
        borderRadius: 10
	},
    text: {
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        position: 'relative'
    },
    countAudios: {
        color: 'white',
        textAlign: 'center',
        flex: 1
    },
    countAudiosBlock: {
        position: 'absolute',
        right: 10,
        top: 10,
        backgroundColor: 'black',
        minWidth: 20,
        aspectRatio: 1,
        borderRadius: '50%'
    }
});

type Props = {
	playlist: IJoinedPlaylist;
};

export const PlaylistCard = ({playlist}: Props) => {
	return (
		<TouchableOpacity style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: playlist.coverSrc}} />
                <View style={styles.countAudiosBlock}>
                    <Text style={styles.countAudios}>{playlist.countAudios}</Text>
                </View>
                
            </View>
			
			<Text style={styles.text}>{playlist.name}</Text>
		</TouchableOpacity>
	);
};
