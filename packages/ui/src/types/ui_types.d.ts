import { ImageSource } from 'expo-image';
import type { LucideIcon } from 'lucide-react-native';
import { TextInputProps } from 'react-native';

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: LucideIcon;
  iconSize?: number;
  iconImage?: ImageSource | number | string | null;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}
