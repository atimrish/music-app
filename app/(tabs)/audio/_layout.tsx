import { Stack } from "expo-router"

const AudioLayout = () => {
    return <Stack>
        <Stack.Screen name="index" options={{title: 'Аудио'}} />
    </Stack>
}

export default AudioLayout