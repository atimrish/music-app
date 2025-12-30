import { ModalTopPanel } from "@/src/shared/ui/ModalTopPanel";
import { StyledTextInput } from "@/src/shared/ui/StyledTextInput";
import { VerticalMargin } from "@/src/shared/ui/VerticalMargin";
import { Wrapper } from "@/src/shared/ui/Wrapper";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAudiosAllJoined, IJoinedAudio } from "../../audio/api/getAudiosAllJoined";
import { SelectAudioItem } from "./SelectAudioItem";

const styles = StyleSheet.create({
	mainContainer: {
		borderWidth: 1,
		borderRadius: 15,
		paddingHorizontal: 20,
		width: "100%",
		height: 48,
		justifyContent: "center",
	},
	innerContainer: {
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
	},
	text: {
		fontSize: 20,
	},
	arrow: {
		fontSize: 24,
		color: "gray",
		fontWeight: 700,
	},
	list: {
		marginTop: 20,
		height: Dimensions.get("window").height - 170,
	}
});

type Props = {
	onDone: (ids: number[]) => void;
};

export const SelectAudios = (p: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [localAudios, setLocalAudios] = useState<IJoinedAudio[]>([]);
	const [selectedIds, setSelectedIds] = useState<Record<number, boolean>>({});
	const [globalSelectedIds, setGlobalSelectedIds] = useState<number[]>([]);

	useEffect(() => {
		getAudiosAllJoined().then(setLocalAudios);
	}, []);

	return (
		<>
			<TouchableOpacity style={styles.mainContainer} onPress={() => setIsModalOpen(true)}>
				<View style={styles.innerContainer}>
					<Text style={styles.text}>
						{globalSelectedIds.length > 0
							? "Выбрано элементов: " + globalSelectedIds.length
							: "Выберите..."}
					</Text>
					<Text style={styles.arrow}>{">"}</Text>
				</View>
			</TouchableOpacity>
			<Modal visible={isModalOpen} animationType="slide">
				<VerticalMargin>
					<Wrapper>
						<ModalTopPanel
							onBack={() => setIsModalOpen(false)}
							onDone={() => {
								const ids = Object.keys(selectedIds).map((i) => +i);
								setGlobalSelectedIds(ids);
								p.onDone(ids);
								setIsModalOpen(false);
							}}
						/>
						<StyledTextInput />
						<FlatList
							style={styles.list}
							data={localAudios}
							renderItem={({item}) => (
								<SelectAudioItem
									key={item.id}
									name={item.name}
									coverSrc={item.coverSrc}
									selected={selectedIds[item.id] || false}
									onSelect={() => {
										if (selectedIds[item.id]) {
											delete selectedIds[item.id];
										} else {
											selectedIds[item.id] = true;
										}
										setSelectedIds({...selectedIds});
									}}
									author={item.author}
								/>
							)}
						/>
					</Wrapper>
				</VerticalMargin>
			</Modal>
		</>
	);
};
