import { StyledLabel } from "@/src/shared/ui/StyledLabel";
import { StyledTextInput } from "@/src/shared/ui/StyledTextInput";
import { VerticalMargin } from "@/src/shared/ui/VerticalMargin";
import { Wrapper } from "@/src/shared/ui/Wrapper";
import { Button, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
	button: {
		marginTop: 20,
	},
});

export const AddAuthorPage = () => {
	return (
		<VerticalMargin>
			<Wrapper>
				<StyledLabel text="Исполнитель" />
				<StyledTextInput />

				<View style={styles.button}>
					<Button title="Добавить" />
				</View>
			</Wrapper>
		</VerticalMargin>
	);
};
