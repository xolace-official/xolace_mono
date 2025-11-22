import type React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { GlassView } from 'expo-glass-effect';
import { ArrowLeft, MoreHorizontal, Search, Share2 } from 'lucide-react-native';

type CampfireHeaderTopBarProps = {
  onBack: () => void;
};

const iconColor = '#f8fafc';

export function CampfireHeaderTopBar({ onBack }: CampfireHeaderTopBarProps) {
  const renderIcon = (icon: React.ReactNode, onPress?: () => void) => (
    <Pressable onPress={onPress} style={styles.iconPressable}>
      <GlassView
        glassEffectStyle="regular"
        tintColor="rgba(255,255,255,0.14)"
        style={styles.glass}
      />
      <View style={styles.iconWrapper}>{icon}</View>
    </Pressable>
  );

  return (
    <View className="flex-row items-center justify-between">
      {renderIcon(<ArrowLeft size={17} color={iconColor} />, onBack)}
      <View className="flex-row items-center gap-2">
        {renderIcon(<Search size={17} color={iconColor} />)}
        {renderIcon(<Share2 size={17} color={iconColor} />)}
        {renderIcon(<MoreHorizontal size={17} color={iconColor} />)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconPressable: {
    height: 35,
    width: 35,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  glass: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  iconWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
