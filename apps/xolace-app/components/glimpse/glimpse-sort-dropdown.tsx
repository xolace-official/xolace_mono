// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/glimpse/components/glimpse-sort-dropdown.tsx
import { Pressable, View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import {
  ZeegoDropdownMenuRoot,
  ZeegoDropdownMenuTrigger,
  ZeegoDropdownMenuContent,
  ZeegoDropdownMenuItem,
  ZeegoDropdownMenuItemTitle,
  Text
} from '@xolacekit/ui';
import type { GlimpseSortOption, GlimpseSortOptionTypes } from '../../features/glimpse/types';

interface GlimpseSortDropdownProps {
  selectedSort: GlimpseSortOptionTypes;
  onSortChange: (option: GlimpseSortOptionTypes) => void;
}

const SORT_OPTIONS: Array<{ value: GlimpseSortOptionTypes; label: string }> = [
  { value: 'most_recent', label: 'Most Recent' },
  { value: 'most_viewed', label: 'Most Viewed' },
  { value: 'oldest_first', label: 'Oldest First' },
  { value: 'least_viewed', label: 'Least Viewed' },
];

export function GlimpseSortDropdown({ 
  selectedSort, 
  onSortChange 
}: GlimpseSortDropdownProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const selectedLabel = SORT_OPTIONS.find(opt => opt.value === selectedSort)?.label || 'Most Recent';

  return (
    <ZeegoDropdownMenuRoot>
      <ZeegoDropdownMenuTrigger>
        <Pressable className="flex-row items-center gap-2 px-5 py-3 border rounded-full border-black/10 bg-muted/50 dark:border-white/10 active:opacity-70">
          <Text className="text-base font-medium text-foreground">
            {selectedLabel}
          </Text>
          <ChevronDown 
            size={18} 
            color={isDark ? '#e5e7eb' : '#1f2937'} 
          />
        </Pressable>
      </ZeegoDropdownMenuTrigger>
      
      <ZeegoDropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <ZeegoDropdownMenuItem
            key={option.value}
            onSelect={() => onSortChange(option.value)}
          >
            <ZeegoDropdownMenuItemTitle>
              {option.label}
            </ZeegoDropdownMenuItemTitle>
          </ZeegoDropdownMenuItem>
        ))}
      </ZeegoDropdownMenuContent>
    </ZeegoDropdownMenuRoot>
  );
}