import { Image } from 'expo-image';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { InputFieldProps } from '../../types/ui_types';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Label className={`text-lg! tracking-widest ${labelStyle}`}>
            {label}
          </Label>
          <View
            className={`focus:border-primary-500 relative flex flex-row items-center justify-start border-b border-[#4F041D] bg-white ${containerStyle}`}
          >
            {iconImage && (
              <Image
                source={iconImage}
                className={`ml-4 h-6 w-6 ${iconStyle}`}
              />
            )}
            {Icon && (
              <Icon
                className={`mr-2 h-5 w-5 text-gray-500 ${iconStyle}`}
                size={iconSize}
              />
            )}
            <Input
              className={`native:h-[52px] flex-1 rounded-none px-0 text-[14px]! tracking-widest ${inputStyle} text-left`}
              placeholder={placeholder}
              placeholderTextColor={'gray'}
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
