import { StyleSheet, Text } from "react-native";

const styles  = StyleSheet.create({
    label: {
        fontSize: 20,
        marginVertical: 10,
        width: '100%'
    }
})

type Props = {
	text: string;
};

export const StyledLabel = (p: Props) => {
	return <Text style={styles.label}>{p.text}</Text>;
};
