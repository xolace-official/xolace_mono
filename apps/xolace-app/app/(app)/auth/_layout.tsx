import { Stack } from "expo-router";

export default function AuthStackLayout() {
    return (
        <Stack>
            <Stack.Screen name="sign-in" options={{ headerShown: false, title: "Sign In" }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false, title: "Sign Up" }} />
            <Stack.Screen name="password-reset" options={{ headerShown: false, title: "Password Reset" }} />
            <Stack.Screen name="callback" options={{ headerShown: false, title: "" }} />
            <Stack.Screen name="error" options={{ headerShown: false, title: "" }} />
        </Stack>
    );
}
