import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
	container: {
		width: "47%",
		backgroundColor: "#0f0faf",
		borderRadius: 20,
		paddingVertical: 30,
	},
	text: {
		textAlign: "center",
		color: "#FFFFFF",
		fontWeight: 600,
	},
});

type Props = {
	text: string;
	url: Parameters<typeof Link>["0"]["href"];
};

export const ActionButton = (p: Props) => {
	return (
		<Link style={styles.container} href={p.url}>
			<Text style={styles.text}>{p.text}</Text>
		</Link>
	);
};
