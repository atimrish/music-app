import { Stack } from "expo-router"

const AudioLayout = () => {
    return <Stack>
        <Stack.Screen name="index" options={{title: 'Аудио'}} />
        <Stack.Screen name="[audioId]" options={{title: ''}} />
    </Stack>
}

export default AudioLayout