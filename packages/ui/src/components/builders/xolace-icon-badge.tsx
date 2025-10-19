import type { LucideIcon } from 'lucide-react-native';

// ui package
import {Badge} from "../ui/badge";
import {Text} from "../ui/text";


interface XolaceIconBadgeProps {
    leftIcon?: LucideIcon;
    iconSize?: number;
    iconStroke?: number;
    label : string;
    className?: string;
}

export const XolaceIconBadge = ({leftIcon, iconSize, iconStroke, label, className}: XolaceIconBadgeProps) => {

    const LeftIcon = leftIcon;

    return (
        <Badge className={`flex flex-row items-center justify-center gap-1 ${className}`}>
            {LeftIcon && <LeftIcon strokeWidth={iconStroke} size={iconSize} />}
            <Text className={'text-xs font-normal'}>{label}</Text>
        </Badge>
    );
};