import { Stack } from "expo-router"

const PlaylistLayout = () => {
    return <Stack>
        <Stack.Screen name="index" options={{title: 'Плейлисты'}}/>
    </Stack>
}

export default PlaylistLayout