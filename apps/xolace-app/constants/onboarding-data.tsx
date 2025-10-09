import {ImageSource} from "expo-image"


export interface OnboardingData {
    id: number;
    image: ImageSource | number | string | null;
    text: string;
    textColor: string;
    backgroundColor: string;
    description: string;
}


export const data: OnboardingData[] = [
    {
        id : 1,
        image: require("../assets/images/onboarding/onboarding1.png"),
        text: "Find your place",
        textColor: "#1995e3",
        backgroundColor: "#FFF",
        description: "Lorem "
    },
    {
        id : 2,
        image: require("../assets/images/onboarding/onboarding1.png"),
        text: "Fit your place",
        textColor: "#693fe8",
        backgroundColor: "#c2c5fc",
        description: "Lorem "
    },
    {
        id : 3,
        image: require("../assets/images/onboarding/onboarding1.png"),
        text: "Pick your food",
        textColor: "#0D47A1",
        backgroundColor: "#a9dafc",
        description: "Lorem "
    }
]