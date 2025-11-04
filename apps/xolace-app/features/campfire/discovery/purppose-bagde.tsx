// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/discovery/components/purpose-badge.tsx
import { View } from 'react-native';
import { Text } from '@xolacekit/ui';
import { Info } from 'lucide-react-native';
import type { CampfirePurpose } from '../../../app/(app)/(protected)/(drawer)/(tabs)/discovery';

interface PurposeBadgeProps {
  purpose: CampfirePurpose;
}

const purposeStyles: Record<CampfirePurpose, { bg: string; text: string; border: string; iconColor: string, accentColor:string }> = {
  'creative outlet': {
    bg: 'bg-green-500/10',
    text: 'text-green-700 dark:text-green-400',
    border: 'border-green-500/20',
    iconColor: '#22c55e',
    accentColor: '#4ADE80',
  },
  'growth group': {
    bg: 'bg-amber-500/10',
    text: 'text-amber-700 dark:text-amber-400',
    border: 'border-amber-500/20',
    iconColor: '#f59e0b',
    accentColor: '#FBBF24'
  },
  'support circle': {
    bg: 'bg-blue-500/10',
    text: 'text-blue-700 dark:text-blue-400',
    border: 'border-blue-500/20',
    iconColor: '#3b82f6',
    accentColor: '#F97316',
  },
  'general discussion': {
    bg: 'bg-gray-500/10',
    text: 'text-gray-700 dark:text-gray-400',
    border: 'border-gray-500/20',
    iconColor: '#6b7280',
    accentColor: '#60A5FA',
  },
};

export function PurposeBadge({ purpose }: PurposeBadgeProps) {
  const styles = purposeStyles[purpose];
  
  return (
        <View
      className="flex-row items-center gap-2 px-3 py-1 border rounded-full"
      style={{
        borderColor: `${styles.accentColor}33`,
        backgroundColor: `${styles.accentColor}1A`,
      }}
    >
      <View
        className="items-center justify-center rounded-full size-4"
        style={{ backgroundColor: styles.accentColor }}
      >
        <Text className="text-[10px] font-semibold leading-none text-black/85">
          i
        </Text>
      </View>
      <Text className="text-xs font-medium" style={{ color: styles.accentColor }}>
        {purpose}
      </Text>
    </View>
  );
}