import { addAuthor } from "@/src/entities/author/api/addAuthor";
import { checkAuthorExists } from "@/src/entities/author/api/checkAuthorExists";
import { StyledLabel } from "@/src/shared/ui/StyledLabel";
import { StyledTextInput } from "@/src/shared/ui/StyledTextInput";
import { VerticalMargin } from "@/src/shared/ui/VerticalMargin";
import { Wrapper } from "@/src/shared/ui/Wrapper";
import { useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
	button: {
		marginTop: 20,
	},
});

export const AddAuthorPage = () => {
	const [name, setName] = useState("");

	const onPress = async () => {
		const trimmedName = name.trim()
		try {
			if (trimmedName === "") {
				Alert.alert("Введите название исполнителя");
				return;
			}

			if (await checkAuthorExists(trimmedName)) {
				Alert.alert("Такой исполнитель уже существует");
				return;
			}

			await addAuthor({name: trimmedName});
			Alert.alert("Исполнитель добавлен успешно");
			setName("");
		} catch (e) {
			Alert.alert("Ошибка при добавлении автора: " + e);
		}
	};

	return (
		<VerticalMargin>
			<Wrapper>
				<StyledLabel text="Исполнитель" />
				<StyledTextInput value={name} onChangeText={setName} />

				<View style={styles.button}>
					<Button title="Добавить" onPress={onPress} />
				</View>
			</Wrapper>
		</VerticalMargin>
	);
};
