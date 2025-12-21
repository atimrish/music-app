import {StyleSheet, View} from "react-native";
import { ActionButton } from "./ui/action-button/ActionButton";

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
})

export const MainPage = () => {
	return <View style={styles.container}>
        <ActionButton text="Изображение"/>
        <ActionButton text="Исполнителя"/>
        <ActionButton text="Аудио"/>
        <ActionButton text="Плейлист"/>
    </View>;
};
