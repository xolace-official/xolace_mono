import { Slot } from 'expo-router';

import { TabsProvider } from '../../../../../lib/providers/tabs-provider';

// x-bottom-tabs-background-animation 🔽

export default function XLayout() {
  return (
    <TabsProvider>
      <Slot />
    </TabsProvider>
  );
}

// x-bottom-tabs-background-animation 🔼
