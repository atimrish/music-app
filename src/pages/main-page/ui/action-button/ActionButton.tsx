import {StyleSheet, View, Text} from "react-native";

const styles = StyleSheet.create({
	container: {
		width: '47%',
        backgroundColor: '#0f0faf',
        borderRadius: 20
	},
    text: {
        textAlign: 'center',
        color: '#FFFFFF',
        paddingVertical: 30,
        fontWeight: 600
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
