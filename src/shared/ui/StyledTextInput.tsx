import { StyleSheet, TextInput, TextInputProps } from "react-native";

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderRadius: 15,
		paddingHorizontal: 20,
		fontSize: 20,
		height: 48,
		width: '100%'
	},
});

type Props = TextInputProps & {};

export const StyledTextInput = (p: Props) => {
	return <TextInput style={styles.input} {...p} />;
};
