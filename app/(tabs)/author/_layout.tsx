import { Stack } from "expo-router"

const AuthorLayout = () => {
    return <Stack>
        <Stack.Screen name="index" options={{title: 'Исполнители'}} />
    </Stack>
}

export default AuthorLayout