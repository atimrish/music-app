import {getAudiosAllJoined} from "@/src/entities/audio/api/getAudiosAllJoined";
import { IJoinedAudio } from "@/src/entities/audio/model/interfaces";
import {AudioItem} from "@/src/entities/audio/ui/AudioItem";
import {StyledTextInput} from "@/src/shared/ui/StyledTextInput";
import {VerticalMargin} from "@/src/shared/ui/VerticalMargin";
import {Wrapper} from "@/src/shared/ui/Wrapper";
import {useEffect, useState} from "react";
import {Dimensions, FlatList, StyleSheet} from "react-native";

const styles = StyleSheet.create({
	list: {
		marginTop: 20,
		height: Dimensions.get("window").height - 220,
	},
});

export const ListAudioPage = () => {
	const [audios, setAudios] = useState<IJoinedAudio[]>([]);

	useEffect(() => {
		getAudiosAllJoined().then(setAudios);
	}, []);

	return (
		<VerticalMargin>
			<Wrapper>
				<StyledTextInput />

				<FlatList style={styles.list} data={audios} renderItem={({item}) => <AudioItem audio={item} />} />
			</Wrapper>
		</VerticalMargin>
	);
};
