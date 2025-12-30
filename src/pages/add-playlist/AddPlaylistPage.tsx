import { ICover } from "@/src/entities/cover/model/interfaces";
import { addPlaylist } from "@/src/entities/playlist/api/addPlaylist";
import { SelectAudios } from "@/src/entities/playlist/ui/SelectAudios";
import { LocalImagePicker } from "@/src/shared/ui/LocalImagePicker";
import { StyledLabel } from "@/src/shared/ui/StyledLabel";
import { StyledTextInput } from "@/src/shared/ui/StyledTextInput";
import { VerticalMargin } from "@/src/shared/ui/VerticalMargin";
import { Wrapper } from "@/src/shared/ui/Wrapper";
import { useState } from "react";
import { Alert, Button, View } from "react-native";

export const AddPlaylistPage = () => {
	const [cover, setCover] = useState<ICover | null>(null);
	const [name, setName] = useState('')
	const [audioIds, setAudioIds] = useState<number[]>([])

	const onPress = async () => {
		const trimmedName = name.trim()

		try {
			if (cover && trimmedName !== '' && audioIds.length > 0) {
				
				await addPlaylist({
					name: trimmedName,
					coverId: cover.id,
					audioIds
				})

				Alert.alert('Плейлист добавлен успешно')

				setCover(null)
				setName('')
				setAudioIds([])

			} else {
				throw new Error('Не переданы нужные данные')
			}
		} catch (e) {
			if (e instanceof Error) {
				Alert.alert('Ошибка', e.message)
			}
		}
		
	}

	return (
		<VerticalMargin>
			<Wrapper>
				<StyledLabel text="Изображение" />
				<LocalImagePicker src={cover?.src ?? ""} onDone={(picked) => setCover(picked)} />

				<StyledLabel text="Название" />
				<StyledTextInput value={name} onChangeText={setName} />

				<StyledLabel text="Выбранные аудио" />
				<SelectAudios onDone={(ids) => setAudioIds(ids)} />

				<View style={{marginTop: 40}}>
					<Button title="Добавить" onPress={onPress} />
				</View>
			</Wrapper>
		</VerticalMargin>
	);
};
