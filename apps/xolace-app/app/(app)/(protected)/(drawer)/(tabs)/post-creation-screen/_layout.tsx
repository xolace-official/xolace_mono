import { Stack } from 'expo-router';

export default function PostCreationLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ presentation: 'formSheet'}}
            />
        </Stack>
    );
}