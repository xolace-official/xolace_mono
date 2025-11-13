import { ChevronDown } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

import type { FeedFilterOption } from '@xolacekit/state';
import {
  Text,
  ZeegoDropdownMenuContent,
  ZeegoDropdownMenuItem,
  ZeegoDropdownMenuItemIcon,
  ZeegoDropdownMenuItemTitle,
  ZeegoDropdownMenuRoot,
  ZeegoDropdownMenuTrigger,
} from '@xolacekit/ui';

interface FeedHeaderTitleDropdownProps {
  selected: FeedFilterOption;
  onSelect: (key: FeedFilterOption) => void;
}

const FILTER_OPTIONS = [
  {
    key: 'latest' as const,
    title: 'Latest',
    icon: 'clock',
  },
  {
    key: 'popular' as const,
    title: 'Popular',
    icon: 'flame',
  },
  {
    key: 'trending' as const,
    title: 'Trending',
    icon: 'trending.up',
  },
  {
    key: 'campfires' as const,
    title: 'My Campfires',
    icon: 'figure.2.and.child.holdinghands',
  },
];

export function FeedHeaderTitleDropdown({
  selected,
  onSelect,
}: FeedHeaderTitleDropdownProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const selectedItem = FILTER_OPTIONS.find((item) => item.key === selected);

  return (
    <ZeegoDropdownMenuRoot>
      <ZeegoDropdownMenuTrigger>
        <View className="flex-row items-center gap-1.5 rounded-full border border-black/10 bg-muted/50 px-4 py-3 dark:border-white/10">
          <Text className="text-xl font-semibold text-foreground">
            {selectedItem?.title || 'Campfire'}
          </Text>
          <ChevronDown size={16} color={isDark ? '#e5e7eb' : '#1f2937'} />
        </View>
      </ZeegoDropdownMenuTrigger>

      <ZeegoDropdownMenuContent>
        {FILTER_OPTIONS.map((item) => (
          <ZeegoDropdownMenuItem
            key={item.key}
            onSelect={() => onSelect(item.key)}
          >
            <ZeegoDropdownMenuItemTitle>
              {item.title}
            </ZeegoDropdownMenuItemTitle>
            <ZeegoDropdownMenuItemIcon
              ios={{
                name: item.icon,
                pointSize: 18,
              }}
              androidIconName={getAndroidIconName(item.key)}
            />
          </ZeegoDropdownMenuItem>
        ))}
      </ZeegoDropdownMenuContent>
    </ZeegoDropdownMenuRoot>
  );
}

function getAndroidIconName(key: FeedFilterOption): string {
  const androidIconMap: Record<FeedFilterOption, string> = {
    latest: 'schedule',
    popular: 'whatshot',
    trending: 'trending_up',
    campfires: 'group',
  };

  return androidIconMap[key] || 'feed';
}
