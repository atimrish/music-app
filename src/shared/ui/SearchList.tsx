import { useState } from "react";
import { Dimensions, FlatList, ListRenderItem, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ModalTopPanel } from "./ModalTopPanel";
import { StyledTextInput } from "./StyledTextInput";
import { VerticalMargin } from "./VerticalMargin";
import { Wrapper } from "./Wrapper";

const styles = StyleSheet.create({
	dropItem: {
		paddingVertical: 16,
		paddingHorizontal: 10,
		fontSize: 16,
	},
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
		height: Dimensions.get("window").height - 170,
	},
});

type TSearchListItem<T extends any = any> = {
	value: T;
	text: string;
};

type Props<T extends any = any> = {
	data: TSearchListItem<T>[];
	onSelect: (selected: TSearchListItem<T>) => void;
	renderItem?: ListRenderItem<TSearchListItem<T>>
};



export function SearchList<T extends any = any>(p: Props<T>) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState<TSearchListItem<T> | null>(null);
	const filteredItems = query === "" ? p.data : p.data.filter((i) => i.text.includes(query));

	const defaultRenderItem: ListRenderItem<TSearchListItem<T>> = ({item, index}) => (
		<TouchableOpacity
			onPress={() => {
				setQuery(item.text);
				setSelected(item);
			}}>
			<Text style={styles.dropItem} key={index}>
				{item.text}
			</Text>
		</TouchableOpacity>
	);

	const currentRenderItem = p.renderItem ?? defaultRenderItem

	return (
		<>
			<TouchableOpacity style={styles.mainContainer} onPress={() => setIsModalOpen(true)}>
				<View style={styles.innerContainer}>
					<Text style={styles.text}>{selected ? selected.text : "Выберите..."}</Text>
					<Text style={styles.arrow}>{">"}</Text>
				</View>
			</TouchableOpacity>
			<Modal visible={isModalOpen} animationType="slide">
				<VerticalMargin>
					<Wrapper>
						<ModalTopPanel
							onBack={() => setIsModalOpen(false)}
							onDone={() => {
								if (selected) {
									p.onSelect(selected);
									setIsModalOpen(false);
								}
							}}
						/>
						<StyledTextInput
							value={query}
							onChange={(e) => {
								setQuery(e.nativeEvent.text);
								if (selected && e.nativeEvent.text !== selected.text) {
									setSelected(null);
								}
							}}
						/>
						<VerticalMargin>
							<FlatList style={styles.list} data={filteredItems} renderItem={currentRenderItem} />
						</VerticalMargin>
					</Wrapper>
				</VerticalMargin>
			</Modal>
		</>
	);
};
