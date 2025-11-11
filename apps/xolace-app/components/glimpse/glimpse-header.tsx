// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/glimpse/components/glimpse-header.tsx
import { View, Pressable } from 'react-native';
import { Text } from '@xolacekit/ui';
import { Upload } from 'lucide-react-native';
import { useColorScheme } from '@xolacekit/ui';

interface GlimpseHeaderProps {
  onUpload: () => void;
}

export function GlimpseHeader({ onUpload }: GlimpseHeaderProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="px-4 pt-2 pb-2">
      <Text className="mb-2 text-base text-muted-foreground">
        Glimpse: Real stories. Real voices.
      </Text>
      
      <View className="flex-row items-center justify-between">
        <Text className="text-4xl font-bold text-foreground">
          All Videos
        </Text>
        
        <Pressable
          onPress={onUpload}
          className="flex-row items-center gap-2 px-5 py-3 rounded-full bg-primary active:opacity-80"
        >
          <Upload size={18} color="#ffffff" />
          <Text className="text-base font-semibold text-primary-foreground">
            Upload a video
          </Text>
        </Pressable>
      </View>
    </View>
  );
}