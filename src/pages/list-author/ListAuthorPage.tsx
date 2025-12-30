import { StyledTextInput } from "@/src/shared/ui/StyledTextInput";
import { VerticalMargin } from "@/src/shared/ui/VerticalMargin";
import { Wrapper } from "@/src/shared/ui/Wrapper";
import { Dimensions, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    list: {
        marginTop: 20,
        height: Dimensions.get("window").height - 220
    },
});

export const ListAuthorPage = () => {
	return (
		<VerticalMargin>
			<Wrapper>
				<StyledTextInput />

				<FlatList style={styles.list} data={[]} renderItem={({item}) =>  <TouchableOpacity/>} />
			</Wrapper>
		</VerticalMargin>
	);
};
