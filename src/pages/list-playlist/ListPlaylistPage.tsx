import { getPlaylistsAllJoined } from "@/src/entities/playlist/api/getPlaylistsAllJoined";
import { IJoinedPlaylist } from "@/src/entities/playlist/model/interfaces";
import { PlaylistCard } from "@/src/entities/playlist/ui/PlaylistCard";
import { StyledTextInput } from "@/src/shared/ui/StyledTextInput";
import { VerticalMargin } from "@/src/shared/ui/VerticalMargin";
import { Wrapper } from "@/src/shared/ui/Wrapper";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
	list: {
		marginTop: 20,
		height: Dimensions.get("window").height - 220,
	},
});

export const ListPlaylistPage = () => {
	const [playlists, setPlaylists] = useState<IJoinedPlaylist[]>([]);

	useEffect(() => {
		getPlaylistsAllJoined().then(setPlaylists);
	}, []);

	return (
		<VerticalMargin>
			<Wrapper>
				<StyledTextInput />
				<FlatList
					numColumns={2}
					style={styles.list}
					data={playlists}
					renderItem={({item}) => <PlaylistCard playlist={item} />}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        paddingHorizontal: 8
                    }}
                    ItemSeparatorComponent={() => <View style={{height: 8}}/>}
				/>
			</Wrapper>
		</VerticalMargin>
	);
};
