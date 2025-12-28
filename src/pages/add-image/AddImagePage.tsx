import { addCover } from "@/src/entities/cover/api/addCover";
import { COVER_PATH } from "@/src/shared/config/config";
import { ImagePicker } from "@/src/shared/ui/ImagePicker";
import { StyledLabel } from "@/src/shared/ui/StyledLabel";
import { StyledTextInput } from "@/src/shared/ui/StyledTextInput";
import { VerticalMargin } from "@/src/shared/ui/VerticalMargin";
import { Wrapper } from "@/src/shared/ui/Wrapper";
import { Directory, File } from "expo-file-system";
import { useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
	button: {
		marginTop: 20,
	},
});

export const AddImagePage = () => {
	const [src, setSrc] = useState("");
	const [name, setName] = useState("");

	const onPress = async () => {
		const trimmedName = name.trim();
		if (src !== "" && trimmedName !== "") {
			try {
				const dir = new Directory(COVER_PATH);
				const image = new File(src);

				image.rename(trimmedName + "_" + image.name);
				image.move(dir);

				await addCover({name: trimmedName, src: image.uri});
				Alert.alert("Изображение добавлено успешно!");

				setSrc("");
				setName("");
			} catch (e) {
				console.log(e);
				Alert.alert("Ошибка при добавлении изображения: " + e);
			}
		}
	};

	return (
		<VerticalMargin>
			<Wrapper>
				<StyledLabel text="Название" />
				<StyledTextInput value={name} onChangeText={setName} />

				<StyledLabel text="Изображение" />
				<ImagePicker src={src} onPick={setSrc} />

				<View style={styles.button}>
					<Button title="Добавить" onPress={onPress} />
				</View>
			</Wrapper>
		</VerticalMargin>
	);
};
