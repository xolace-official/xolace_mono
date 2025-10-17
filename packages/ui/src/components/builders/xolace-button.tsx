import type { LucideIcon } from 'lucide-react-native';

import { Button } from '../ui/button';
import type { ButtonProps } from '../ui/button';
import { Text } from '../ui/text';

export interface XolaceButtonProps extends ButtonProps {
  label: string;
  leftIcon?: LucideIcon;
  iconSize?: number;
  iconStroke?: number;
  labelClassName?: string;
}

export const XolaceButton = ({
  label,
  leftIcon,
  iconSize,
  iconStroke,
  className,
  labelClassName,
  ...props
}: XolaceButtonProps) => {
  const LeftIcon = leftIcon;

  return (
    <>
      <Button
        className={`flex flex-row gap-x-2 rounded-full bg-[#E3DAC9] ${className}`}
        {...props}
      >
        {LeftIcon && <LeftIcon strokeWidth={iconStroke} size={iconSize} />}

        <Text
          className={`text-xl font-medium tracking-wider text-[#4F041D] ${labelClassName}`}
        >
          {label}
        </Text>
      </Button>
    </>
  );
};
