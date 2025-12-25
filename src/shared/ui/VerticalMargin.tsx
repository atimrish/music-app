import {PropsWithChildren} from "react";
import {StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
	},
});

export const VerticalMargin = (p: PropsWithChildren) => {
	return <View style={styles.container}>{p.children}</View>;
};
