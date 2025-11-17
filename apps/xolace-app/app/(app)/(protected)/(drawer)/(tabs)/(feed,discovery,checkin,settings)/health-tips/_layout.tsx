import { Stack } from 'expo-router';

import { NAV_THEME, useColorScheme } from '@xolacekit/ui';

import BackButton from '../../../../../../../components/shared/BackButton';


export default function HealthTipsLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Health tips',
          headerLeft: () => <BackButton />,
          
          headerStyle: {
            backgroundColor:
              colorScheme === 'dark'
                ? NAV_THEME.dark.colors.background
                : NAV_THEME.light.colors.background,
          },
          animation: 'fade_from_bottom',
        }}
      />
    </Stack>
  );
}
