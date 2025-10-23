import { Stack } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function CollectionsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Collections', headerLeft: ()=>(
                    <DrawerToggleButton/>
                ) }} />
        </Stack>
    );
}
