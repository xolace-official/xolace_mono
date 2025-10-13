import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    View,
    Platform,
    Keyboard,
} from "react-native";
import {InputFieldProps} from "../../types/ui_types";

import {Label} from "../ui/label";
import {Input} from "../ui/input";

import {Image} from 'expo-image'

// @ts-ignore
export const InputField = ({
                        containerStyle,
                        inputStyle,
                        label,
                        labelStyle,
                        placeholder,
                        secureTextEntry,
                        iconImage,
                        icon,
                        iconSize = 18,
                        iconStyle,
                        value,
                        onChangeText,
                        ...props
                    }: InputFieldProps) => {

    const Icon = icon;
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className=" my-2 w-full">
                    <Label className={`!text-lg tracking-widest ${labelStyle}`}>
                        {label}
                    </Label>
                    <View
                        className={` flex flex-row justify-start items-center relative bg-white border-b border-[#4F041D] focus:border-primary-500 ${containerStyle}`}
                    >
                        {iconImage && (
                            <Image source={iconImage} className={` w-6 h-6 ml-4 ${iconStyle}`} />
                        )}
                        {
                            Icon && (
                                <Icon className={`w-5 h-5 mr-2 text-gray-500 ${iconStyle}`} size={iconSize}/>
                            )
                        }
                        <Input
                            className={`rounded-none px-0 native:h-[52px] !text-[14px] tracking-widest flex-1 ${inputStyle} text-left`}
                            placeholder={placeholder}
                            placeholderTextColor={"gray"}
                            secureTextEntry={secureTextEntry}
                            value={value}
                            onChangeText={onChangeText}
                            {...props}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};
