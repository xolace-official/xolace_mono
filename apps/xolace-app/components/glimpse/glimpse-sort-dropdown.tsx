import { ChevronDown } from 'lucide-react-native';
import { Pressable } from 'react-native';

import {
  Text,
  ZeegoDropdownMenuContent,
  ZeegoDropdownMenuItem,
  ZeegoDropdownMenuItemTitle,
  ZeegoDropdownMenuRoot,
  ZeegoDropdownMenuTrigger,
  useColorScheme,
} from '@xolacekit/ui';

import type { GlimpseSortOptionTypes } from '../../features/glimpse/types';

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
  onSortChange,
}: GlimpseSortDropdownProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const selectedLabel =
    SORT_OPTIONS.find((opt) => opt.value === selectedSort)?.label ||
    'Most Recent';

  return (
    <ZeegoDropdownMenuRoot>
      <ZeegoDropdownMenuTrigger>
        <Pressable className="bg-muted/50 flex-row items-center gap-2 rounded-full border border-black/10 px-5 py-3 active:opacity-70 dark:border-white/10">
          <Text className="text-foreground text-base font-medium">
            {selectedLabel}
          </Text>
          <ChevronDown size={18} color={isDark ? '#e5e7eb' : '#1f2937'} />
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
