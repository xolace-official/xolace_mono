import {Stack} from 'expo-router'
const ProtectedLayout = () => {

    return (
        <Stack>
            <Stack.Screen name='campfireSelection' options={{headerShown: false}} />
            <Stack.Screen name='(tabs)' options={{headerShown: false}} />
        </Stack>
    )

};

export default ProtectedLayout;