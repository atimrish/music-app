import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 30,
	},
});

export const Wrapper = (p: PropsWithChildren) => {
	return <View style={styles.container}>{p.children}</View>;
};
