import { addAudio } from "@/src/entities/audio/api/addAudio";
import { getAuthorsAll } from "@/src/entities/author/api/getAuthorsAll";
import { IAuthor } from "@/src/entities/author/model/interfaces";
import { ICover } from "@/src/entities/cover/model/interfaces";
import { AUDIO_PATH } from "@/src/shared/config/config";
import { FilePicker } from "@/src/shared/ui/FilePicker";
import { LocalImagePicker } from "@/src/shared/ui/LocalImagePicker";
import { SearchList } from "@/src/shared/ui/SearchList";
import { StyledLabel } from "@/src/shared/ui/StyledLabel";
import { StyledTextInput } from "@/src/shared/ui/StyledTextInput";
import { VerticalMargin } from "@/src/shared/ui/VerticalMargin";
import { Wrapper } from "@/src/shared/ui/Wrapper";
import { Directory, File } from "expo-file-system";
import { useEffect, useState } from "react";
import { Alert, Button, View } from "react-native";

export const AddAudioPage = () => {
	const [cover, setCover] = useState<ICover | null>(null);
	const [authors, setAuthors] = useState<IAuthor[] | null>(null);
	const [selectedAuthorId, setSelectedAuthorId] = useState(-1);
	const [audioSrc, setAudioSrc] = useState("");
	const [name, setName] = useState("");

	const data = authors ? authors.map((i) => ({value: i.id, text: i.name})) : [];

	useEffect(() => {
		getAuthorsAll().then(setAuthors).catch(console.error);
	}, []);

	const onPress = async () => {
		const trimmedName = name.trim();

		if (cover && selectedAuthorId !== -1 && audioSrc !== "" && trimmedName !== "") {
			try {
				const audioFile = new File(audioSrc);
				audioFile.rename(trimmedName + "_" + audioFile.name);
				const dirToMove = new Directory(AUDIO_PATH);
				audioFile.move(dirToMove);

				await addAudio({
					name: trimmedName,
					authorId: selectedAuthorId,
					coverId: cover.id,
					src: audioFile.uri,
				});
				Alert.alert("Аудио добавлено успешно!");

				setCover(null);
				setSelectedAuthorId(-1);
				setAudioSrc("");
				setName("");
			} catch (e) {
				Alert.alert("Ошибка при добавлении аудио", String(e));
				console.error(e);
			}
		}
	};

	return (
		<VerticalMargin>
			<Wrapper>
				<StyledLabel text="Изображение" />
				<LocalImagePicker src={cover ? cover.src : ""} onDone={setCover} />

				<StyledLabel text="Название" />
				<StyledTextInput value={name} onChangeText={setName} />

				<StyledLabel text="Исполнитель" />
				<SearchList
					data={data}
					onSelect={(i) => {
						setSelectedAuthorId(i.value);
					}}
				/>

				<StyledLabel text="Аудио" />
				<FilePicker src={audioSrc} onPick={setAudioSrc} />

				<View style={{marginTop: 30}}>
					<Button title="Добавить" onPress={onPress} />
				</View>
			</Wrapper>
		</VerticalMargin>
	);
};
