import {StyleSheet, View, Text} from "react-native";

const styles = StyleSheet.create({
	container: {
		width: '47%',
		height: 100,
        backgroundColor: '#0f0faf',
        borderRadius: 20
	},
    text: {
        lineHeight: 100,
        textAlign: 'center',
        color: '#FFFFFF'
    }
});

type Props = {
	text: string;
};

export const ActionButton = (p: Props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{p.text}</Text>
		</View>
	);
};
