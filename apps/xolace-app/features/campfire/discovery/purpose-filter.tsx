// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/discovery/components/purpose-filter.tsx
import { SlidersHorizontal } from 'lucide-react-native';
import { Pressable } from 'react-native';

import {
  ZeegoDropdownMenuCheckboxItem,
  ZeegoDropdownMenuContent,
  ZeegoDropdownMenuItemTitle,
  ZeegoDropdownMenuLabel,
  ZeegoDropdownMenuRoot,
  ZeegoDropdownMenuTrigger,
  useColorScheme,
} from '@xolacekit/ui';

import type { CampfirePurpose } from '../../../app/(app)/(protected)/(drawer)/(tabs)/(discovery)/discovery';

interface PurposeFilterProps {
  selectedPurposes: CampfirePurpose[];
  onPurposesChange: (purposes: CampfirePurpose[]) => void;
}

const purposes: CampfirePurpose[] = [
  'support circle',
  'growth group',
  'creative outlet',
  'general discussion',
];

export function PurposeFilter({
  selectedPurposes,
  onPurposesChange,
}: PurposeFilterProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const togglePurpose = (purpose: CampfirePurpose) => {
    if (selectedPurposes.includes(purpose)) {
      onPurposesChange(selectedPurposes.filter((p) => p !== purpose));
    } else {
      onPurposesChange([...selectedPurposes, purpose]);
    }
  };

  return (
    <ZeegoDropdownMenuRoot>
      <ZeegoDropdownMenuTrigger>
        <Pressable className="rounded-2xl border border-black/10 bg-muted/50 p-3 active:opacity-70 dark:border-white/10">
          <SlidersHorizontal size={20} color={isDark ? '#e5e7eb' : '#1f2937'} />
        </Pressable>
      </ZeegoDropdownMenuTrigger>

      <ZeegoDropdownMenuContent>
        <ZeegoDropdownMenuLabel>Select Purposes</ZeegoDropdownMenuLabel>

        {purposes.map((purpose) => (
          <ZeegoDropdownMenuCheckboxItem
            key={purpose}
            value={selectedPurposes.includes(purpose) ? 'on' : 'off'}
            onValueChange={() => togglePurpose(purpose)}
          >
            <ZeegoDropdownMenuItemTitle>{purpose}</ZeegoDropdownMenuItemTitle>
          </ZeegoDropdownMenuCheckboxItem>
        ))}
      </ZeegoDropdownMenuContent>
    </ZeegoDropdownMenuRoot>
  );
}
