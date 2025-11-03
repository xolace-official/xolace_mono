import { ImageSource } from 'expo-image';
import type { LucideIcon } from 'lucide-react-native';
import { TextInputProps } from 'react-native';
import { BadgeProps } from '../components/ui/badge';
import { ComponentProps } from 'react';
import { Link } from 'expo-router';

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


declare interface SettingsListItem {
  badge?: {
    label: string;
    variant?: BadgeProps['variant'];
  };
  description?: string;
  disabled?: boolean;
  href?: ComponentProps<typeof Link>['href'];
  icon: LucideIcon;
  iconBackgroundClassName: string;
  iconColor: string;
  id: string;
  title: string;
};

declare interface SettingsSectionConfig {
  id: string;
  items: SettingsListItem[];
  title?: string;
}

declare interface UserClaims {
  avatar_url?: string;
  email?: string;
  full_name?: string;
  id?: string;
  name?: string;
  picture?: string;
  preferred_username?: string;
  user_metadata?: Record<string, unknown> | null;
};