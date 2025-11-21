import { Pressable, View } from 'react-native';
import { ArrowLeft, MoreHorizontal, Search, Share2 } from 'lucide-react-native';

type CampfireHeaderTopBarProps = {
  onBack: () => void;
};

const iconColor = '#f8fafc';

export function CampfireHeaderTopBar({ onBack }: CampfireHeaderTopBarProps) {
  const renderIcon = (icon: React.ReactNode, onPress?: () => void) => (
    <Pressable
      onPress={onPress}
      className="h-10 w-10 items-center justify-center rounded-full bg-background/30 backdrop-blur"
    >
      {icon}
    </Pressable>
  );

  return (
    <View className="flex-row items-center justify-between">
      {renderIcon(<ArrowLeft size={18} color={iconColor} />, onBack)}
      <View className="flex-row items-center gap-2">
        {renderIcon(<Search size={18} color={iconColor} />)}
        {renderIcon(<Share2 size={18} color={iconColor} />)}
        {renderIcon(<MoreHorizontal size={18} color={iconColor} />)}
      </View>
    </View>
  );
}
