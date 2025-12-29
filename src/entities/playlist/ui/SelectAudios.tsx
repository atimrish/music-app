import { ModalTopPanel } from "@/src/shared/ui/ModalTopPanel";
import { StyledTextInput } from "@/src/shared/ui/StyledTextInput";
import { VerticalMargin } from "@/src/shared/ui/VerticalMargin";
import { Wrapper } from "@/src/shared/ui/Wrapper";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAudiosAll } from "../../audio/api/getAudiosAll";
import { IAudio } from "../../audio/model/interfaces";

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
		borderWidth: 1,
		marginTop: 20,
		height: Dimensions.get("window").height - 170,
	},
    listItem: {
        padding: 20
    },
    listItemText: {
        fontSize: 16
    }
});

export const SelectAudios = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [localAudios, setLocalAudios] = useState<IAudio[]>([]);

	useEffect(() => {
		getAudiosAll().then(setLocalAudios);
	}, []);

	return (
		<>
			<TouchableOpacity style={styles.mainContainer} onPress={() => setIsModalOpen(true)}>
				<View style={styles.innerContainer}>
					<Text style={styles.text}>Выберите...</Text>
					<Text style={styles.arrow}>{">"}</Text>
				</View>
			</TouchableOpacity>
			<Modal visible={isModalOpen} animationType="slide">
				<VerticalMargin>
					<Wrapper>
						<ModalTopPanel onBack={() => setIsModalOpen(false)} onDone={() => {}} />
						<StyledTextInput />
						<FlatList
							style={styles.list}
							data={localAudios}
							renderItem={({item}) => (
								<TouchableOpacity style={styles.listItem}>
									<Text style={styles.listItemText}>{item.name}</Text>
								</TouchableOpacity>
							)}
						/>
					</Wrapper>
				</VerticalMargin>
			</Modal>
		</>
	);
};
