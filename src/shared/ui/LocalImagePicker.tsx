import { getCoversAll } from "@/src/entities/cover/api/getCoversAll";
import { ICover } from "@/src/entities/cover/model/interfaces";
import { useEffect, useState } from "react";
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ModalTopPanel } from "./ModalTopPanel";
import { StyledTextInput } from "./StyledTextInput";
import { VerticalMargin } from "./VerticalMargin";
import { Wrapper } from "./Wrapper";

const styles = StyleSheet.create({
	container: {
		width: 200,
		height: 200,
		backgroundColor: "lightgray",
		overflow: "hidden",
		borderRadius: 15,
	},
	listItem: {
		width: "50%",
		aspectRatio: 1,
		position: "relative",
	},
	listImage: {
		width: "100%",
		height: "100%",
	},
	list: {
		height: "85%",
		marginTop: 20,
	},
	listSelectedMark: {
		width: 30,
		height: 30,
		borderRadius: "50%",
		backgroundColor: "#1ba6fc",
		position: "absolute",
		top: 5,
		right: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	listSelectedMarkText: {
		color: "white",
	},
	image: {
		width: '100%',
		height: '100%'
	}
});

type Props = {
	onDone: (cover: ICover) => void;
	src: string
};

export const LocalImagePicker = (p: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [covers, setCovers] = useState<ICover[]>([]);
	const [query, setQuery] = useState("");
	const [selectedId, setSelectedId] = useState(-1);
	const filteredCovers = query === "" ? covers : covers.filter((i) => i.name.includes(query));

	useEffect(() => {
		getCoversAll().then((res) => {
			setCovers(res);
		}).catch(console.error)
	}, []);

	return (
		<>
			<TouchableOpacity style={styles.container} onPress={() => setIsModalOpen(true)}>
				<Image style={styles.image} source={p.src ? {uri: p.src} : undefined} />
			</TouchableOpacity>
			<Modal visible={isModalOpen} animationType="slide">
				<VerticalMargin>
					<Wrapper>
						<ModalTopPanel
							onBack={() => setIsModalOpen(false)}
							onDone={() => {
								if (selectedId !== -1) {
									p.onDone(covers.find(i => i.id === selectedId)!);
									setIsModalOpen(false);
								}
							}}
						/>
						<StyledTextInput value={query} onChangeText={setQuery} />

						<FlatList
							style={styles.list}
							numColumns={2}
							data={filteredCovers}
							renderItem={({item}) => (
								<TouchableOpacity
									key={item.id}
									style={styles.listItem}
									onPress={() => {
										setSelectedId(item.id);
									}}>
									<Image style={styles.listImage} source={{uri: item.src}} />
									{selectedId === item.id && (
										<View style={styles.listSelectedMark}>
											<Text style={styles.listSelectedMarkText}>✔</Text>
										</View>
									)}
								</TouchableOpacity>
							)}
						/>
					</Wrapper>
				</VerticalMargin>
			</Modal>
		</>
	);
};
